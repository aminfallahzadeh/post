// IMPORTS
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import Background from "@/components/Background";
import TopTabBar from "@/components/TopTabBar";
import PostCodeTabIcon from "@/components/SVG/PostCodeTabIcon";
import YafteTabIcon from "@/components/SVG/YafteTabIcon";
import ComplaintTabIcon from "@/components/SVG/ComplaintTabIcon";
import GheramatTabIcon from "@/components/SVG/GheramatTabIcon";
import GovahiTabIcon from "@/components/SVG/GovahiTabIcon";
import PostTabIcon from "@/components/SVG/PostTabIcon";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext(Navigator);

const TabsLayout = () => {
  return (
    <Background>
      <MaterialTopTabs
        tabBar={(props) => <TopTabBar {...props} />}
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
            tabBarIcon: (color) => <PostTabIcon color={color} />,
          }}
        />

        <MaterialTopTabs.Screen
          name="my-govahi"
          options={{
            title: "گواهی",
            tabBarIcon: (color) => <GovahiTabIcon color={color} />,
          }}
        />
        <MaterialTopTabs.Screen
          name="my-gheramat"
          options={{
            title: "غرامت",
            tabBarIcon: (color) => <GheramatTabIcon color={color} />,
          }}
        />
        <MaterialTopTabs.Screen
          name="my-complaint"
          options={{
            title: "شکایت",
            tabBarIcon: (color) => <ComplaintTabIcon color={color} />,
          }}
        />
        <MaterialTopTabs.Screen
          name="my-postcode"
          options={{
            title: "کد پستی",
            tabBarIcon: (color) => <PostCodeTabIcon color={color} />,
          }}
        />
        <MaterialTopTabs.Screen
          name="my-yafte"
          options={{
            title: "پست یافته",
            tabBarIcon: (color) => <YafteTabIcon color={color} />,
          }}
        />
      </MaterialTopTabs>
    </Background>
  );
};

export default TabsLayout;
