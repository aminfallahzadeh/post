// IMPORTS
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Tabs } from "expo-router";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "@/components/TabBar";
import SettingsMenu from "@/views/SettingsMenu";

const { width, height } = Dimensions.get("screen");

const TabsLayout = () => {
  // STATES
  const [menuVisible, setMenuVisible] = useState(false);

  // CONSTS
  const animationValue = useRef(new Animated.Value(-width)).current;

  // TOGGLE MENU
  const toggleMenu = () => {
    const toValue = menuVisible ? width : 0;
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
      <View style={styles.topBar} className="mt-10">
        <Text
          style={styles.title}
          className="text-primary font-bold text-[20px] m-auto"
        >
          POST
          <Text className="text-secondary">.IR</Text>
        </Text>

        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* TAB LAYOUT */}
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        {/* <Tabs.Screen
          name="followup"
          options={{
            headerShown: false,
            tabBarLabel: "پیگیری",
          }}
        /> */}
        <Tabs.Screen
          name="services"
          options={{ headerShown: false, tabBarLabel: "خدمات" }}
        />
        <Tabs.Screen
          name="mypost"
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
    // top: StatusBar.currentHeight + 20,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    width: width,
    height: height,
    backgroundColor: "#fff",
    zIndex: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
};
