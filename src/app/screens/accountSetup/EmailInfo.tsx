// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { useNavigation, useTheme } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import AnimatedProgressBar from "@/src/app/components/ProgressBar";
// import PrimaryButton from "../../components/PrimaryButton";
// import { CustomTheme } from "../../themes/Theme";
// import { navigate } from "../../navigation/navigationService";

// const { width: screenWidth } = Dimensions.get("window");
// const totalScreens = 5;
// const currentScreen = 4;
// const progress = currentScreen / totalScreens;

// const EmailInfo = () => {
//   const { colors } = useTheme() as CustomTheme;
//   const navigation = useNavigation();
//   const [email, setEmail] = useState("");
//   const [isValidEmail, setIsValidEmail] = useState(false);

//   const validateEmail = (text: string) => {
//     setEmail(text);
//     // Simple email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setIsValidEmail(emailRegex.test(text));
//   };

//   const handleContinue = () => {
//     if (!isValidEmail) {
//       alert("Please enter a valid email address");
//       return;
//     }
//     navigate("HomeAddress");
//     // Navigate to next screen
//     // navigation.navigate("NextScreen");
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       {/* Header with Back Button and Progress Bar */}
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
//             Add your Email
//           </Text>
//           <Text style={[styles.subtext, { color: colors.textSecondary }]}>
//           This info needs to be accurate with your ID document
//           </Text>

//           {/* Email Input with Mail Icon */}
//           <Text style={[styles.subtext1, { color: colors.textSecondary }]}>Username</Text>
//           <View style={styles.inputContainer}>
           
//             <Ionicons 
//               name="mail-outline" 
//               size={20} 
//               color={colors.textTertiary} 
//               style={styles.icon} 
//             />
//             <TextInput
//               style={[
//                 styles.inputField,
//                 {
//                   borderColor: colors.border,
//                   color: colors.textPrimary,
//                   backgroundColor: colors.modalBackgroun,
//                 },
//               ]}
//               placeholder="name@example.com"
//               placeholderTextColor={colors.textTertiary}
//               value={email}
//               onChangeText={validateEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               autoCorrect={false}
//             />
//           </View>

//           {/* Additional Information Text */}
          
//         </View>

//         {/* Continue Button */}
//         <View style={styles.buttonContainer}>
//           <PrimaryButton
//             onPress={handleContinue}
//             text="Continue"
//             disabled={!isValidEmail}
//           />
//         </View>
//       </View>
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
//   subtext1: {
//     fontSize:18,
//     fontWeight: "400",
//     marginBottom:10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   icon: {
//     position: 'absolute',
//     left: 15,
//     zIndex: 1,
//   },
//   inputField: {
//     width: "100%",
//     padding: 15,
//     paddingLeft: 45,
//     fontSize: 16,
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   buttonContainer: {
//     marginBottom: 40,
//   },
// });

// export default EmailInfo;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import PrimaryButton from "../../components/PrimaryButton";
import { CustomTheme } from "../../themes/Theme";
import { navigate } from "../../navigation/navigationService";
import { RouteProp } from '@react-navigation/native';

// Define the type for route parameters
type EmailInfoRouteParams = {
  countryName: string;
  personalInfo: {
    fullName: string;
    username: string;
    dateOfBirth: string;
  };
};

const { width: screenWidth } = Dimensions.get("window");
const totalScreens = 5;
const currentScreen = 4;
const progress = currentScreen / totalScreens;

const EmailInfo = () => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: EmailInfoRouteParams }, 'params'>>();
  
  // Get data from previous screens
  const { countryName, personalInfo } = route.params;
  
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const validateEmail = (text: string) => {
    setEmail(text);
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(text));
  };

  const handleContinue = () => {
    if (!isValidEmail) {
      alert("Please enter a valid email address");
      return;
    }
    
    // Pass all collected data to next screen
    navigate("HomeAddress", {
      countryName,
      personalInfo,
      email
    });
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
            Add your Email
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            This info needs to be accurate with your ID document
          </Text>

          {/* Email Input with Mail Icon */}
          <Text style={[styles.subtext1, { color: colors.textSecondary }]}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Ionicons 
              name="mail-outline" 
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
              placeholder="name@example.com"
              placeholderTextColor={colors.textTertiary}
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={handleContinue}
            text="Continue"
            disabled={!isValidEmail}
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
    fontWeight:"400",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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

export default EmailInfo;