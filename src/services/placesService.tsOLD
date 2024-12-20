import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../types/symbols';
import { ILogger, IFirebaseRepository, IGooglePlacesRepository } from '../types/interfaces';
import { Restaurant, GooglePlaceResult, GooglePlaceDetails, PriceLevel } from '../types/restaurant';
import { GeoPoint, Timestamp } from 'firebase/firestore';

@injectable()
export class PlacesService {
  private readonly logger: ILogger;
  private readonly firebaseRepo: IFirebaseRepository;
  private readonly googlePlacesRepo: IGooglePlacesRepository;

  constructor(
    @inject(SYMBOLS.Logger) logger: ILogger,
    @inject(SYMBOLS.FirebaseRepository) firebaseRepo: IFirebaseRepository,
    @inject(SYMBOLS.GooglePlacesRepository) googlePlacesRepo: IGooglePlacesRepository
  ) {
    console.log("PlacesService constructor starting...");
    
    // Logs détaillés pour le debug
    console.log("Logger instance:", logger);
    console.log("Logger type:", typeof logger);
    console.log("Logger methods:", Object.getOwnPropertyNames(logger));
    
    this.logger = logger;
    this.firebaseRepo = firebaseRepo;
    this.googlePlacesRepo = googlePlacesRepo;

    console.log("Logger received:", !!this.logger);
    console.log("FirebaseRepo received:", !!this.firebaseRepo);
    console.log("GooglePlacesRepo received:", !!this.googlePlacesRepo);

    if (!this.logger) {
      console.error("Logger is undefined in PlacesService constructor");
      throw new Error('Logger dependency not injected in PlacesService');
    }

    console.log("PlacesService constructor completed successfully");
  }

 async searchNearbyRestaurants(
     latitude: number,
   longitude: number,
   radius: number
 ): Promise<Restaurant[]> {  
  console.log('PlacesService - googlePlacesRepo:', {
    exists: !!this.googlePlacesRepo,
    hasSearchNearby: !!this.googlePlacesRepo?.searchNearby
  });
  console.log('Before logger check:', !!this.logger);
   if (!this.logger) {
     console.error('Logger not initialized');
     throw new Error('Logger not initialized');
   }

   try {
     this.logger?.info('Searching nearby restaurants', { latitude, longitude, radius });
     const places = await this.googlePlacesRepo.searchNearby(latitude, longitude, radius);
     return this.transformPlaces(places);
   } catch (error) {
     this.logger?.error('Service error: Failed to fetch nearby restaurants', error);
     throw error;
   }
 }

 async syncNearbyRestaurants(latitude: number, longitude: number, radius: number = 500): Promise<Restaurant[]> {
   if (!this.logger) {
     console.error('Logger not initialized');
     throw new Error('Logger not initialized');
   }

   this.logger?.info('Starting syncNearbyRestaurants with:', { latitude, longitude, radius });
   
   try {
     const nearbyPlaces = await this.googlePlacesRepo.searchNearby(latitude, longitude, radius);
     const restaurants: Restaurant[] = [];
     const batch = this.firebaseRepo.createBatch();

     for (const place of nearbyPlaces) {
       try {
         if (!place.geometry?.location) {
           this.logger?.info('Skipping place without location:', place.place_id);
           continue;
         }

         const details = await this.googlePlacesRepo.getDetails(place.place_id);
         if (!details) {
           this.logger?.info('Skipping place without details:', place.place_id);
           continue;
         }

         const photos = this.processPhotos(details.photos);
         const openingHours = this.processOpeningHours(details.opening_hours);
         
         const restaurantData = this.createRestaurantData(place, details, {
           photos,
           openingHours,
           location: new GeoPoint(
             place.geometry.location.lat,
             place.geometry.location.lng
           )
         });

         const sanitizedData = this.sanitizeRestaurantData(restaurantData);
         const firestoreData = this.prepareFirestoreData(sanitizedData);
         
         await this.firebaseRepo.addToBatch(batch, place.place_id, firestoreData);
         restaurants.push({ id: place.place_id, ...sanitizedData });

       } catch (error) {
         this.logger?.error(`Error processing place ${place.place_id}:`, error);
         continue;
       }
     }

     this.logger?.info(`Committing batch write for ${restaurants.length} restaurants`);
     await this.firebaseRepo.commitBatch(batch);
     
     return restaurants;

   } catch (error) {
     this.logger?.error('Error in syncNearbyRestaurants:', error);
     throw error;
   }
 }

 async getPlaceDetails(placeId: string): Promise<GooglePlaceDetails> {
   if (!this.logger) {
     console.error('Logger not initialized');
     throw new Error('Logger not initialized');
   }

   try {
     return await this.googlePlacesRepo.getDetails(placeId);
   } catch (error) {
     this.logger?.error('Service error: Failed to fetch place details', error);
     throw error;
   }
 }

 async getPhoto(photoReference: string, maxWidth: number): Promise<string> {
   if (!this.logger) {
     console.error('Logger not initialized');
     throw new Error('Logger not initialized');
   }

   try {
     return await this.googlePlacesRepo.getPhoto(photoReference, maxWidth);
   } catch (error) {
     this.logger?.error('Service error: Failed to fetch photo', error);
     throw error;
   }
 }

 private transformPlaces(places: GooglePlaceResult[]): Restaurant[] {
   return places.map(place => ({
     id: place.place_id,
     googlePlaceId: place.place_id,
     name: place.name,
     address: place.vicinity || '',
     location: new GeoPoint(
       place.geometry.location.lat,
       place.geometry.location.lng
     ),
     rating: place.rating || 0,
     priceLevel: place.price_level,
     cuisine: this.determineCuisineType(place.types || []),
     photos: place.photos?.map(photo => photo.photo_reference) || [],
     lastUpdated: Timestamp.now()
   }));
 }

 private processPhotos(photos: any[] | undefined): string[] {
   if (!photos) return [];
   
   return photos
     .slice(0, 20)
     .filter((photo): photo is { photo_reference: string } => 
       photo !== undefined && 
       photo !== null && 
       typeof photo.photo_reference === 'string'
     )
     .map(photo => this.googlePlacesRepo.getPhotoUrl(photo.photo_reference));
 }

 private processOpeningHours(openingHours: any): Restaurant['openingHours'] | undefined {
   if (!openingHours || typeof openingHours === 'string') return undefined;
   
   return {
     periods: openingHours.periods || [],
     weekdayText: openingHours.weekday_text || []
   };
 }

 private createRestaurantData(place: any, details: any, extra: {
   photos: string[],
   openingHours: Restaurant['openingHours'] | undefined,
   location: GeoPoint
 }): Omit<Restaurant, 'id'> {
   return {
     googlePlaceId: place.place_id,
     name: place.name,
     address: details.vicinity || place.vicinity || '',
     location: extra.location,
     rating: place.rating || 0,
     priceLevel: place.price_level as PriceLevel | undefined,
     cuisine: this.determineCuisineType(place.types || []),
     photos: extra.photos,
     phoneNumber: details.formatted_phone_number,
     openingHours: extra.openingHours,
     lastUpdated: Timestamp.now(),
   };
 }

 private determineCuisineType(types: string[]): string {
   const cuisineMapping: Record<string, string> = {
     restaurant: 'International',
     japanese_restaurant: 'Japonais',
     french_restaurant: 'Français',
     italian_restaurant: 'Italien',
     chinese_restaurant: 'Chinois',
     thai_restaurant: 'Thaï',
     vietnamese_restaurant: 'Vietnamien',
     indian_restaurant: 'Indien',
     mexican_restaurant: 'Mexicain',
     mediterranean_restaurant: 'Méditerranéen',
     vegetarian_restaurant: 'Végétarien',
     cafe: 'Café',
     bakery: 'Boulangerie',
     bar: 'Bar',
     night_club: 'Boîte de nuit',
     meal_takeaway: 'À emporter',
     meal_delivery: 'Livraison',
   };

   return types.find(type => cuisineMapping[type]) 
     ? cuisineMapping[types.find(type => cuisineMapping[type])!]
     : 'International';
 }

 private sanitizeRestaurantData(data: Omit<Restaurant, 'id'>): Omit<Restaurant, 'id'> {
   return {
     ...data,
     photos: data.photos || [],
     openingHours: data.openingHours ? {
       periods: data.openingHours.periods || [],
       weekdayText: data.openingHours.weekdayText || []
     } : undefined
   };
 }

 private prepareFirestoreData(data: any): any {
   return Object.fromEntries(
     Object.entries(data).map(([key, value]) => [key, value === undefined ? null : value])
   );
 }

 calculateDistance(point1: GeoPoint, point2: GeoPoint): number {
   const R = 6371;
   const lat1 = (point1.latitude * Math.PI) / 180;
   const lat2 = (point2.latitude * Math.PI) / 180;
   const dLat = ((point2.latitude - point1.latitude) * Math.PI) / 180;
   const dLon = ((point2.longitude - point1.longitude) * Math.PI) / 180;

   const a =
     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
     Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   return R * c;
 }
}