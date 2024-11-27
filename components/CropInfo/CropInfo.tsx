// src/components/CropInfo/CropInfo.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CropInfo: React.FC<{ crop: { name: string; species: string; growth_stage: string } }> = ({ crop }) => (
  <View style={styles.infoBox}>
    <Text style={styles.label}>Crop Name:</Text>
    <Text style={styles.value}>{crop.name}</Text>
    <Text style={styles.label}>Species:</Text>
    <Text style={styles.value}>{crop.species}</Text>
    <Text style={styles.label}>Growth Stage:</Text>
    <Text style={styles.value}>{crop.growth_stage}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoBox: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
});

export default CropInfo;
