import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const AnimatedProgressBar = ({ progress }: { progress: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500, // Adjust for smoother animation
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progress, { width: progressWidth }]} />
    </View>
  );
};

export default AnimatedProgressBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#304FFE",
  },
});
