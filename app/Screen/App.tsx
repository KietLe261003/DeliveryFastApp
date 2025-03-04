import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../Context/AuthContext";
import Loading from "../Components/Loading";
import { NavigationContainer } from "@react-navigation/native"; // Đặt NavigationContainer ở đây
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNav from "../Components/Drawer";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Order from "./StackScreen/Order";
import Delivery from "./StackScreen/Delivery";
import History from "./StackScreen/History";
import Report from "./StackScreen/Report";
import Notification from "./StackScreen/Notification";
import DetailOrder from "./StackScreen/DetailOrder";
import MapScreen from "./StackScreen/MapScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const { isLoading, token } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={!token ? "Login" : "Home"}
      >
        {!token ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={DrawerNav} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Delivery" component={Delivery} />
            <Stack.Screen name="Report" component={Report} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="DetailOrder" component={DetailOrder} />
            <Stack.Screen name="Map" component={MapScreen} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default App;
