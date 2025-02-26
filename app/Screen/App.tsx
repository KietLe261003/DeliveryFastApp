import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../Context/AuthContext";
import Loading from "../Components/Loading";
import { NavigationContainer } from "@react-navigation/native"; // Đặt NavigationContainer ở đây
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNav from "../Components/Drawer";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

const Stack = createNativeStackNavigator();

const App = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={DrawerNav} />
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
      </Stack.Navigator>
    </>
  );
};

export default App;
