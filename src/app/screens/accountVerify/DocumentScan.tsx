// React & hooks
import { useRef, useState } from "react";

// React Native components
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Navigation
import { useNavigation, useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Camera
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";


// External libraries
import { useTranslation } from "react-i18next";

// Internal components
import ActivityIndicator from "../../components/ActivityIndicator";
import Header from "../../components/Header";

// Theme
import { CustomTheme } from "../../themes/Theme";



const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const totalScreens = 13;
const currentScreen = 9;
const progress = currentScreen / totalScreens;

export default function DocumentScan() {
  const { t } = useTranslation();
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const [pictureTaken, setPictureTaken] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.message, { color: colors.text }]}>
          {t("documentScan.permissionMessage")}
        </Text>
        <TouchableOpacity
          style={[styles.permissionButton, { backgroundColor: colors.primary }]}
          onPress={requestPermission}
        >
          <Text style={[styles.buttonText, { color: colors.textPrimary }]}>
            {t("documentScan.grantPermission")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsLoading(true);
        const photo: any = await cameraRef.current.takePictureAsync();
        setImageUri(photo.uri);
        setPictureTaken(true);
      } catch (error) {
        console.error("Error taking picture:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const savePicture = () => {
    console.log("Picture saved:", imageUri);
    navigate("SelfieScreen");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Back Button and Progress Bar */}
      <Header progress={progress}/>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Camera Section */}
        <View style={styles.cameraSection}>
          <Text style={[styles.scanInstruction, { color: colors.textPrimary }]}>
            {t("documentScan.scanInstruction")}
          </Text>

          <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
            <View
              style={[styles.cameraOverlay, { borderColor: colors.primary }]}
            />
          </CameraView>
        </View>

        {/* Bottom Section with Status and Buttons */}
        <View style={styles.bottomSection}>
          <View style={styles.statusContainer}>
            <Text style={[styles.statusHeading, { color: colors.textPrimary }]}>
              {t("documentScan.statusHeading")}
            </Text>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text
                style={[styles.statusSubtext, { color: colors.textPrimary }]}
              >
                {t("documentScan.statusSubtext")}
              </Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            {!pictureTaken ? (
              <TouchableOpacity
                style={[
                  styles.captureButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={takePicture}
              >
                <Text
                  style={[styles.buttonText, { color: colors.textPrimary }]}
                >
                  {t("documentScan.captureButton")}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colors.success }]}
                onPress={savePicture}
              >
                <Text
                  style={[styles.buttonText, { color: colors.textPrimary }]}
                >
                  {t("documentScan.saveButton")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cameraSection: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  scanInstruction: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  camera: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.6,
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 40, // Added space below camera
  },
  cameraOverlay: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    margin: 20,
  },
  bottomSection: {
    marginTop: "auto", // Pushes to bottom
    paddingBottom: 20,
  },
  statusContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  statusHeading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  statusSubtext: {
    fontSize: 16,
  },
  loader: {
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  captureButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  saveButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  permissionButton: {
    padding: 15,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
  },
});
