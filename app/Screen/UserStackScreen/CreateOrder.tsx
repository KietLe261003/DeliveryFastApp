import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "@/app/Components/Header";

interface Order {
  userId: string;
  senderAddress: string;
  reciverName: string;
  reciverPhone: string;
  receiverAddress: string;
  note: string;
  weight: number;
  deliveryFee: number;
  images: any;
  status: string;
  createAt: Date;
  updateAt: Date;
  locationSender: { latitude: number; longitude: number };
  locationReciver: { latitude: number; longitude: number };
}

interface CreateOrderProps {
  initForm?: Partial<Order>;
  getAll?: () => void;
  closeModal?: () => void;
}

const CreateOrder: React.FC<CreateOrderProps> = ({
  initForm,
  getAll,
  closeModal,
}) => {
  const navigation = useNavigation<any>();
  const [order, setOrder] = useState<Partial<Order>>(
    initForm || {
      senderAddress: "",
      reciverName: "",
      reciverPhone: "",
      receiverAddress: "",
      note: "",
      weight: 0,
      deliveryFee: 0,
      locationSender: { latitude: 0, longitude: 0 },
      locationReciver: { latitude: 0, longitude: 0 },
    }
  );
  const [images, setImages] = useState<string[]>(initForm?.images || []);
  const [modalVisible, setModalVisible] = useState<
    "sender" | "receiver" | null
  >(null);
  const [tempLocation, setTempLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission denied",
        "You need to grant permission to access the gallery"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleLocationSelect = () => {
    if (modalVisible === "sender") {
      setOrder({ ...order, locationSender: tempLocation });
    } else if (modalVisible === "receiver") {
      setOrder({ ...order, locationReciver: tempLocation });
    }
    setModalVisible(null);
  };

  const handleSubmit = async () => {
    try {
      const newOrder: Order = {
        ...order,
        userId: "user-id", // Thay bằng userId thực tế từ context
        images,
        status: initForm ? order.status || "waiting" : "waiting",
        createAt: initForm ? order.createAt || new Date() : new Date(),
        updateAt: new Date(),
        locationSender: order.locationSender || { latitude: 0, longitude: 0 },
        locationReciver: order.locationReciver || { latitude: 0, longitude: 0 },
        weight: Number(order.weight) || 0,
        deliveryFee: Number(order.deliveryFee) || 0,
      } as Order;

      // Giả lập gọi API
      console.log("Order Data:", newOrder);
      Alert.alert(
        "Success",
        initForm ? "Order updated successfully" : "Order created successfully"
      );

      if (getAll) getAll();
      if (closeModal) closeModal();
      setOrder({
        senderAddress: "",
        reciverName: "",
        reciverPhone: "",
        receiverAddress: "",
        note: "",
        weight: 0,
        deliveryFee: 0,
        locationSender: { latitude: 0, longitude: 0 },
        locationReciver: { latitude: 0, longitude: 0 },
      });
      setImages([]);
    } catch (err) {
      Alert.alert("Error", "Something went wrong, please try again");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBack name="Tạo đơn hàng" />
      <ScrollView style={styles.container}>
        {/* Modal for Location Picker */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!modalVisible}
          onRequestClose={() => setModalVisible(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Select {modalVisible === "sender" ? "Sender" : "Receiver"}{" "}
                Location
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Latitude"
                keyboardType="numeric"
                value={tempLocation.latitude.toString()}
                onChangeText={(text) =>
                  setTempLocation({ ...tempLocation, latitude: Number(text) })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Longitude"
                keyboardType="numeric"
                value={tempLocation.longitude.toString()}
                onChangeText={(text) =>
                  setTempLocation({ ...tempLocation, longitude: Number(text) })
                }
              />
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setModalVisible(null)} />
                <Button title="Select" onPress={handleLocationSelect} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Form Content */}
        <Text style={styles.sectionTitle}>Create Order</Text>

        {/* Product Info */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Product Information</Text>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={order.weight?.toString()}
                onChangeText={(text) =>
                  setOrder({ ...order, weight: Number(text) })
                }
                placeholder="Enter weight"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Delivery Fee</Text>
              <TextInput
                style={styles.input}
                value={order.deliveryFee?.toString()}
                onChangeText={(text) =>
                  setOrder({ ...order, deliveryFee: Number(text) })
                }
                placeholder="Enter delivery fee"
                keyboardType="numeric"
              />
            </View>
          </View>
          <Text style={styles.label}>Product Images</Text>
          <Button title="Pick Images" onPress={pickImage} />
          <View style={styles.imageContainer}>
            {images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.image} />
            ))}
          </View>
        </View>

        {/* Receiver Info */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Receiver Information</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Receiver Name</Text>
            <TextInput
              style={styles.input}
              value={order.reciverName}
              onChangeText={(text) => setOrder({ ...order, reciverName: text })}
              placeholder="Enter receiver name"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Receiver Phone</Text>
            <TextInput
              style={styles.input}
              value={order.reciverPhone}
              onChangeText={(text) =>
                setOrder({ ...order, reciverPhone: text })
              }
              placeholder="Enter receiver phone"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Receiver Address</Text>
            <TextInput
              style={styles.input}
              value={order.receiverAddress}
              onChangeText={(text) =>
                setOrder({ ...order, receiverAddress: text })
              }
              placeholder="Enter receiver address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Receiver Location</Text>
            <TouchableOpacity
              style={styles.locationButton}
              onPress={() => setModalVisible("receiver")}
            >
              <Text style={styles.locationButtonText}>
                {order.locationReciver?.latitude &&
                order.locationReciver?.longitude
                  ? `(${order.locationReciver.latitude.toFixed(
                      6
                    )}, ${order.locationReciver.longitude.toFixed(6)})`
                  : "Select Location"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sender Info */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Sender Information</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Sender Address</Text>
            <TextInput
              style={styles.input}
              value={order.senderAddress}
              onChangeText={(text) =>
                setOrder({ ...order, senderAddress: text })
              }
              placeholder="Enter sender address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Sender Location</Text>
            <TouchableOpacity
              style={styles.locationButton}
              onPress={() => setModalVisible("sender")}
            >
              <Text style={styles.locationButtonText}>
                {order.locationSender?.latitude &&
                order.locationSender?.longitude
                  ? `(${order.locationSender.latitude.toFixed(
                      6
                    )}, ${order.locationSender.longitude.toFixed(6)})`
                  : "Select Location"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Note */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Additional Note</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Note</Text>
            <TextInput
              style={[styles.input, styles.noteInput]}
              value={order.note}
              onChangeText={(text) => setOrder({ ...order, note: text })}
              placeholder="Enter note"
              multiline
            />
          </View>
        </View>

        {/* Submit Button */}
        <Button
          title={initForm ? "Update Order" : "Create Order"}
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  noteInput: {
    height: 80,
    textAlignVertical: "top",
  },
  locationButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#fff",
  },
  locationButtonText: {
    fontSize: 14,
    color: "#333",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  image: {
    width: 80,
    height: 80,
    margin: 4,
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default CreateOrder;
