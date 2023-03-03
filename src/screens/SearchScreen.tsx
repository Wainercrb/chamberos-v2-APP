import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Platform,
  View,
  Text
} from 'react-native'
import { useWatchLocation } from '../hooks/useWatchLocation'
import Slider from '@react-native-community/slider'
import { Map } from '../components/Map'
import { ProfessionModal } from '../components/ProfessionModal'
import { ErrorFeedback } from '../components/ErrorFeedback'
import { useLazyGetUsersQuery } from '../services/chamberosAPI'
import { type TListOfProfessions } from '../../types'
import { CONSTANTS } from '../../CONSTANTS'

export default function SearchScreen (): JSX.Element {
  const { location, locationError, locationMounted } = useWatchLocation()
  const [radius, setRadius] = useState(15)
  const [fetchUsers, users] = useLazyGetUsersQuery()

  const handleTriggerUserData = (
    customRadius?: number,
    professions?: TListOfProfessions
  ): void => {
    if (location === null) return

    void fetchUsers(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        radius: customRadius ?? radius,
        professions: getProfessionIds(professions)
      },
      true
    )
  }

  const getProfessionIds = (professions: TListOfProfessions | undefined): string => {
    if (professions == null) return users.originalArgs?.professions ?? ''
    return professions
      .reduce((prev, curr) => (prev += `,${curr.id ?? '-'}`), '')
  }

  useEffect(() => {
    if (!locationMounted) return

    handleTriggerUserData()
  }, [location])

  return (
    <View style={styles.container}>
      {(location !== null) && Platform.OS !== 'web'
        ? <>
          {/* <Map users={users.data ?? []} location={location} radius={radius} /> */}
        </>
        : null}
      <View style={styles.professionButtonContainer}>
        <ProfessionModal
          closeCallbackAction={
            (professions) => { handleTriggerUserData(undefined, professions) }
          }
        />
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          step={0.1}
          maximumValue={500}
          minimumValue={0.2}
          style={styles.slider}
          value={radius}
          onValueChange={setRadius}
          onSlidingComplete={handleTriggerUserData}
        />
        <Text style={styles.radiusText}>
          {radius.toFixed(0)} KM | Results: {users.data?.length ?? 0}
        </Text>
      </View>

      {users.isFetching
        ? <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={CONSTANTS.LOADING_COLOR} />
        </View>
        : null}
      {(users.error !== null) || (locationError !== null)
        ? <View style={styles.errorContainer}>
          {(users.error !== null) ? <ErrorFeedback error={users.error} /> : null}
          {(locationError !== null) ? <ErrorFeedback error={locationError} /> : null}
        </View>
        : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  professionButtonContainer: {
    position: 'absolute',
    left: 8,
    bottom: 92,
    backgroundColor: 'white',
    borderRadius: 20
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    padding: 4
  },
  radiusText: {
    backgroundColor: 'white',
    opacity: 0.7
  },
  loadingContainer: {
    position: 'absolute',
    top: '40%',
    right: '50%'
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: '25%',
    maxWidth: '100%'
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10,
    backgroundColor: 'white'
  }
})
