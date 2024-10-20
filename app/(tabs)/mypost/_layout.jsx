import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// COMPONETNS
import MyPostsView from "@/views/MyPostsView";
import MyComplaintsView from "@/views/MyComplaintsView";
import MyGovahiView from "@/views/MyGovahiView";
import MyGheramatsView from "@/views/MyGheramatsView";

import Background from "@/components/Background";

const Tab = createMaterialTopTabNavigator();

const tabLabelStyle = {
  fontSize: 15,
  fontFamily: "IranSans-DemiBold",
  transform: [{ scaleX: -1 }],
};

function TopTabsLayout() {
  return (
    <Background>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarIndicatorStyle: { backgroundColor: "#fcd900" },
        }}
        className="mt-32"
        style={{ transform: [{ scaleX: -1 }] }}
      >
        <Tab.Screen
          name="Posts"
          component={MyPostsView}
          options={{
            tabBarLabel: "سفارش",
            tabBarLabelStyle: tabLabelStyle,
          }}
        />
        <Tab.Screen
          name="Govahi"
          component={MyGovahiView}
          options={{
            tabBarLabel: "گواهی",
            tabBarLabelStyle: tabLabelStyle,
          }}
        />
        <Tab.Screen
          name="Gheramat"
          component={MyGheramatsView}
          options={{
            tabBarLabel: "غرامت",
            tabBarLabelStyle: tabLabelStyle,
          }}
        />
        <Tab.Screen
          name="Complaints"
          component={MyComplaintsView}
          options={{
            tabBarLabel: "شکایت",
            tabBarLabelStyle: tabLabelStyle,
          }}
        />
      </Tab.Navigator>
    </Background>
  );
}

export default TopTabsLayout;
