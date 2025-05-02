// Core React
import React, { useRef } from "react";

// React Native Components
import {
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Third-Party Libraries
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";

// Navigation & Theming
import { useTheme } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";
import { CustomTheme } from "../../themes/Theme";

// libraries
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useTranslation } from "react-i18next";

// Custom Components
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";


const { width } = Dimensions.get("window");

const QrCode = ({ navigation }: any) => {
  const { colors } = useTheme() as CustomTheme;
  const { t } = useTranslation();
  const [userData, setUserData] = React.useState<any>(null);
  const qrCodeRef = useRef<any>(null);

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
      name: userData.personalInfo?.fullName || t("common.user"),
      email: userData.personalInfo?.email || "",
      image: require("@/assets/images/user.png"),
    });
  };

  const handleShare = async () => {
    try {
      if (!qrCodeRef.current) return;

      const qrCodeBase64 = await new Promise((resolve, reject) => {
        qrCodeRef.current?.toDataURL((data: string) => {
          resolve(data);
        });
      });

      const message = t("qrCode.shareMessage", { name: userData?.personalInfo?.fullName || t("common.user") });
      const url = `data:image/png;base64,${qrCodeBase64}`;
      
      await Share.share({
        message: `${message}\n\n`,
        url: url,
        title: t("qrCode.shareTitle"),
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleRequestPayment = () => {
    navigate("SendAmount", {
      recipient: {
        id: auth().currentUser?.uid,
        name: userData?.personalInfo?.fullName || t("common.user"),
        email: userData?.personalInfo?.email || "",
        image: require("@/assets/images/user.png"),
      },
      isRequest: true,
    });
  };

  if (!userData) {
    return (
      <View style={[styles.container, { backgroundColor: colors.backgroundinApp }]}>
        <Text style={{ color: colors.textPrimary }}>{t("common.loading")}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundinApp }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
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

          {/* QR Code with ref */}
          <View style={styles.qrCodeWrapper}>
            <QRCode
              getRef={(ref) => (qrCodeRef.current = ref)}
              value={generateQrData()}
              size={width * 0.6}
              color="#324cf5"
              backgroundColor={colors.modalBackgroun}
            />
          </View>
        </View>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <PrimaryButton
          text={t("qrCode.requestPayment")}
          onPress={() => navigate("RequestRecipient")}
        />
        <SecondaryButton
          text={t("qrCode.shareToReceive")}
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