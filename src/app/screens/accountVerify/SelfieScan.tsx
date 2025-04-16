import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../themes/Theme";
import { navigate } from "../../navigation/navigationService";
import { useTranslation } from "react-i18next";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function SelfieScan() {
  const { t } = useTranslation();
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const [facing, setFacing] = useState<CameraType>("front");
  const [flashEnabled, setFlashEnabled] = useState(false);
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
          {t("selfieScan.permissionMessage")}
        </Text>
        <TouchableOpacity
          style={[styles.permissionButton, { backgroundColor: colors.primary }]}
          onPress={requestPermission}
        >
          <Text style={[styles.buttonText, { color: colors.textPrimary }]}>
            {t("selfieScan.grantPermission")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlashEnabled(current => !current);
  };

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

  const retakePicture = () => {
    setPictureTaken(false);
    setImageUri(null);
  };

  const savePicture = () => {
    console.log("Picture saved:", imageUri);
    navigate("AccountSetup");
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button - Transparent */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {!pictureTaken ? (
        /* Camera View */
        <CameraView 
          ref={cameraRef} 
          style={styles.fullscreenCamera} 
          facing={facing}
          flash={flashEnabled ? 'on' : 'off'}
          mirror={true}
        >
          {/* Overlay with instructions */}
          <View style={styles.cameraOverlay}>
            <Text style={styles.scanInstruction}>
              {t("selfieScan.instructions")}
            </Text>
            <View style={styles.faceOutline} />
          </View>

          {/* Camera controls at the bottom */}
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.flashButton} 
              onPress={toggleFlash}
            >
              <Ionicons 
                name={flashEnabled ? "flash" : "flash-off"} 
                size={28} 
                color="white" 
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="black" />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.flipButton} 
              onPress={toggleCameraFacing}
            >
              <Ionicons name="camera-reverse" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        /* Image Review View */
        <View style={styles.fullscreenCamera}>
          <Image 
            source={{ uri: imageUri! }} 
            style={styles.imagePreview} 
            resizeMode="contain"
          />
          <View style={styles.reviewButtonsContainer}>
            <TouchableOpacity
              style={[styles.reviewButton, styles.retakeButton]}
              onPress={retakePicture}
            >
              <Ionicons name="refresh" size={24} color="white" />
              <Text style={styles.reviewButtonText}>{t("selfieScan.retake")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.reviewButton, { backgroundColor: "#304FFE" }]}
              onPress={savePicture}
            >
              <Ionicons name="checkmark" size={24} color="white" />
              <Text style={styles.reviewButtonText}>{t("selfieScan.confirm")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenCamera: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  cameraOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  scanInstruction: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
  },
  faceOutline: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 40,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
  },
  flashButton: {
    padding: 15,
  },
  flipButton: {
    padding: 15,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  imagePreview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  reviewButtonsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  retakeButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.8)',
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
  buttonText:{

  }
});