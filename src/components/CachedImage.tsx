import React, { useState } from 'react';
import { Image, ImageStyle, View, ActivityIndicator, StyleSheet, ImageSourcePropType } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { BlurView } from 'expo-blur';
import { MD5 } from 'crypto-js';
import { useInjection } from 'inversify-react';
import { SYMBOLS } from '../types/symbols';
import { ILogger } from '../types/interfaces';
interface CachedImageProps {
  uri: string;
  style: ImageStyle;
  placeholder: ImageSourcePropType;  // Changé le type pour accepter un require()
}

export const CachedImage: React.FC<CachedImageProps> = ({ uri, style, placeholder }) => {
  const logger = useInjection<ILogger>(SYMBOLS.Logger);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    const getCachedImage = async () => {
      try {
        const filename = MD5(uri).toString();
        const path = `${FileSystem.cacheDirectory}${filename}`;
       
        const imageExists = await FileSystem.getInfoAsync(path);
       
        if (imageExists.exists) {
          setImagePath(path);
          setIsLoading(false);
          return;
        }

        const { uri: downloadUri } = await FileSystem.downloadAsync(uri, path);
        setImagePath(downloadUri);
      } catch (e) {
        logger.error('Erreur de chargement image:', e);
                setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getCachedImage();
  }, [uri]);

  if (isLoading) {
    return (
      <View style={[style, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FE3A4A" />
      </View>
    );
  }

  if (error || !imagePath) {
    return (
      <Image
        source={placeholder}  // Utilise directement le placeholder passé en prop
        style={style}
      />
    );
  }

  return (
    <Image
      source={{ uri: imagePath }}
      style={style}
      onError={() => setError(true)}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});