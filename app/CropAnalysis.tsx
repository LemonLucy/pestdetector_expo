import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import PestInfo from "@/components/CropInfo/PestInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CropAnalysis: React.FC = () => {
  const [pestAffectedCrops, setPestAffectedCrops] = useState<any | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<any | null>(null);

  useEffect(() => {
    const loadPestDataFromStorage = async () => {
      try {
        const storedData = await AsyncStorage.getItem("cropData");
        if (storedData) {
          const cropData = JSON.parse(storedData);
          console.log("Loaded Data from LocalStorage:", cropData);

          // Filter crops affected by pests or diseases
          const filteredCrops = cropData.filter(
            (crop: any) =>  
              crop.pest_information?.pest_name !== 'None' ||
              crop.disease_information?.severity !== 'None'
          );
          setPestAffectedCrops(filteredCrops);

          console.log("Filtered pest-affected crops:", filteredCrops);
        }
      } catch (error) {
        console.error("Error loading data from local storage:", error);
      }
    };

    loadPestDataFromStorage();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "red";
      case "Moderate":
        return "orange";
      case "Low":
        return "yellow";
      default:
        return "green"; // Default color for "None" or unknown severity
    }
  };

  if (!pestAffectedCrops || pestAffectedCrops.length === 0) {
    return (
      <View style={styles.bgcontainer}>
        <View style={styles.container}>
          <Text style={styles.title}>No crops affected by pests or diseases.</Text>
        </View>
      </View>
    );
  }

  if (selectedCrop) {
    // Show details for the selected crop
    return (
    <View style={styles.bgcontainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{selectedCrop.crop_information.name} Information</Text>
          <PestInfo pest={selectedCrop.pest_information} />
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCrop(null)}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
    </View>
    );
  }

  return (
    <View style={styles.bgcontainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>Pest-Affected Crops</Text>
          {pestAffectedCrops.map((crop: any, index: number) => {
            const severity = crop.disease_information?.severity || crop.pest_information?.severity || "None";
            const severityColor = getSeverityColor(severity);

            return (
              <TouchableOpacity
                key={index}
                style={[styles.cropButton, { backgroundColor: severityColor }]}
                onPress={() => setSelectedCrop(crop)}
              >
                <Text style={styles.buttonText}>{crop.crop_information?.name || "Unnamed Crop"}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
    bgcontainer: {
        flex: 1,
        backgroundColor: "#2E7D32", // Light green background
        justifyContent: "center",
        alignItems: "center",
      },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  cropButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 60,
    borderColor: "#000",
    borderWidth: 1,
  },
  backButton: {
    backgroundColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CropAnalysis;
