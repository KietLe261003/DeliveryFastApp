import { View, Text, SafeAreaView, StyleSheet, Animated, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderBack } from "@/app/Components/Header";
import { useTranslation } from "react-i18next";
import MapView, { Marker, Polygon, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

import { RouteProp, useRoute } from "@react-navigation/native";
import { Tracking, TrackingResponse } from "@/app/Type/TrackingType";
import { OrderService } from "@/app/Service/OrderService";
import { GeoPoint } from "@/app/Type/OrderType";
interface MapRouteOrderParam{
  orderId: string,
}
const MapRouteOrder = () => {
  const { t } = useTranslation();
  const route =
      useRoute<
        RouteProp<{ MapScreenRoute: MapRouteOrderParam}, "MapScreenRoute">
      >();
  const {orderId}=route.params;
  const [routeCoordinates,setRouteCoordinates] = useState<Tracking[]>([]);
  const [path,setPath]=useState<GeoPoint[]>([]);

  // Danh sách tọa độ từ A đến B
  // const routeCoordinates = [
  //   { latitude: 10.7769, longitude: 106.7009 }, // Điểm A
  //   { latitude: 10.7775, longitude: 106.7015 },
  //   { latitude: 10.778, longitude: 106.702 },
  //   { latitude: 10.7785, longitude: 106.7025 },
  //   { latitude: 10.779, longitude: 106.703 }, // Điểm B
  // ];


  const shipperArea = [
    { latitude: 10.7765, longitude: 106.7005 },
    { latitude: 10.7785, longitude: 106.7005 },
    { latitude: 10.7790, longitude: 106.7025 },
    { latitude: 10.7765, longitude: 106.7030 },
  ];

  const getAllTracking = async()=>{
    try {
      const res:TrackingResponse = await OrderService.getAllTracking(orderId);
      setRouteCoordinates(res.data);
      const pathMap= res.data.map((item)=>{
        return item.location
      });
      setPath(pathMap);
    } catch (error) {
      console.log(orderId);
      console.log("Lấy dữ liệu thất bại",error);
    }
  }
  useEffect(()=>{
    getAllTracking();
  },[orderId])

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack name={t("Google Map")} />
      <View style={{ flex: 1 }}>
        {routeCoordinates.length > 0 && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: routeCoordinates[0].location.latitude,
              longitude: routeCoordinates[0].location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Polygon
              coordinates={shipperArea}
              strokeWidth={2}
              strokeColor="red"
              fillColor="rgba(255, 0, 0, 0.2)" // Màu đỏ nhạt
            />
            <Polyline
              coordinates={path}
              strokeWidth={3}
              strokeColor="blue"
            />
            {routeCoordinates.map((item, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                }}
                title={`Điểm ${index + 1}`}
                description={`Des: ${item.description},Lat: ${item.location.latitude}, Lng: ${item.location.longitude}`}
              />
            ))}
          </MapView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MapRouteOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
});
