import { useEffect, useState } from "react";
import {
  LocationObject,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  LocationSubscription,
  Accuracy,
} from "expo-location";

export function useWatchLocation() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState<any>(null);

  useEffect(() => {
    let subscriber: LocationSubscription | null = null;

    const startWatching = async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        const positionArgs = {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        };

        subscriber = await watchPositionAsync(positionArgs, setLocation);

        if (status !== "granted") {
          throw new Error("Location permission not granted");
        }
      } catch (err) {
        setLocationError(err);
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
  };
}
