import { View, Text, SafeAreaView, StyleSheet, Animated, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderBack } from "@/app/Components/Header";
import { useTranslation } from "react-i18next";
import MapView, { Marker, Polygon, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { WareHouse, WareHouseResponse } from "@/app/Type/OrderType";
import { OrderService } from "@/app/Service/OrderService";

const MapScreen = () => {
  const { t } = useTranslation();
  const [routeCoordinates,setRouteCoordinates] = useState<WareHouse[]>([]);


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

  const getAllWareHouse = async()=>{
    try {
      const res:WareHouseResponse = await OrderService.getAllWareHouse();
      setRouteCoordinates(res.data);
    } catch (error) {
      console.log("Lấy dữ liệu thất bại");
      
    }
  }
  useEffect(()=>{
    getAllWareHouse();
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack name={t("Google Map")} />
      <View style={{ flex: 1 }}>
        {
          routeCoordinates.length > 0 && 
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
            {routeCoordinates.map((item, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                }}
                title={`Điểm ${index + 1}`}
                description={`Name: ${item.name},Lat: ${item.location.latitude}, Lng: ${item.location.longitude}`}
              />
            ))}
          </MapView>
        }
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
});
