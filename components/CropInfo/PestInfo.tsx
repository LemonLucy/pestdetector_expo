// src/components/CropInfo/PestInfo.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PestInfo: React.FC<{ pest: { pest_name: string; severity: string; pesticide: string } }> = ({ pest }) => (
  <View style={styles.infoBox}>
    <Text style={styles.label}>Pest Name:</Text>
    <Text style={styles.value}>{pest.pest_name}</Text>
    <Text style={styles.label}>Severity:</Text>
    <Text style={styles.value}>{pest.severity}</Text>
    <Text style={styles.label}>Pesticide:</Text>
    <Text style={styles.value}>{pest.pesticide}</Text>
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

export default PestInfo;
