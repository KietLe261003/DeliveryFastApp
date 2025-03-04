import { HeaderBack } from "@/app/Components/Header";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const History = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const [data, setData] = useState([
    {
      id: 1,
      locationCurrent: "New York",
      assignedAt: "2025-02-15T08:00:00Z",
    },
    {
      id: 2,
      locationCurrent: "Los Angeles",
      assignedAt: "2025-02-14T08:00:00Z",
    },
    {
      id: 3,
      locationCurrent: "Chicago",
      assignedAt: "2025-02-13T08:00:00Z",
    },
    {
      id: 4,
      locationCurrent: "Houston",
      assignedAt: "2025-02-12T08:00:00Z",
    },
    {
      id: 5,
      locationCurrent: "San Francisco",
      assignedAt: "2025-02-11T08:00:00Z",
    },
  ]);
  const calculateDaysLeft = (deliveredDate: any) => {
    const currentDate = new Date();
    const deliveredDateObj = new Date(deliveredDate);
    const timeDifference = deliveredDateObj.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack name={t("historydelivery")} />
      <FlatList
        // style={styles.shipmentsContainer}
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ShipmentDetails", { shipment: item })
            }
            style={styles.shipmentCard}
          >
            <View style={{ alignItems: "flex-end", flex: 1 }}>
              <View style={styles.shipmentHeader}>
                <FontAwesome6 name="hashtag" size={15} color="#53045F" />
                <Text style={styles.shipmentText}>{item.locationCurrent}</Text>
              </View>
              <View style={styles.shipmentHeader}>
                <AntDesign name="user" size={15} color="#53045F" />
                <Text style={styles.shipmentText}>{item.locationCurrent}</Text>
              </View>
              <View style={styles.shipmentHeader}>
                <Feather name="box" size={15} color="#53045F" />
                <Text style={styles.shipmentText}>{item.locationCurrent}</Text>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={[
                  styles.shipmentText,
                  { color: "gray", marginBottom: 10 },
                ]}
              >
                {calculateDaysLeft(item.assignedAt)} {"days_left"}
              </Text>
              <FontAwesome5 name="box" size={24} color="gray" />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  shipmentHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  shipmentCard: {
    backgroundColor: "#fff",
    borderRightWidth: 5,
    borderColor: "#53045F",
    borderRadius: 10,
    padding: 7,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignSelf: "center",
    width: 340,
    margin: 10,
    elevation: 5,
  },
  shipmentText: {
    color: "#333",
    fontSize: 14,
    fontFamily: "Cairo-SemiBold",
  },
});
