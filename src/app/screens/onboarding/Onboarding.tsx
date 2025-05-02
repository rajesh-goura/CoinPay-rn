import React, { useState, useRef } from "react";

// React Native components
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Navigation
import { navigate } from "../../navigation/navigationService";

// Navigation & Theme
import { useTheme } from "@react-navigation/native";

// External libraries
import { useTranslation } from "react-i18next";

// Internal components
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Onboarding = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList | null>(null);
  const { colors, dark } = useTheme();

  const slides = [
    {
      id: "1",
      imageLight: require("@/assets/images/Onboarding/Trust.png"),
      imageDark: require("@/assets/images/Onboarding/darkmode/Trust.png"),
      textKey: "onboarding.slide1", 
    },
    {
      id: "2",
      imageLight: require("@/assets/images/Onboarding/Send money abroad.png"),
      imageDark: require("@/assets/images/Onboarding/darkmode/Send money abroad.png"),
      textKey: "onboarding.slide2",
    },
    {
      id: "3",
      imageLight: require("@/assets/images/Onboarding/Receive Money.png"),
      imageDark: require("@/assets/images/Onboarding/darkmode/Receive Money.png"),
      textKey: "onboarding.slide3",
    },
  ];

  const handleNextPress = () => {
    if (currentIndex < slides.length - 1) {
      if (flatListRef.current) {
        try {
          flatListRef.current.scrollToIndex({
            index: currentIndex + 1,
            animated: true,
          });
          setCurrentIndex(currentIndex + 1);
        } catch (error) {
          console.warn("Error scrolling:", error);
        }
      }
    } else {
      navigate("Signup");
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.content, { backgroundColor: colors.background }]}>
      <Image
        source={dark ? item.imageDark : item.imageLight}
        style={styles.img}
      />
      {/* Remove the indicator from here */}
      <View style={styles.row}>
        <Text style={[styles.text, { color: colors.textPrimary }]}>
          {t(item.textKey)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onScroll={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / screenWidth
          );
          if (index !== currentIndex) {
            setCurrentIndex(index);
          }
        }}
        scrollEventThrottle={16}
      />

      {/* Add the indicator container here, positioned absolutely */}
      <View style={styles.indicatorAbsoluteContainer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicatorDot,
                index === currentIndex && [
                  styles.activeDot,
                  { backgroundColor: colors.primary },
                ],
              ]}
            />
          ))}
        </View>
      </View>

      <PrimaryButton
        onPress={handleNextPress}
        text={currentIndex === slides.length - 1 ? t("common.getStarted") : t("common.next")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  img: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.3,
    maxWidth: 260,
    maxHeight: 300,
    borderRadius: 12,
    resizeMode: "contain",
  },
  row: {
    width: "100%",
    maxWidth: 400,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  text: {
    fontSize: screenWidth < 400 ? 31 : 35,
    textAlign: "center",
    fontWeight: "600",
    marginTop: 20,
    paddingTop:35,
    lineHeight: screenWidth < 400 ? 30 : 40,
  },
  indicatorContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  indicatorAbsoluteContainer: {
    position: 'absolute',
    top: screenHeight * 0.5 + 12, 
    width: '100%',
    alignItems: 'center',
  },

  
  indicatorDot: {
    width: 30,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#C4C4C4",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
  },
  nextBtn: {
    width: "90%",
    maxWidth: 360,
    height: 56,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginHorizontal: 20,
  },
  btntxt: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default Onboarding;