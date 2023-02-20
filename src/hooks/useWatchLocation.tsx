import { useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  LocationSubscription,
  watchPositionAsync,
  LocationObject,
  Accuracy,
} from "expo-location";

export function useWatchLocation() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState<any>(null);
  const [locationMounted, setLocationMounted] = useState(false);

  useEffect(() => {
    let subscriber: LocationSubscription | null = null;

    const startWatching = async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        const positionArgs = {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 5000,
          distanceInterval: 10,
        };

        subscriber = await watchPositionAsync(positionArgs, setLocation);

        if (status !== "granted") {
          throw new Error("Location permission not granted");
        }
      } catch (err) {
        setLocationError(err);
      } finally {
        setLocationMounted(true);
      }
    };
    
    startWatching();
    
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, []);

  return {
    location,
    locationError,
    locationMounted,
  };
}
