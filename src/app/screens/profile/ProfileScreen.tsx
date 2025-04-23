import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "../../redux/slices/themeSlice";
import SecondaryHeader from "../../components/SecondaryHeader";
import { CustomTheme } from "../../themes/Theme";
import { navigate } from "../../navigation/navigationService";

const ProfileScreen = () => {
  type ThemeState = {
    mode: "light" | "dark";
    systemEnabled: boolean;
  };

  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const themeMode = useSelector(
    (state: { theme: ThemeState }) => state.theme.mode
  );
  const systemEnabled = useSelector(
    (state: { theme: ThemeState }) => state.theme.systemEnabled
  );

  const [userData, setUserData] = useState<any>(null);
  const iconColorAnim = useRef(
    new Animated.Value(themeMode === "dark" ? 1 : 0)
  ).current;
  const iconTintAnim = useRef(
    new Animated.Value(themeMode === "dark" ? 1 : 0)
  ).current;

  useEffect(() => {
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

  useEffect(() => {
    // Animate when theme changes
    Animated.parallel([
      Animated.timing(iconColorAnim, {
        toValue: themeMode === "dark" ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(iconTintAnim, {
        toValue: themeMode === "dark" ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [themeMode]);

  const handleThemeToggle = (value: boolean) => {
    const newTheme = value ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  // Interpolate background color for icon
  const iconBgColor = iconColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff9c5", "#b8b8b8"], // yellow to gray
  });

  // Interpolate tint color for icon
  const iconTintColor = iconTintAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#f1803a", "#5a5a5a"], // yellow to dark gray
  });

  const renderProfileOption = (
    icon: any,
    text: string,
    onPress: () => void,
    iconBgColor: string | Animated.AnimatedInterpolation<string>,
    iconTintColor: string | Animated.AnimatedInterpolation<string>,
    hasToggle = false,
    toggleValue = false
  ) => {
    return (
      <TouchableOpacity
        style={[styles.optionContainer, { borderBottomColor: colors.border }]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.optionLeft}>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                backgroundColor: iconBgColor,
              },
            ]}
          >
            <Image
              source={icon}
              style={[styles.icon]}
              tintColor={iconTintColor as string}
              contentFit="contain"
            />
          </Animated.View>
          <Text style={[styles.optionText, { color: colors.textPrimary }]}>
            {text}
          </Text>
        </View>
        {hasToggle ? (
          <Switch
            value={themeMode === "dark"}
            onValueChange={handleThemeToggle}
            thumbColor={themeMode === "dark" ? colors.primary : colors.border}
            trackColor={{
              true: colors.primary,
              false: colors.border,
            }}
          />
        ) : (
          <Image
            source={require("@/assets/icons/profile/angle-right.svg")}
            style={[styles.chevron, { tintColor: colors.textTertiary }]}
            contentFit="contain"
          />
        )}
      </TouchableOpacity>
    );
  };

  if (!userData) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <SecondaryHeader
          title="My Profile"
          onBackPress={() => navigation.goBack()}
        />
        <Text style={{ color: colors.textPrimary, textAlign: "center" }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SecondaryHeader
        title="My Profile"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* User Profile Section */}
        <View
          style={[
            styles.profileContainer,
            { backgroundColor: colors.modalBackgroun },
          ]}
        >
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigate("EditProfile")}
            activeOpacity={0.7}
          >
            <Image
              source={require("@/assets/icons/profile/edit.svg")}
              style={[styles.editIcon, { tintColor: colors.primary }]}
              contentFit="contain"
            />
          </TouchableOpacity>

          <Image
            source={require("@/assets/images/user.png")}
            style={styles.profileImage}
            contentFit="cover"
          />
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {userData.personalInfo?.fullName}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {userData.personalInfo?.email}
          </Text>
          
        </View>

        {/* Profile Options Section */}
        <View
          style={[
            styles.optionsContainer,
            { backgroundColor: colors.modalBackgroun },
          ]}
        >
          {renderProfileOption(
            themeMode === "dark"
              ? require("@/assets/icons/profile/moon.svg")
              : require("@/assets/icons/profile/sun.svg"),
            themeMode === "dark" ? "Dark Mode" : "Light Mode",
            () => {},
            iconBgColor,
            iconTintColor,
            true
          )}

          {/* Rest of your options */}
          {renderProfileOption(
            require("@/assets/icons/profile/user.svg"),
            "Personal Info",
            () => navigate("QrCode"),
            "#eaebfd",
            "#7a8ef9"
          )}

          {renderProfileOption(
            require("@/assets/icons/profile/bank.svg"),
            "Bank & Cards",
            () => navigate("AddCard"),
            "#fff9c5",
            "#f1803a"
          )}

          {renderProfileOption(
            require("@/assets/icons/profile/credit-card-change.svg"),
            "Transactions",
            () => navigate("MainApp"),
            "#fcebed",
            "#ed4133"
          )}

          {renderProfileOption(
            require("@/assets/icons/profile/settings.svg"),
            "Settings",
            () => navigate("SettingsScreen"),
            "#eaebfd",
            "#7a8ef9"
          )}

          {renderProfileOption(
            require("@/assets/icons/profile/database.svg"),
            "Data Privacy",
            () => navigate("SampleScreen"),
            "#e9f5e9",
            "#8bc58a"
          )}

          {renderProfileOption(
            require("@/assets/icons/profile/user.svg"),
            "Logout",
            () => navigate("SampleScreen"),
            "#e9f5e9",
            "#8bc58a"
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  profileContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  editButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: "#324cf5",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userEmail: {
    fontSize: 16,
    textAlign: "center",
  },
  optionsContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    width: 30,
    height: 30,
  },
  chevron: {
    width: 16,
    height: 16,
    tintColor: "#fff",
  },
  optionText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
