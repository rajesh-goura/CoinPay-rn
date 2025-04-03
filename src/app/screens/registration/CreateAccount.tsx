// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Dimensions,
//   Modal,
//   Image,
// } from "react-native";
// import { useNavigation, useTheme } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import AnimatedProgressBar from "@/src/app/components/ProgressBar";
// import PrimaryButton from "../../components/PrimaryButton";
// import CountryPicker, {
//   Country,
//   CountryCode,
// } from "react-native-country-picker-modal";

// import SecondaryButton from "../../components/SecondaryButton";
// import { LogBox } from "react-native";
// import { navigate } from "../../navigation/navigationService";

// LogBox.ignoreLogs([
//   "Support for defaultProps will be removed from function components",
// ]);

// const { width: screenWidth } = Dimensions.get("window");
// const totalScreens = 5;
// const currentScreen = 2;
// const progress = currentScreen / totalScreens;

// const CreateAccount = () => {
//   const { colors, dark } = useTheme();
//   const navigation = useNavigation();
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [countryCode, setCountryCode] = useState<CountryCode>("US");
//   const [callingCode, setCallingCode] = useState("1");
//   const [isPickerVisible, setPickerVisible] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handleSignUp = () => {
//     if (phoneNumber.trim() === "") {
//       alert("Please enter a valid phone number.");
//       return;
//     }
//     setModalVisible(true);
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       {/* Header */}
//       <View>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
//         </TouchableOpacity>
//         <View style={styles.progressContainer}>
//           <AnimatedProgressBar progress={progress} />
//         </View>
//       </View>

//       {/* Content Section */}
//       <View style={styles.content}>
//         <View>
//           <Text style={[styles.heading, { color: colors.textPrimary }]}>
//             Create an Account
//           </Text>
//           <Text style={[styles.subtext, { color: colors.textSecondary }]}>
//             Enter your mobile number to verify your account
//           </Text>

//           {/* Country Picker & Mobile Number */}
//           <View style={styles.inputRow}>
//             <TouchableOpacity
//               style={[styles.countryPicker, { borderColor: colors.border }]}
//               onPress={() => setPickerVisible(true)}
//             >
//               <CountryPicker
//                 withCallingCode
//                 withFlag
//                 withFilter
//                 withModal
//                 withAlphaFilter
//                 countryCode={countryCode}
//                 visible={isPickerVisible}
//                 onSelect={(country: Country) => {
//                   setCountryCode(country.cca2 as CountryCode);
//                   setCallingCode(country.callingCode[0]);
//                   setPickerVisible(false);
//                 }}
//                 onClose={() => setPickerVisible(false)}
//                 theme={{
//                   primaryColor: colors.primary,
//                   primaryColorVariant: colors.primary,
//                   backgroundColor: colors.card,
//                   onBackgroundTextColor: colors.textPrimary,
//                   filterPlaceholderTextColor: colors.textSecondary,
//                 }}
//               />
             

             

//               <Text style={[styles.callingCode, { color: colors.textPrimary }]}>
//                 +{callingCode}
//               </Text>
//             </TouchableOpacity>

//             <TextInput
//               style={[
//                 styles.mobileNumber,
//                 {
//                   borderColor: colors.border,
//                   color: colors.textPrimary,
//                   backgroundColor: colors.card,
//                 },
//               ]}
//               placeholder="Enter your mobile number"
//               placeholderTextColor={colors.textTertiary}
//               keyboardType="phone-pad"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//             />
//           </View>

//           {/* Password Input */}
//           <View
//             style={[
//               styles.passwordContainer,
//               {
//                 borderColor: colors.border,
//                 backgroundColor: colors.card,
//               },
//             ]}
//           >
//             <TextInput
//               style={[styles.passwordInput, { color: colors.textPrimary }]}
//               placeholder="Enter your password"
//               placeholderTextColor={colors.textTertiary}
//               secureTextEntry={!passwordVisible}
//               value={password}
//               onChangeText={setPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setPasswordVisible(!passwordVisible)}
//               style={styles.eyeIcon}
//             >
//               <Ionicons
//                 name={passwordVisible ? "eye" : "eye-off"}
//                 size={24}
//                 color={colors.textTertiary}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Sign Up Button */}
//         <View style={styles.buttonContainer}>
//           <PrimaryButton
//             onPress={handleSignUp}
//             text="Sign up"
//             disabled={!phoneNumber || !password}
//           />
//         </View>
//       </View>

//       {/* Modal for Phone Number Verification */}
//       <Modal visible={isModalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View
//             style={[
//               styles.modalContent,
//               {
//                 backgroundColor: colors.modalBackgroun,
//                 borderColor: colors.primary,
//               },
//             ]}
//           >
//             <Image
//               style={styles.img}
//               source={
//                 dark
//                   ? require("@/assets/images/Registration/dark/register2.png")
//                   : require("@/assets/images/Registration/register2.png")
//               }
//             />
//             <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
//               Verify your number before we send a code
//             </Text>
//             <Text
//               style={[styles.modalSubtext, { color: colors.textSecondary }]}
//             >
//               Is this correct? +{callingCode} {phoneNumber}
//             </Text>

//             {/* "Yes" Button */}
//             <PrimaryButton
//               onPress={() => {
//                 setModalVisible(false);
//                 navigate("ConfirmPhone", {
//                   phoneNumber,
//                   callingCode,
//                 });
//               }}
//               text="Yes"
//             />

//             {/* "No" Button */}
//             <SecondaryButton
//               onPress={() => {
//                 setModalVisible(false);
//                 console.log("Cancelled Verification");
//               }}
//               text="No"
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   backButton: {
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   progressContainer: {
//     width: "100%",
//     alignItems: "center",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   heading: {
//     fontSize: screenWidth < 400 ? 28 : 32,
//     fontWeight: "700",
//     marginBottom: 10,
//   },
//   subtext: {
//     fontSize: 16,
//     marginBottom: 25,
//   },
//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   countryPicker: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "25%",
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderRadius: 8,
//     justifyContent: "center",
//   },
//   callingCode: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginLeft: 5,
//   },
//   mobileNumber: {
//     width: "70%",
//     padding: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 30,
//   },
//   passwordInput: {
//     flex: 1,
//     paddingVertical: 12,
//     fontSize: 16,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
  // buttonContainer: {
  //   marginBottom: 40,
  // },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "rgba(0,0,0,0.5)",
  // },
  // img: {
  //   width: 140,
  //   height: 140,
  // },
  // modalContent: {
  //   borderBottomWidth: 2,
  //   padding: 20,
  //   borderRadius: 10,
  //   width: "80%",
  //   alignItems: "center",
  // },
  // modalTitle: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  //   textAlign: "center",
  // },
  // modalSubtext: {
  //   fontSize: 16,
  //   marginBottom: 20,
  //   textAlign: "center",
  // },
// });

// export default CreateAccount;













// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Dimensions,
//   Modal,
//   Image,
// } from "react-native";
// import { useNavigation, useTheme } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import AnimatedProgressBar from "@/src/app/components/ProgressBar";
// import PrimaryButton from "../../components/PrimaryButton";
// import { CountryPicker } from "react-native-country-codes-picker";
// import SecondaryButton from "../../components/SecondaryButton";
// import { LogBox } from "react-native";
// import { navigate } from "../../navigation/navigationService";

// LogBox.ignoreLogs([
//   "Support for defaultProps will be removed from function components",
// ]);

// const { width: screenWidth } = Dimensions.get("window");
// const totalScreens = 5;
// const currentScreen = 2;
// const progress = currentScreen / totalScreens;

// const CreateAccount = () => {
//   const { colors, dark } = useTheme();
//   const navigation = useNavigation();
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [callingCode, setCallingCode] = useState("+1"); // Default USA
//   const [isPickerVisible, setPickerVisible] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handleSignUp = () => {
//     if (phoneNumber.trim() === "") {
//       alert("Please enter a valid phone number.");
//       return;
//     }
//     setModalVisible(true);
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       {/* Header */}
//       <View>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
//         </TouchableOpacity>
//         <View style={styles.progressContainer}>
//           <AnimatedProgressBar progress={progress} />
//         </View>
//       </View>

//       {/* Content Section */}
//       <View style={styles.content}>
//         <View>
//           <Text style={[styles.heading, { color: colors.textPrimary }]}>
//             Create an Account
//           </Text>
//           <Text style={[styles.subtext, { color: colors.textSecondary }]}>
//             Enter your mobile number to verify your account
//           </Text>

//           {/* Country Picker & Mobile Number */}
//           <View style={styles.inputRow}>
//             <TouchableOpacity
//               style={[styles.countryPicker, { borderColor: colors.border }]}
//               onPress={() => setPickerVisible(true)}
//             >
//               <Text style={[styles.callingCode, { color: colors.textPrimary }]}>
//                 {callingCode}
//               </Text>
//             </TouchableOpacity>

//             <TextInput
//               style={[
//                 styles.mobileNumber,
//                 {
//                   borderColor: colors.border,
//                   color: colors.textPrimary,
//                   backgroundColor: colors.card,
//                 },
//               ]}
//               placeholder="Enter your mobile number"
//               placeholderTextColor={colors.textTertiary}
//               keyboardType="phone-pad"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//             />
//           </View>

//           {/* Country Picker Modal */}
//           <CountryPicker
//             show={isPickerVisible}
//             pickerButtonOnPress={(item) => {
//               setCallingCode(item.dial_code);
//               setPickerVisible(false);
//             } }
//             onBackdropPress={() => setPickerVisible(false)} lang={""}          />

//           {/* Password Input */}
//           <View
//             style={[
//               styles.passwordContainer,
//               {
//                 borderColor: colors.border,
//                 backgroundColor: colors.card,
//               },
//             ]}
//           >
//             <TextInput
//               style={[styles.passwordInput, { color: colors.textPrimary }]}
//               placeholder="Enter your password"
//               placeholderTextColor={colors.textTertiary}
//               secureTextEntry={!passwordVisible}
//               value={password}
//               onChangeText={setPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setPasswordVisible(!passwordVisible)}
//               style={styles.eyeIcon}
//             >
//               <Ionicons
//                 name={passwordVisible ? "eye" : "eye-off"}
//                 size={24}
//                 color={colors.textTertiary}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Sign Up Button */}
//         <View style={styles.buttonContainer}>
//           <PrimaryButton
//             onPress={handleSignUp}
//             text="Sign up"
//             disabled={!phoneNumber || !password}
//           />
//         </View>
//       </View>

//       {/* Modal for Phone Number Verification */}
//       <Modal visible={isModalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View
//             style={[
//               styles.modalContent,
//               {
//                 backgroundColor: colors.modalBackgroun,
//                 borderColor: colors.primary,
//               },
//             ]}
//           >
//             <Image
//               style={styles.img}
//               source={
//                 dark
//                   ? require("@/assets/images/Registration/dark/register2.png")
//                   : require("@/assets/images/Registration/register2.png")
//               }
//             />
//             <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
//               Verify your number before we send a code
//             </Text>
//             <Text
//               style={[styles.modalSubtext, { color: colors.textSecondary }]}
//             >
//               Is this correct? {callingCode} {phoneNumber}
//             </Text>

//             {/* "Yes" Button */}
//             <PrimaryButton
//               onPress={() => {
//                 setModalVisible(false);
//                 navigate("ConfirmPhone", {
//                   phoneNumber,
//                   callingCode,
//                 });
//               }}
//               text="Yes"
//             />

//             {/* "No" Button */}
//             <SecondaryButton
//               onPress={() => {
//                 setModalVisible(false);
//                 console.log("Cancelled Verification");
//               }}
//               text="No"
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   backButton: {
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   progressContainer: {
//     width: "100%",
//     alignItems: "center",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   heading: {
//     fontSize: screenWidth < 400 ? 28 : 32,
//     fontWeight: "700",
//     marginBottom: 10,
//   },
//   subtext: {
//     fontSize: 16,
//     marginBottom: 25,
//   },
//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   countryPicker: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "25%",
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderRadius: 8,
//     justifyContent: "center",
//   },
//   callingCode: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginLeft: 5,
//   },
//   mobileNumber: {
//     width: "70%",
//     padding: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 30,
//   },
//   passwordInput: {
//     flex: 1,
//     paddingVertical: 12,
//     fontSize: 16,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   buttonContainer: {
//     marginBottom: 40,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   img: {
//     width: 140,
//     height: 140,
//   },
//   modalContent: {
//     borderBottomWidth: 2,
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   modalSubtext: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: "center",
//   },
// });

// export default CreateAccount;








import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import PrimaryButton from "../../components/PrimaryButton";
import { CountryPicker } from "react-native-country-codes-picker";
import SecondaryButton from "../../components/SecondaryButton";
import { LogBox } from "react-native";
import { navigate } from "../../navigation/navigationService";
import auth from '@react-native-firebase/auth'
// import auth from '@react-native-firebase/auth';

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const { width: screenWidth } = Dimensions.get("window");
const totalScreens = 5;
const currentScreen = 2;
const progress = currentScreen / totalScreens;

const CreateAccount = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [callingCode, setCallingCode] = useState("+1");
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    if (phoneNumber.trim() === "") {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }
    setModalVisible(true);
  };

  const sendOTP = async () => {
    setIsLoading(true);
    try {
      const fullPhoneNumber = `${callingCode}${phoneNumber}`;
      
      // Firebase phone authentication
      const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
      
      navigate("ConfirmPhone", {
        confirmation,
        phoneNumber: fullPhoneNumber,
        password // Passing password for later use if needed
      });
      
    } catch (error:any) {
      let errorMessage = "Failed to send OTP";
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = "Invalid phone number format";
      } else if (error.code === 'auth/quota-exceeded') {
        errorMessage = "OTP quota exceeded. Please try again later";
      }
      
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
      setModalVisible(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
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
            Create an Account
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            Enter your mobile number to verify your account
          </Text>

          {/* Country Picker & Mobile Number */}
          <View style={styles.inputRow}>
            <TouchableOpacity
              style={[styles.countryPicker, { borderColor: colors.border }]}
              onPress={() => setPickerVisible(true)}
            >
              <Text style={[styles.callingCode, { color: colors.textPrimary }]}>
                {callingCode}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={[
                styles.mobileNumber,
                {
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.card,
                },
              ]}
              placeholder="Enter your mobile number"
              placeholderTextColor={colors.textTertiary}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          {/* Country Picker Modal */}
          <CountryPicker
            show={isPickerVisible}
            pickerButtonOnPress={(item) => {
              setCallingCode(item.dial_code);
              setPickerVisible(false);
            }}
            onBackdropPress={() => setPickerVisible(false)}
            lang="en"
          />

          {/* Password Input */}
          <View
            style={[
              styles.passwordContainer,
              {
                borderColor: colors.border,
                backgroundColor: colors.card,
              },
            ]}
          >
            <TextInput
              style={[styles.passwordInput, { color: colors.textPrimary }]}
              placeholder="Enter your password"
              placeholderTextColor={colors.textTertiary}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={passwordVisible ? "eye" : "eye-off"}
                size={24}
                color={colors.textTertiary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={handleSignUp}
            text="Sign up"
            disabled={!phoneNumber || !password}
          />
        </View>
      </View>

      {/* Modal for Phone Number Verification */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.modalBackgroun,
                borderColor: colors.primary,
              },
            ]}
          >
            <Image
              style={styles.img}
              source={
                dark
                  ? require("@/assets/images/Registration/dark/register2.png")
                  : require("@/assets/images/Registration/register2.png")
              }
            />
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              Verify your number before we send a code
            </Text>
            <Text style={[styles.modalSubtext, { color: colors.textSecondary }]}>
              Is this correct? {callingCode} {phoneNumber}
            </Text>

            {/* "Yes" Button */}
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <>
                <PrimaryButton
                  onPress={sendOTP}
                  text="Yes, send OTP"
                />
                <SecondaryButton
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  text="No, edit number"
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    width: "25%",
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
  },
  callingCode: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
  },
  mobileNumber: {
    width: "70%",
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 30,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  img: {
    width: 140,
    height: 140,
  },
  modalContent: {
    borderBottomWidth: 2,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalSubtext: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default CreateAccount;