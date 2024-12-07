import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import axios from "axios";

const backgroundImage = require("@/assets/images/robot_background.png");

const API_BASE_URL = "http://192.168.1.22:5000";

const RobotControl: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<string>("Ready to control the robot");

  const sendCommand = async (command: "forward" | "stop" | "backward" | "spray") => {
    try {
      const response = await axios.post(`${API_BASE_URL}/robot/control`, { command });
      setStatusMessage(`Command '${command}' sent successfully`);
      console.log("Command sent successfully:", response.data);
    } catch (error) {
      setStatusMessage(`Failed to send command '${command}'`);
      console.error("Error sending command:", error);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.bgContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Robot Control Panel</Text>
          <Text style={styles.statusMessage}>{statusMessage}</Text>
        </View>

        {/* Robot Control Buttons */}
        <View style={styles.controlPanel}>
          {/* North (Up) Button */}
          <TouchableOpacity
            style={styles.circularGreenButton}
            onPress={() => sendCommand("forward")}
          >
            <Text style={styles.buttonText}>↑</Text>
          </TouchableOpacity>

          <View style={styles.middleRow}>
            {/* West (Left) Button */}
            <TouchableOpacity
              style={styles.circularGreenButton}
            >
              <Text style={styles.buttonText}>←</Text>
            </TouchableOpacity>

            {/* STOP Button */}
            <TouchableOpacity
              style={styles.redButton}
              onPress={() => sendCommand("stop")}
            >
              <Text style={styles.buttonText}>STOP</Text>
            </TouchableOpacity>

            {/* East (Right) Button */}
            <TouchableOpacity
              style={styles.circularGreenButton}
            >
              <Text style={styles.buttonText}>→</Text>
            </TouchableOpacity>
          </View>

          {/* South (Down) Button */}
          <TouchableOpacity
            style={styles.circularGreenButton}
            onPress={() => sendCommand("backward")}
          >
            <Text style={styles.buttonText}>↓</Text>
          </TouchableOpacity>

          {/* Spray Pesticide Button */}
          <TouchableOpacity
            style={styles.sprayButton}
            onPress={() => sendCommand("spray")}
          >
            <Text style={styles.buttonText}>Spray Pesticide</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  statusMessage: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 10,
    textAlign: "center",
  },
  controlPanel: {
    width: "100%",
    alignItems: "center",
    marginTop: 100,
  },
  middleRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20,
  },
  circularGreenButton: {
    backgroundColor: "#6dbb63",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  redButton: {
    backgroundColor: "red",
    width: 100,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  sprayButton: {
    backgroundColor: "#4f9d69",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RobotControl;
