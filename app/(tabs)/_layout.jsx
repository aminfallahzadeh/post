// NATIVE IMPROTS
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";

// EXPO IMPORTS
import { Tabs } from "expo-router";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

// COMPONENTS
import TabBar from "../../components/TabBar";
import SettingsMenu from "../../components/SettingsMenu";

const { width, height } = Dimensions.get("screen");

const TabsLayout = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(-width)).current;

  // TOGGLE MENU
  const toggleMenu = () => {
    const toValue = menuVisible ? -width : 0;
    Animated.timing(animationValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  };

  return (
    <>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Text
          style={styles.title}
          className="text-primary font-bold text-[20px]"
        >
          POST
          <Text className="text-secondary">.IR</Text>
        </Text>
        <TouchableOpacity>
          <Ionicons name="search" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* TAB LAYOUT */}
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="followup"
          options={{
            headerShown: false,
            tabBarLabel: "پیگیری",
          }}
        />
        <Tabs.Screen
          name="services"
          options={{ headerShown: false, tabBarLabel: "خدمات" }}
        />
        <Tabs.Screen
          name="profile"
          options={{ headerShown: false, tabBarLabel: "پست من" }}
        />
      </Tabs>

      {/* BURGER MENU OVERLAY */}
      <Animated.View
        style={[
          styles.menuOverlay,
          { transform: [{ translateX: animationValue }] },
        ]}
      >
        <SettingsMenu closeHandler={toggleMenu} />
      </Animated.View>
    </>
  );
};

export default TabsLayout;

const styles = {
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "transparent",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { height: 2, width: 0 },
    position: "absolute",
    zIndex: 1,
    top: StatusBar.currentHeight + 20,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: "#fff",
    zIndex: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
};
