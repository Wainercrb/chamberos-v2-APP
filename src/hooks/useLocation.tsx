import { useEffect, useState } from 'react'
import * as Location from 'expo-location'

type LocationCoords = Location.LocationObjectCoords

interface IResponse {
  readonly location: LocationCoords | null
  readonly locationError: string | null
}

export function useLocation (): IResponse {
  const [location, setLocation] = useState<LocationCoords | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    const getLocation = async (): Promise<void> => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
          setLocationError('Permission to access location was denied')
          return
        }

        const { coords } = await Location.getCurrentPositionAsync({})
        setLocation(coords as any)
      } catch (error) {
        setLocationError(error as any)
      }
    }

    void getLocation()
  }, [])

  return { location, locationError } as const
}
