// src/components/CropInfo/DiseaseInfo.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DiseaseInfo: React.FC<{ disease: { disease_name: string; symptoms: string; severity: string; pesticide: string } }> = ({ disease }) => (
  <View style={styles.infoBox}>
    <Text style={styles.label}>Disease Name:</Text>
    <Text style={styles.value}>{disease.disease_name}</Text>
    <Text style={styles.label}>Symptoms:</Text>
    <Text style={styles.value}>{disease.symptoms}</Text>
    <Text style={styles.label}>Severity:</Text>
    <Text style={styles.value}>{disease.severity}</Text>
    <Text style={styles.label}>Pesticide:</Text>
    <Text style={styles.value}>{disease.pesticide}</Text>
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

export default DiseaseInfo;
