import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { HeaderBack } from "@/app/Components/Header";

const Report = () => {
  const { t } = useTranslation();
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState('');
    const [goodsType, setGoodsType] = useState('');
    const [cartonsCount, setCartonsCount] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [errors, setErrors] = useState({});



   
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBack name={t('report')} />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={t("shipmentSize")}
            placeholderTextColor="#666"
            value={size}
            onChangeText={setSize}
          />
          
          <TextInput
            style={styles.input}
            placeholder={t("shipmentWeight")}
            keyboardType="numeric"
            placeholderTextColor="#666"
            value={weight}
            onChangeText={setWeight}
          />
          <TextInput
            style={styles.input}
            placeholder={t("goodsType")}
            placeholderTextColor="#666"
            value={goodsType}
            onChangeText={setGoodsType}
          />
          
          <TextInput
            style={styles.input}
            placeholder={t("cartonsCount")}
            keyboardType="numeric"
            placeholderTextColor="#666"
            value={cartonsCount}
            onChangeText={setCartonsCount}
          />
          
          <TextInput
            style={styles.input}
            placeholder={t("pickupLocation")}
            placeholderTextColor="#666"
            value={pickupLocation}
            onChangeText={setPickupLocation}
          />
          
          <TextInput
            style={styles.input}
            placeholder={t("deliveryLocation")}
            placeholderTextColor="#666"
            value={deliveryLocation}
            onChangeText={setDeliveryLocation}
          />
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{t("submit")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Report;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleScreen: {
    width: "100%",
    backgroundColor: "#53045F",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    padding: 15,
  },
  form: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    fontFamily: "Cairo-Regular",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 15,
    fontFamily: "Cairo-Regular",
  },
  button: {
    backgroundColor: "#53045F",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Cairo-SemiBold",
  },
});
