import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/robot_background.png')}
      style={styles.fullScreenBackground}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/ManageCrops')}
          >
            <Text style={styles.buttonText}>Manage Crops</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/ManagePests')}
          >
            <Text style={styles.buttonText}>Pest Status</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {router.push('/CropAnalysis')
          }}>
            <Text style={styles.buttonText}>Robot Control</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.button}
          onPress={() => {router.push('/RobotControl')
          }}>
            <Text style={styles.buttonText}>Robot Control</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
    resizeMode: 'cover', // 이미지가 화면에 맞게 조정
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // 버튼 배경 투명도 조절
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation: 5, // 그림자 효과 (Android)
    shadowColor: '#000', // 그림자 색상 (iOS)
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#1B5E20',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
