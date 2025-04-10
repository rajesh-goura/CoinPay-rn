// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { useNavigation, useTheme } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import AnimatedProgressBar from "@/src/app/components/ProgressBar";
// import PrimaryButton from "../../components/PrimaryButton";
// import { CountryPicker } from "react-native-country-codes-picker";
// import { CustomTheme } from "@/src/app/themes/Theme"; // Update the path
// import { navigate } from "../../navigation/navigationService";

// const { width: screenWidth } = Dimensions.get("window");
// const totalScreens = 5;
// const currentScreen = 3;
// const progress = currentScreen / totalScreens;

// const CountrySelector = () => {
//   const { colors, dark } = useTheme() as CustomTheme;
//   const navigation = useNavigation();
//   const [showCountryPicker, setShowCountryPicker] = useState(false);
//   const [country, setCountry] = useState({
//     name: "",
//     flag: "",
//     code: "",
//   });

//   const handleCountrySelect = (countryItem: any) => {
//     setCountry({
//       name: countryItem.name.en,
//       flag: countryItem.flag,
//       code: countryItem.code,
//     });
//     setShowCountryPicker(false);
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
//             Country of Residence
//           </Text>
//           <Text style={[styles.subtext, { color: colors.textSecondary }]}>
//             This info needs to be accurate with your ID document
//           </Text>
//             <Text style={[styles.subtext1, { color: colors.textSecondary }]}>Country</Text>
//           {/* Country Picker */}
//           <TouchableOpacity
//             style={[
//               styles.countryPickerButton,
//               {
//                 borderColor: colors.border,
//                 backgroundColor: colors.modalBackgroun, // Changed from card to modalBackgroun
//               },
//             ]}
//             onPress={() => setShowCountryPicker(true)}
//           >
//             {country.flag ? (
//               <View style={styles.countrySelection}>
//                 <Text style={styles.flagText}>{country.flag}</Text>
//                 <Text style={[styles.countryName, { color: colors.textPrimary }]}>
//                   {country.name}
//                 </Text>
//               </View>
//             ) : (
//               <Text style={[styles.placeholder, { color: colors.textTertiary }]}>
//                 Select your country
//               </Text>
//             )}
//             <Ionicons
//               name="chevron-down"
//               size={20}
//               color={colors.textTertiary}
//             />
//           </TouchableOpacity>
//         </View>
        
//         {/* Country Picker Modal - Updated with proper dark mode text colors */}
//         <CountryPicker
//           show={showCountryPicker}
//           pickerButtonOnPress={handleCountrySelect}
//           lang="en"
//           style={{
//             modal: {
//               backgroundColor: colors.modalBackgroun, // Changed from background to modalBackgroun
//             },
//             itemsList: {
//               backgroundColor: colors.modalBackgroun,
//             },
//             countryButtonStyles: {
//               backgroundColor: colors.modalBackgroun,
//             },
//             searchMessageText: {
//               color: colors.textSecondary,
//             },
//             textInput: {
//                 color: colors.textPrimary,
//                 backgroundColor: colors.modalBackgroun,
//                 placeholderTextColor: colors.textTertiary,  // This will work but TypeScript complains
//               } as any ,
//             countryName: {
//               color: colors.textPrimary, // Text color for country names
//             },
            
//             dialCode: {
//               color: colors.textTertiary, // Text color for dial codes
//             },
//             line: {
//               backgroundColor: colors.border, // Divider color
//             },
//             // Add flag and emoji styles if needed
//             flag: {
//               // You can customize flag styles if needed
//             },
            
//           }}
//           onBackdropPress={() => setShowCountryPicker(false)}
//         />

//         {/* Continue Button */}
//         <View style={styles.buttonContainer}>
//           <PrimaryButton
//             onPress={() => {
//               if (!country.code) {
//                 alert("Please select your country of residence");
//                 return;
//               }
//               navigate("PersonalInfo");
//               // Navigate to next screen
//               // navigation.navigate("NextScreen");
//             }}
//             text="Continue"
//             disabled={!country.code}
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
//     fontSize: 20,
//     fontWeight:"400",
//     marginBottom: 10,
//   },
//   countryPickerButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 15,
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 30,
//   },
//   countrySelection: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   flagText: {
//     fontSize: 24,
//     marginRight: 10,
//   },
//   countryName: {
//     fontSize: 16,
//   },
//   placeholder: {
//     fontSize: 16,
//   },
//   buttonContainer: {
//     marginBottom: 40,
//   },
  
// });

// export default CountrySelector;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedProgressBar from "@/src/app/components/ProgressBar";
import PrimaryButton from "../../components/PrimaryButton";
import { CountryPicker } from "react-native-country-codes-picker";
import { CustomTheme } from "@/src/app/themes/Theme";
import { navigate } from "../../navigation/navigationService";

const { width: screenWidth } = Dimensions.get("window");
const totalScreens = 5;
const currentScreen = 3;
const progress = currentScreen / totalScreens;

const CountrySelector = () => {
  const { colors, dark } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [country, setCountry] = useState({
    name: "",
    flag: "",
    code: "",
  });

  const handleCountrySelect = (countryItem: any) => {
    setCountry({
      name: countryItem.name.en,
      flag: countryItem.flag,
      code: countryItem.code,
    });
    setShowCountryPicker(false);
  };

  const handleContinue = () => {
    if (!country.code) {
      alert("Please select your country of residence");
      return;
    }
    
    // Navigate to next screen with JUST the country name (not flag or code)
    navigate("PersonalInfo", { 
      countryName: country.name 
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

      {/* Content Section (UNCHANGED - keeps showing flag and name) */}
      <View style={styles.content}>
        <View>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>
            Country of Residence
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            This info needs to be accurate with your ID document
          </Text>
            <Text style={[styles.subtext1, { color: colors.textSecondary }]}>Country</Text>
          {/* Country Picker (UNCHANGED) */}
          <TouchableOpacity
            style={[
              styles.countryPickerButton,
              {
                borderColor: colors.border,
                backgroundColor: colors.modalBackgroun,
              },
            ]}
            onPress={() => setShowCountryPicker(true)}
          >
            {country.flag ? (
              <View style={styles.countrySelection}>
                <Text style={styles.flagText}>{country.flag}</Text>
                <Text style={[styles.countryName, { color: colors.textPrimary }]}>
                  {country.name}
                </Text>
              </View>
            ) : (
              <Text style={[styles.placeholder, { color: colors.textTertiary }]}>
                Select your country
              </Text>
            )}
            <Ionicons
              name="chevron-down"
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        </View>
        
        {/* Country Picker Modal (UNCHANGED) */}
        <CountryPicker
          show={showCountryPicker}
          pickerButtonOnPress={handleCountrySelect}
          lang="en"
          style={{
            modal: {
              backgroundColor: colors.modalBackgroun,
            },
            itemsList: {
              backgroundColor: colors.modalBackgroun,
            },
            countryButtonStyles: {
              backgroundColor: colors.modalBackgroun,
            },
            searchMessageText: {
              color: colors.textSecondary,
            },
            textInput: {
                color: colors.textPrimary,
                backgroundColor: colors.modalBackgroun,
                placeholderTextColor: colors.textTertiary,
              } as any,
            countryName: {
              color: colors.textPrimary,
            },
            dialCode: {
              color: colors.textTertiary,
            },
            line: {
              backgroundColor: colors.border,
            },
          }}
          onBackdropPress={() => setShowCountryPicker(false)}
        />

        {/* Continue Button - now uses handleContinue */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={handleContinue}
            text="Continue"
            disabled={!country.code}
          />
        </View>
      </View>
    </View>
  );
};

// KEEP ALL STYLES EXACTLY THE SAME
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
    fontSize: 20,
    fontWeight:"400",
    marginBottom: 10,
  },
  countryPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 30,
  },
  countrySelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagText: {
    fontSize: 24,
    marginRight: 10,
  },
  countryName: {
    fontSize: 16,
  },
  placeholder: {
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 40,
  },
});

export default CountrySelector;