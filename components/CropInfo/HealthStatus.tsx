// src/components/CropInfo/HealthStatus.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HealthStatus: React.FC<{ health: { overall_health: string; recommended_action: string } }> = ({ health }) => (
  <View style={styles.infoBox}>
    <Text style={styles.label}>Overall Health:</Text>
    <Text style={styles.value}>{health.overall_health}</Text>
    <Text style={styles.label}>Recommended Action:</Text>
    <Text style={styles.value}>{health.recommended_action}</Text>
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

export default HealthStatus;
