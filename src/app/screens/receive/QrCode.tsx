import React from "react";

// React Native components
import {
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Navigation
import { useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Icons
import { Ionicons } from "@expo/vector-icons";

// External libraries
import QRCode from "react-native-qrcode-svg";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Internal components
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";

// Theme
import { CustomTheme } from "../../themes/Theme";


const { width } = Dimensions.get("window");

const QrCode = ({ navigation }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userDoc = await firestore()
          .collection("users")
          .doc(currentUser.uid)
          .get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const generateQrData = () => {
    if (!userData) return "";
    return JSON.stringify({
      id: auth().currentUser?.uid,
      name: userData.personalInfo?.fullName || "User",
      email: userData.personalInfo?.email || "",
      image: require("@/assets/images/user.png"), // Default image
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Send me money via ${userData?.personalInfo?.fullName}'s QR code`,
        // You could also include a deep link to your app here
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleRequestPayment = () => {
    // This would navigate to a screen where they can enter an amount to request
    navigate("SendAmount", {
      recipient: {
        id: auth().currentUser?.uid,
        name: userData?.personalInfo?.fullName || "User",
        email: userData?.personalInfo?.email || "",
        image: require("@/assets/images/user.png"),
      },
      isRequest: true, // Flag to indicate this is a request
    });
  };

  if (!userData) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textPrimary }}>Loading...</Text>
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
          My QR Code
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          Scan this code to receive money
        </Text>
      </View>

      {/* QR Code Section */}
      <View style={styles.qrContainer}>
        <View
          style={[
            styles.qrCard,
            { backgroundColor: colors.modalBackgroun, borderColor: colors.border },
          ]}
        >
          {/* User Info */}
          <Image
            source={require("@/assets/images/user.png")}
            style={styles.userImage}
          />
          <Text style={[styles.userName, { color: colors.textPrimary }]}>
            {userData.personalInfo?.fullName}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {userData.personalInfo?.email}
          </Text>

          {/* QR Code */}
          <View style={styles.qrCodeWrapper}>
            <QRCode
              value={generateQrData()}
              size={width * 0.6}
              color={colors.textPrimary}
              backgroundColor={colors.modalBackgroun}
            />
          </View>
        </View>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <PrimaryButton
          text="Request for Payment"
          onPress={()=>navigate("RequestRecipient")}
        />
        <SecondaryButton
          text="Share to Receive Money"
          onPress={handleShare}
          
        />
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
    marginBottom: 10,
  },
  backButton: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  subtext: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  qrContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qrCard: {
    width: "90%",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 2,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  qrCodeWrapper: {
    padding: 2,
    borderRadius: 12,
    marginVertical: 6,
  },
  buttonsContainer: {
    width: "100%",
    paddingBottom: 20,
    gap: 12,
  },
});

export default QrCode;