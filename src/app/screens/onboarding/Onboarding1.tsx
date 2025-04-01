import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { navigate } from "../../navigation/navigationService";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/src/app/redux/store";
import { selectThemeMode } from "@/src/app/redux/slices/themeSlice";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const slides = [
    {
        id: "1",
        imageLight: require("@/assets/images/Onboarding/Trust.png"),
        imageDark: require("@/assets/images/Onboarding/darkmode/Trust.png"), // White version
        text: "Trusted by millions of people, part of one part",
      },
      {
        id: "2",
        imageLight: require("@/assets/images/Onboarding/Send money abroad.png"),
        imageDark: require("@/assets/images/Onboarding/darkmode/Send money abroad.png"),
        text: "Spend money abroad, and track your expense",
      },
      {
        id: "3",
        imageLight: require("@/assets/images/Onboarding/Receive Money.png"),
        imageDark: require("@/assets/images/Onboarding/darkmode/Receive Money.png"),
        text: "Receive Money From Anywhere In The World",
      },
];

const Onboarding1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList | null>(null);
  const themeMode = useSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  const handleNextPress = () => {
    if (currentIndex < slides.length - 1) {
      if (flatListRef.current) {
        try {
          flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
          setCurrentIndex(currentIndex + 1);
        } catch (error) {
          console.warn("Error scrolling:", error);
        }
      }
    } else {
      navigate("Home");
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.content, { backgroundColor: themeMode === 'dark' ? '#121212' : '#FFFFFF' }]}>
      <Image source={themeMode === 'dark' ? item.imageDark : item.imageLight}  style={styles.img} />
      <View style={styles.row}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicatorDot,
                index === currentIndex && [
                  styles.activeDot,
                  { backgroundColor: themeMode === 'dark' ? '#304FFE' : '#304FFE' }
                ]
              ]}
            />
          ))}
        </View>
        <Text style={[styles.text, { color: themeMode === 'dark' ? '#FFFFFF' : '#000000' }]}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeMode === 'dark' ? '#121212' : '#FFFFFF' }]}>
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

      <TouchableOpacity 
        style={[
          styles.nextBtn, 
          { backgroundColor: themeMode === 'dark' ? '#304FFE' : '#304FFE' }
        ]} 
        onPress={handleNextPress}
      >
        <Text style={styles.btntxt}>
          {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
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
    resizeMode: 'contain',
  },
  row: {
    width: '100%',
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
    lineHeight: screenWidth < 400 ? 30 : 40,
  },
  indicatorContainer: {
    flexDirection: "row",
    marginVertical: 20,
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
    width: '90%',
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
    fontWeight: '600',
  },
});

export default Onboarding1;