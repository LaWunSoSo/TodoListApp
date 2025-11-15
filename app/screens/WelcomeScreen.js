import * as IntentLauncher from "expo-intent-launcher";
import * as Linking from "expo-linking";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/WelcomeScreenStyles";

const WelcomeScreen = ({ navigation }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Check if device has a PIN / pattern / biometric enrolled
  useEffect(() => {
    const checkEnrolled = async () => {
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setIsEnrolled(enrolled);
    };
    checkEnrolled();
  }, []);

  const goToSecuritySettings = () => {
    if (Platform.OS === "android") {
      IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.SETTINGS);
    } else if (Platform.OS === "ios") {
      Linking.openURL("App-Prefs:root=TOUCHID_PASSCODE").catch(() => {
        Alert.alert("Please go to Settings to set authentication");
      });
    }
  };

  const checkAuthentication = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible)
      return Alert.alert("Device not compatible with authentication.");

    if (!isEnrolled) {
      goToSecuritySettings();
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to enter the app",
      fallbackLabel: "Enter PIN",
    });

    if (result.success) {
      navigation.navigate("Dashboard");
    } else Alert.alert("Authentication Failed. Try again.");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Text style={styles.title}>Set Authentication to Proceed</Text>

      <TouchableOpacity onPress={checkAuthentication} style={styles.button}>
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
