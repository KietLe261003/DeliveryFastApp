import { View, Text, SafeAreaView, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HeaderBack } from '@/app/Components/Header';
import { useTranslation } from 'react-i18next';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

const MapScreen = () => {
    const { t } = useTranslation();

    // Danh sách tọa độ từ A đến B
    const routeCoordinates = [
        { latitude: 10.7769, longitude: 106.7009 }, // Điểm A
        { latitude: 10.7775, longitude: 106.7015 },
        { latitude: 10.7780, longitude: 106.7020 },
        { latitude: 10.7785, longitude: 106.7025 },
        { latitude: 10.7790, longitude: 106.7030 }, // Điểm B
    ];

    const [index, setIndex] = useState(0);
    const [position, setPosition] = useState(routeCoordinates[0]);

    // Animated Value để cập nhật vị trí Marker
    const animatedLatitude = useState(new Animated.Value(position.latitude))[0];
    const animatedLongitude = useState(new Animated.Value(position.longitude))[0];

    useEffect(() => {
        const interval = setInterval(() => {
            if (index < routeCoordinates.length - 1) {
                const newCoordinate = routeCoordinates[index + 1];
                setIndex((prev) => prev + 1);
                Animated.timing(animatedLatitude, {
                    toValue: newCoordinate.latitude,
                    duration: 1000, 
                    useNativeDriver: false,
                }).start();

                Animated.timing(animatedLongitude, {
                    toValue: newCoordinate.longitude,
                    duration: 1000,
                    useNativeDriver: false,
                }).start();

                setPosition(newCoordinate);
            } else {
                clearInterval(interval);
            }
        }, 2000); 

        return () => clearInterval(interval);
    }, [index]);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack name={t('Google Map')} />
            <View style={{ flex: 1 }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: routeCoordinates[0].latitude,
                        longitude: routeCoordinates[0].longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {/* Vẽ tuyến đường */}
                    <Polyline coordinates={routeCoordinates} strokeWidth={3} strokeColor="blue" />

                    {/* Marker di chuyển theo vị trí */}
                    <Marker.Animated
                        coordinate={{
                            latitude: animatedLatitude,
                            longitude: animatedLongitude,
                        }}
                    />
                </MapView>
            </View>
        </SafeAreaView>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
});
