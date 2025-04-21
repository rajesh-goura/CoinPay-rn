import React, { useState, useEffect } from 'react';

// React Native components
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Navigation
import { useTheme } from '@react-navigation/native';
import { navigate } from '../../navigation/navigationService';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Expo
import { BarCodeScanner } from 'expo-barcode-scanner';

// Internal components
import RoundButton from '../../components/RoundButton';

// Theme
import { CustomTheme } from '../../themes/Theme';


const ScanQr = ({ navigation }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'This app needs access to your camera to scan QR codes.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setHasPermission(true);
          } else {
            setHasPermission(false);
          }
        } else {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        }
      } catch (err) {
        console.warn(err);
        setHasPermission(false);
      }
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setIsCameraActive(false);
    
    // Validate the QR data (this would depend on your QR format)
    if (isValidRecipientData(data)) {
      // Parse the data and navigate to SendAmount screen
      const recipient = parseRecipientData(data);
      navigate('SendAmount', { recipient });
    } else {
      Alert.alert(
        'Invalid QR Code',
        'The scanned QR code does not contain valid recipient information.',
        [
          {
            text: 'OK',
            onPress: () => {
              setScanned(false);
              setIsCameraActive(true);
            },
          },
        ]
      );
    }
  };

  // Helper function to validate QR data
  const isValidRecipientData = (data: string): boolean => {
    // Implement your validation logic here
    // For example, check if it's a JSON with required fields
    try {
      const parsed = JSON.parse(data);
      return parsed && parsed.email && parsed.name;
    } catch {
      return false;
    }
  };

  // Helper function to parse QR data
  const parseRecipientData = (data: string): any => {
    try {
      const parsed = JSON.parse(data);
      return {
        id: parsed.id || 'qr-' + Math.random().toString(36).substring(7),
        name: parsed.name,
        email: parsed.email,
        amount: parsed.amount || 0,
        image: parsed.image || require('@/assets/images/user.png'),
      };
    } catch {
      return {
        id: 'qr-' + Math.random().toString(36).substring(7),
        name: 'QR Recipient',
        email: data,
        amount: 0,
        image: require('@/assets/images/user.png'),
      };
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  const requestPermissionAgain = async () => {
    setHasPermission(null);
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  if (hasPermission === null) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.permissionText, { color: colors.textPrimary }]}>
          Requesting for camera permission...
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>
            Scan QR Code
          </Text>
        </View>

        <View style={styles.permissionDeniedContainer}>
          <Ionicons
            name="camera"
            size={60}
            color={colors.textSecondary}
            style={styles.cameraIcon}
          />
          <Text style={[styles.permissionText, { color: colors.textPrimary }]}>
            Camera permission is required to scan QR codes.
          </Text>
          <Text
            style={[styles.permissionSubtext, { color: colors.textSecondary }]}
          >
            Please enable camera access in settings to continue.
          </Text>

          <TouchableOpacity
            style={[styles.settingsButton, { backgroundColor: colors.primary }]}
            onPress={openSettings}
          >
            <Text style={[styles.settingsButtonText, { color: 'white' }]}>
              Open Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tryAgainButton,
              { borderColor: colors.primary, borderWidth: 1 },
            ]}
            onPress={requestPermissionAgain}
          >
            <Text style={[styles.tryAgainButtonText, { color: colors.primary }]}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>
          Scan QR Code
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          Align the QR code within the frame to scan
        </Text>
      </View>

      {/* Camera View */}
      {isCameraActive && (
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
        </View>
      )}

      {/* Bottom Controls */}
      <View style={styles.controlsContainer}>
        {scanned && (
          <RoundButton
          onPress={() => {}}
          iconName="qr-code-outline"
          size={32}
        />
        )}

        {!scanned && (
          <Text style={[styles.helpText, { color: colors.textSecondary }]}>
            Having trouble scanning? Try moving closer or adjusting the angle.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  subtext: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: 'Poppins',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 20,
    position: 'relative',
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cameraFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: 'white',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  controlsContainer: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins',
  },
  permissionDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  cameraIcon: {
    marginBottom: 20,
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  permissionSubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Poppins',
  },
  settingsButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  tryAgainButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  tryAgainButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
});

export default ScanQr;