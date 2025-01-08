// IMPORTS
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import Background from "@/components/Background";
import MyTabBar from "@/components/MyTabBar";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext(Navigator);

// const TopTabs = createMaterialTopTabNavigator();

const TabsLayout = () => {
  return (
    <Background>
      <MaterialTopTabs
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          tabBarScrollEnabled: true,
          sceneStyle: {
            backgroundColor: "transparent",
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
            title: "مرسوله پستی",
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
    </Background>
  );
};

export default TabsLayout;
