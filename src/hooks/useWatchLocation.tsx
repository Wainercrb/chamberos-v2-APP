import { useEffect, useState } from 'react'
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
  type LocationSubscription,
  type LocationObject
} from 'expo-location'

interface TResponse {
  readonly location: LocationObject | null
  readonly locationError: any
  readonly locationMounted: boolean
}

export function useWatchLocation (): TResponse {
  const [location, setLocation] = useState<LocationObject | null>(null)
  const [locationError, setLocationError] = useState<any>(null)
  const [locationMounted, setLocationMounted] = useState(false)

  useEffect(() => {
    let subscriber: LocationSubscription | null = null

    const startWatching = async (): Promise<void> => {
      try {
        const { status } = await requestForegroundPermissionsAsync()
        const positionArgs = {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 5000,
          distanceInterval: 10
        }

        subscriber = await watchPositionAsync(positionArgs, setLocation)

        if (status !== 'granted') {
          throw new Error('Location permission not granted')
        }
      } catch (err) {
        setLocationError(err)
      } finally {
        setLocationMounted(true)
      }
    }

    void startWatching()

    return () => {
      if (subscriber != null) {
        subscriber.remove()
      }
    }
  }, [])

  return {
    location,
    locationError,
    locationMounted
  } as const
}
