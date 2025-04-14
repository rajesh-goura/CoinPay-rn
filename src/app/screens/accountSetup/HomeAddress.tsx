import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import PrimaryButton from "../../components/PrimaryButton";
import { CustomTheme } from "../../themes/Theme";
import { navigate } from "../../navigation/navigationService";
import { RouteProp } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Define the type for route parameters
type HomeAddressRouteParams = {
  countryName: string;
  personalInfo: {
    fullName: string;
    username: string;
    dateOfBirth: string;
  };
  email: string;
};

const { width: screenWidth } = Dimensions.get("window");
const totalScreens = 5;
const currentScreen = 5;
const progress = currentScreen / totalScreens;

const HomeAddress = () => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: HomeAddressRouteParams }, 'params'>>();
  
  // Get data from previous screens
  const { countryName, personalInfo, email } = route.params;
  
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!address || !city || !postCode) {
      Alert.alert("Error", "Please fill in all address fields");
      return;
    }

    const currentUser = auth().currentUser;
    
    if (!currentUser) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the complete user data
      const userData = {
        country: countryName,
        personalInfo: {
          ...personalInfo,
          email,
        },
        address: {
          street: address,
          city,
          postCode,
        },
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      // Save to Firestore
      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .set(userData, { merge: true });

      // Navigate to success screen or main app
      navigate("ScanId");
    } catch (error) {
      console.error("Error saving user data:", error);
      Alert.alert("Error", "Failed to save data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Back Button and Progress Bar */}
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <AnimatedProgressBar progress={progress} />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <View>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>
            Home Address
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            This info needs to be accurate with your ID document
          </Text>

          {/* Address Line Input */}
          <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
            Address
          </Text>
          <View style={styles.inputContainer}>
            <Ionicons 
              name="location-outline" 
              size={20} 
              color={colors.textTertiary} 
              style={styles.icon} 
            />
            <TextInput
              style={[
                styles.inputField,
                {
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.modalBackgroun,
                },
              ]}
              placeholder="Address Line"
              placeholderTextColor={colors.textTertiary}
              value={address}
              onChangeText={setAddress}
              autoCapitalize="words"
            />
          </View>

          {/* City Input */}
          <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
            City
          </Text>
          <View style={styles.inputContainer}>
            <Ionicons 
              name="business-outline" 
              size={20} 
              color={colors.textTertiary} 
              style={styles.icon} 
            />
            <TextInput
              style={[
                styles.inputField,
                {
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.modalBackgroun,
                },
              ]}
              placeholder="City,State"
              placeholderTextColor={colors.textTertiary}
              value={city}
              onChangeText={setCity}
              autoCapitalize="words"
            />
          </View>

          {/* Post Code Input */}
          <Text style={[styles.subtext1, { color: colors.textSecondary }]}>
            Post
          </Text>
          <View style={styles.inputContainer}>
            <Ionicons 
              name="map-outline" 
              size={20} 
              color={colors.textTertiary} 
              style={styles.icon} 
            />
            <TextInput
              style={[
                styles.inputField,
                {
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.modalBackgroun,
                },
              ]}
              placeholder="Ex: 00000"
              placeholderTextColor={colors.textTertiary}
              value={postCode}
              onChangeText={setPostCode}
              autoCapitalize="characters"
              keyboardType="default"
            />
          </View>
        </View>

        {/* Complete Registration Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={handleSubmit}
            text={isSubmitting ? "Processing..." : "Complete Registration"}
            disabled={!address || !city || !postCode || isSubmitting}
          />
        </View>
      </View>
    </View>
  );
};

// Keep all styles the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 20,
  },
  heading: {
    fontSize: screenWidth < 400 ? 28 : 32,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 25,
  },
  subtext1: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom:10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  inputField: {
    width: "100%",
    padding: 15,
    paddingLeft: 45,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonContainer: {
    marginBottom: 40,
  },
});

export default HomeAddress;