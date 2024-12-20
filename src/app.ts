import { container } from './config/container';

import express from 'express';

import { PlacesController } from './controllers/placesController';
import { TYPES } from './types/interfaces';

const app = express();
const placesController = container.get<PlacesController>(TYPES.PlacesController);

app.get('/api/places/nearby', (req, res) => placesController.searchNearby(req, res));
// ... autres routes

export { app };