// REACT IMPORTS
import { useCallback } from "react";

// NATIVE IMPORTS
import { Pressable, Image, Text, StyleSheet } from "react-native";

// EXPO
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";

function useRenderService(handlePress) {
  const service = useCallback(
    (item) => (
      <Pressable
        key={item.id}
        style={styles.container}
        onPress={() => handlePress(item)}
      >
        {item.iconName === "exclamationcircle" ? (
          <AntDesign name={item.iconName} size={28} color="white" />
        ) : item.iconName === "address-card" ? (
          <FontAwesome name={item.iconName} size={28} color="white" />
        ) : !item.iconName ? (
          <Image source={item.imageUrl} style={styles.itemIcon} />
        ) : (
          <Feather name={item.iconName} size={30} color="white" />
        )}
        <Text style={styles.serviceText} numberOfLines={2}>
          {item.title}
        </Text>
      </Pressable>
    ),
    [handlePress]
  );

  return service;
}

export default useRenderService;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "33%",
    transform: [{ scaleX: -1 }],
  },
  serviceText: {
    color: "#000",
    fontFamily: "IranSans-DemiBold",
    minHeight: 35,
    textAlign: "center",
    fontSize: 12,
  },
  itemIcon: {
    width: 50,
    height: 50,
  },
});
