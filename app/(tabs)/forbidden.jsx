// IMPORTS
import React from "react";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { rows } from "@/data/forbidden";

const Forbidden = () => {
  return (
    <Background>
      <SafeAreaView className="h-full">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingBottom: 130,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full justify-center items-center">
            <Text className="font-isansmedium text-base text-center">
              لیست ممنوعات پستی
            </Text>
          </View>

          <View className="w-full bg-primary h-[2px] mt-5 mb-5" />

          {/* FIRST TABLE */}
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>شرح</Text>
              </View>
              <View style={[styles.headerCell, styles.numberColumn]}>
                <Text style={styles.headerText}>ردیف</Text>
              </View>
            </View>

            {/* Table Rows */}
            {rows.postForbidden.map((row, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  { backgroundColor: index % 2 === 0 ? "#fff" : "#f0f0f0" },
                ]}
              >
                <View style={styles.rowCell}>
                  <Text style={styles.rowText}>{row.description}</Text>
                </View>
                <View style={[styles.rowCell, styles.numberColumn]}>
                  <Text style={styles.rowText}>{row.number}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="w-full justify-center items-center mt-5">
            <Text className="font-isansmedium text-base text-center">
              جدول اوزان مرسولات پستی
            </Text>
          </View>

          <View className="w-full bg-primary h-[2px] mt-5 mb-5" />

          {/* SECOND TABLE */}

          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>حداکثر وزن</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>شرح</Text>
              </View>
              <View style={[styles.headerCell, styles.numberColumn]}>
                <Text style={styles.headerText}>ردیف</Text>
              </View>
            </View>

            {/* Table Rows */}
            {rows.weights.map((row, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  { backgroundColor: index % 2 === 0 ? "#fff" : "#f0f0f0" },
                ]}
              >
                <View style={styles.rowCell}>
                  <Text style={styles.rowText}>{row.max}</Text>
                </View>

                <View style={styles.rowCell}>
                  <Text style={styles.rowText}>{row.description}</Text>
                </View>
                <View style={[styles.rowCell, styles.numberColumn]}>
                  <Text style={styles.rowText}>{row.number}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="w-full justify-center items-center mt-5">
            <Text className="font-isansmedium text-base text-center">
              ابعاد مرسولات پستي
            </Text>
          </View>

          <View className="w-full bg-primary h-[2px] mt-5 mb-5" />

          {/* THIRD TABLE */}
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>اندازه</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>شرح</Text>
              </View>
              <View style={[styles.headerCell, styles.numberColumn]}>
                <Text style={styles.headerText}>ردیف</Text>
              </View>
            </View>

            {/* Table Rows */}
            {rows.postGoods.map((row, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  { backgroundColor: index % 2 === 0 ? "#fff" : "#f0f0f0" },
                ]}
              >
                <View style={styles.rowCell}>
                  <Text style={styles.rowText}>{row.size}</Text>
                </View>

                <View style={styles.rowCell}>
                  <Text style={styles.rowText}>{row.description}</Text>
                </View>
                <View style={[styles.rowCell, styles.numberColumn]}>
                  <Text style={styles.rowText}>{row.number}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default Forbidden;

const styles = StyleSheet.create({
  tableContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#e0e0e0",
  },
  headerCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "IranSans-Medium",
    fontSize: 16,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  rowCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  numberColumn: {
    flex: 0.2,
  },
  rowText: {
    fontFamily: "IranSans-Regular",
    fontSize: 16,
    textAlign: "center",
  },
});
