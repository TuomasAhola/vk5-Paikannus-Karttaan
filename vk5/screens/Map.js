import { StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps'
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location'

export default function Map() {

    const [location, setLocation] = useState({
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
    })

    const getUserPosition = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()

        try {
            if (status !== 'granted') {
                console.log('Geolocation failed')
                return
            }
            const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
            setLocation({...location,"latitude": position.coords.latitude,"longitude": position.coords.longitude})
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async() => {
            getUserPosition()
        })()
    }, [])

    return (
        <>
            <MapView
                style={styles.map}
                region={location}
            >
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude
                    }}
                    title="Your Location"
                />
            </MapView>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
});