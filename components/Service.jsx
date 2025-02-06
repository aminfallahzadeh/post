// IMPORTS
import { View, Text, Pressable, StyleSheet } from "react-native";
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
  ReturnIcon,
  RedistributionIcon,
} from "./SVG/Icons";
import EditAddressIcon from "./SVG/icons/EditAddressIcon";
import DistTimeIcon from "./SVG/icons/DistTimeIcon";
import RegisterOfferIcon from "./SVG/icons/RegisterOfferIcon";
import SecondAddressIcon from "./SVG/icons/SecondAddressIcon";
import SignatureObserve from "./SVG/icons/SignatureObserve";
import AppreciationIcon from "./SVG/icons/AppreciationIcon";
import DeliveryCodeIcon from "./SVG/icons/DeliveryCodeIcon";
import SurveyIcon from "./SVG/icons/SurveyIcon";
import OnlineReserveIcon from "./SVG/icons/OnlineReserveIcon";
import RegisterInfoIcon from "./SVG/icons/RegisterInfoIcon";
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
  return: <ReturnIcon />,
  redistribution: <RedistributionIcon />,
  editAddress: <EditAddressIcon />,
  distTime: <DistTimeIcon />,
  registerOffer: <RegisterOfferIcon />,
  secondAddress: <SecondAddressIcon />,
  signature: <SignatureObserve />,
  appreciation: <AppreciationIcon />,
  deliveryCode: <DeliveryCodeIcon />,
  survey: <SurveyIcon />,
  onlineReserve: <OnlineReserveIcon />,
  registerInfo: <RegisterInfoIcon />,
};

const Service = ({ item, handlePress }) => {
  return (
    <Pressable key={item.id} style={styles.container} onPress={handlePress}>
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
  fullScreenContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
