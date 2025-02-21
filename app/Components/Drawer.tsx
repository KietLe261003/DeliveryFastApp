import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Drawer } from "react-native-drawer-layout";
import Home from "../Screen/StackScreen/Home";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DrawerNav = () => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const toggleSidebar = () => setOpen(!open);
  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType="slide"
      hideStatusBarOnOpen={true}
      renderDrawerContent={() => (
        <View style={styles.drawerContent}>
            <View style={styles.userInfo}>
                <Image
                    source={{uri: 'https://cdn-icons-png.flaticon.com/128/16869/16869838.png'}}
                    style={styles.avatar}
                />
                <Text style={styles.userName}>Guest</Text>
            </View>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                    setOpen(false);
                    // navigation.navigate('Home');
                }}
            >
                <Ionicons name="person" size={24} color="#333" />
                <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                // onPress={() => handleLanguageChange(currentLanguage === 'ar' ? 'curdi' : 'ar')}
            >
                <Ionicons name="language" size={24} color="#333" />
                <Text style={styles.menuText}>
                    Tiếng Anh
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                    setOpen(false);
                }}
            >
                <Ionicons name="log-out" size={24} color="#53045F" />
                <Text style={[styles.menuText, { color: '#53045F' }]}>LogOut</Text>
            </TouchableOpacity>
        </View>
    )}
    >
        <Home openSideBar={toggleSidebar}></Home>
    </Drawer>
  );
};
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        padding: 20,
    },
    userInfo: {
        alignItems: 'center',
        marginVertical: 30,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    menuText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Cairo-Regular',
    },
});
export default DrawerNav;
