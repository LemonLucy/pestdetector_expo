import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CropInfo from '@/components/CropInfo/CropInfo';
import PestInfo from '@/components/CropInfo/PestInfo';
import DiseaseInfo from '@/components/CropInfo/DiseaseInfo';
import HealthStatus from '@/components/CropInfo/HealthStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageCrops: React.FC = () => {
  const [cropData, setCropData] = useState<any[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [selectedTimestamp, setSelectedTimestamp] = useState<string | null>(null);

  const API_BASE_URL = 'http://192.168.1.34:5000';

  const CROP_ID_MAP = {
    strawberry: "1",
    lettuce: "2",
    onion: "3",
    corn: "4",
  };

  const BUTTON_IMAGES = [
    { id: "1", image: require("../assets/images/strawberry.jpg") },
    { id: "2", image: require("../assets/images/lettuce.jpg") },
    { id: "3", image: require("../assets/images/onions.jpg") },
    { id: "4", image: require("../assets/images/cornbg.jpg") },
    { id: "5", image: require("../assets/images/mandarin.jpg") },
    { id: "6", image: require("../assets/images/cucum.jpg") },
  ];
  
  // Group data by crop_id and timestamp
  const groupByCropAndTimestamp = (data: any[]) => {
    const grouped: { [cropId: string]: { [timestamp: string]: any } } = {};

    data.forEach(item => {
      const cropId = item.crop_id;
      const timestamp = item.timestamp;

      if (!grouped[cropId]) grouped[cropId] = {};
      grouped[cropId][timestamp] = item;
    });

    return grouped;
  };

  // Load crop data
  useEffect(() => {
    const loadCropData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/fetch/crop-data`);
        if (!response.ok) throw new Error('Failed to fetch crop data');

        const jsonData = await response.json();
        setCropData(jsonData);
      } catch (error) {
        console.error('Error fetching crop data:', error);
      }
    };

    loadCropData();
  }, []);

  if (!cropData.length) {
    return (
      <View style={styles.bgcontainer}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const groupedData = groupByCropAndTimestamp(cropData);

  // Render timestamp options for a selected crop
  if (selectedCrop && !selectedTimestamp) {
    const timestamps = Object.keys(groupedData[selectedCrop]);

    return (
      <View style={styles.bgcontainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Select a Timestamp</Text>
          {timestamps.map((timestamp, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cropButton}
              onPress={() => setSelectedTimestamp(timestamp)}
            >
              <Text style={styles.buttonText}>{new Date(timestamp).toLocaleString()}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedCrop(null)}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render details for a selected crop and timestamp
  if (selectedCrop && selectedTimestamp) {
    const detailedData  = groupedData[selectedCrop][selectedTimestamp];

    return (
      <View style={styles.bgcontainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{selectedCrop} Details</Text>
          <View style={styles.infoContainer}>
            <CropInfo crop={detailedData.crop_information} />
            <PestInfo pest={detailedData.pest_information} />
            <DiseaseInfo disease={detailedData.disease_information} />
            <HealthStatus health={detailedData.crop_health_information} />
            {detailedData.image_url && (
              <Image
                source={{ uri: detailedData.image_url }}
                style={styles.cropImage}
              />
            )}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedTimestamp(null)}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render crop buttons
  return (
    <View style={styles.bgcontainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Manage Crop</Text>
          <View style={styles.cropRowContainer}>
            {BUTTON_IMAGES.map((button) => (
              <TouchableOpacity
                key={button.id}
                style={styles.cropImageButton}
                onPress={() => setSelectedCrop(button.id)}
              >
                <Image source={button.image} style={styles.cropImageButtonImage} />
              </TouchableOpacity>
            ))}
          </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bgcontainer: {
    flex: 1,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  container: {
    flexGrow: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 20,
  },
  cropRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  cropImageButton: {
    margin: 10,
    width: 140,
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  cropImageButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 70,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  cropImage: {
    width: 250,
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  cropButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 60,
    borderColor: '#000',
    borderWidth: 1,
  },
  backButton: {
    position: 'absolute',
    width: '50%',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ManageCrops;