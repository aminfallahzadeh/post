// IMPORTS
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/Background";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext(Navigator);

const tabLabelStyle = {
  fontSize: 14,
  fontFamily: "IranSans-DemiBold",
};

const TabsLayout = () => {
  return (
    <Background>
      <SafeAreaView className="h-full">
        <MaterialTopTabs
          screenOptions={{
            tabBarScrollEnabled: true,
            lazy: true,
            tabBarLabelStyle: tabLabelStyle,
            tabBarItemStyle: {
              width: 100,

              transform: [{ scaleX: -1 }],
            },
          }}
          style={{
            transform: [{ scaleX: -1 }],

            elevation: 0,
            shadowOpacity: 0,
          }}
        >
          <MaterialTopTabs.Screen
            name="index"
            options={{
              title: "سفارش",
            }}
          />
          <MaterialTopTabs.Screen
            name="my-govahi"
            options={{
              title: "گواهی",
            }}
          />
          <MaterialTopTabs.Screen
            name="my-gheramat"
            options={{
              title: "غرامت",
            }}
          />

          <MaterialTopTabs.Screen
            name="my-complaint"
            options={{
              title: "شکایت",
            }}
          />

          <MaterialTopTabs.Screen
            name="my-postcode"
            options={{
              title: "کد پستی",
            }}
          />

          <MaterialTopTabs.Screen
            name="my-yafte"
            options={{
              title: "پست یافته",
            }}
          />
        </MaterialTopTabs>
      </SafeAreaView>
    </Background>
  );
};

export default TabsLayout;
