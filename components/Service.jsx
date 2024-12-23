// IMPORTS
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import {
  NerkhnameIcon,
  DarkhastCodePostiIcon,
  PostYafteIcon,
  GheramatIcon,
  PostCodeCertificateIcon,
  GovahiMakani,
  NewComplaintIcon,
  NewOrderIcon,
  EhrazIcon,
  ForbiddenThingsIcon,
} from "@/components/SVG/Icons";
import React from "react";

const icons = {
  nerkhname: <NerkhnameIcon />,
  darkhastCodePosti: <DarkhastCodePostiIcon />,
  postYafte: <PostYafteIcon />,
  gheramat: <GheramatIcon />,
  postCodeCertificate: <PostCodeCertificateIcon />,
  govahiMakani: <GovahiMakani />,
  newComplaint: <NewComplaintIcon />,
  newOrder: <NewOrderIcon />,
  ehraz: <EhrazIcon />,
  forbiddenThings: <ForbiddenThingsIcon />,
};

const Service = ({ item }) => {
  return (
    <Pressable
      key={item.id}
      style={styles.container}
      onPress={() => router.push(item.url)}
    >
      {item.icon && (
        <View className="justify-center items-center">{icons[item.icon]}</View>
      )}
      <Text style={styles.serviceText} numberOfLines={2}>
        {item.title}
      </Text>
    </Pressable>
  );
};

export default Service;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "24%",
    gap: 5,
    transform: [{ scaleX: -1 }],
  },
  serviceText: {
    color: "#000",
    fontFamily: "IranSans-Regular",
    minHeight: 35,
    textAlign: "center",
    fontSize: 12,
  },
  itemIcon: {
    width: 50,
    height: 50,
  },
});
