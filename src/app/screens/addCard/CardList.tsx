// Core React
import React, { useState, useEffect } from "react";

// React Native Components
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Navigation
import { useTheme, useFocusEffect } from "@react-navigation/native";
import { navigate } from "../../navigation/navigationService";

// Firebase Services
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Third-party Libraries
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

// Custom Components
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import ActivityIndicator from "../../components/ActivityIndicator";

// Redux Store
import { useAppDispatch, useAppSelector } from "../../redux/store";

// Theming
import { CustomTheme } from "../../themes/Theme";



type Card = {
  id: string;
  lastFour: string;
  type: "visa" | "mastercard" | "amex" | "other";
  name: string;
  expiry: string;
};

const CardList = () => {
  const { t } = useTranslation();
  const { colors } = useTheme() as CustomTheme;
  const [cards, setCards] = useState<Card[]>([]);
  const [deleteAnimations, setDeleteAnimations] = useState<Record<string, Animated.Value>>({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Get loading state from Redux
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const fetchCards = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        return;
      }
      
      const cardsSnapshot = await firestore()
        .collection('cards')
        .doc(user.uid)
        .collection('userCards')
        .orderBy('createdAt', 'desc')
        .get();
      
      const cardsData = cardsSnapshot.docs.map(doc => ({
        id: doc.id,
        lastFour: doc.data().lastFour,
        type: doc.data().type || 'other',
        name: doc.data().accountHolderName,
        expiry: doc.data().expiryDate,
      }));
      
      setCards(cardsData);
      
      // Initialize animations
      const newAnimations = cardsData.reduce((acc, card) => {
        acc[card.id] = new Animated.Value(0);
        return acc;
      }, {} as Record<string, Animated.Value>);
      
      setDeleteAnimations(newAnimations);
    } catch (error) {
      console.error("Error fetching cards:", error);
      Alert.alert(t("cardList.alerts.error"), t("cardList.alerts.loadFailed"));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCards();
    }, [])
  );

  const handleCardPress = (cardId: string) => {
    if (selectedCard === cardId) {
      setSelectedCard(null);
      animateDeleteIcon(cardId, 0);
    } else {
      setSelectedCard(cardId);
      animateDeleteIcon(cardId, 1);
    }
  };

  const animateDeleteIcon = (cardId: string, toValue: number) => {
    Animated.timing(deleteAnimations[cardId], {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      const user = auth().currentUser;
      if (!user) return;
      
      await firestore()
        .collection('cards')
        .doc(user.uid)
        .collection('userCards')
        .doc(cardId)
        .delete();
      
      // Update local state
      setCards(cards.filter(card => card.id !== cardId));
      setSelectedCard(null);
      
      // Remove animation
      const newAnimations = { ...deleteAnimations };
      delete newAnimations[cardId];
      setDeleteAnimations(newAnimations);
    } catch (error) {
      console.error("Error deleting card:", error);
      Alert.alert(t("cardList.alerts.error"), t("cardList.alerts.deleteFailed"));
    }
  };

  const handleAddCard = () => {
    
    navigate("CardDetails");
  };

  const handleContinue = async () => {
    try {
      navigate("MainApp");
    } catch (error) {
      console.error("Failed to complete card setup:", error);
      Alert.alert(t("cardList.alerts.error"), t("cardList.alerts.setupCompleteError"));
    }
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return <FontAwesome name="cc-visa" size={24} color={colors.textPrimary} />;
      case "mastercard":
        return <FontAwesome name="cc-mastercard" size={24} color={colors.textPrimary} />;
      case "amex":
        return <FontAwesome name="cc-amex" size={24} color={colors.textPrimary} />;
      default:
        return <FontAwesome name="credit-card" size={24} color={colors.textPrimary} />;
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator/>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>
          {t("cardList.title")}
        </Text>
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          {t("cardList.subtitle")}
        </Text>
      </View>

      {/* Cards List */}
      <View style={styles.cardList}>
        {cards.length === 0 ? (
          <Text style={[styles.noCardsText, { color: colors.textSecondary }]}>
            {t("cardList.noCards")}
          </Text>
        ) : (
          cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              onPress={() => handleCardPress(card.id)}
              activeOpacity={0.8}
            >
              <View style={[
                styles.cardContainer,
                { 
                  backgroundColor: colors.modalBackgroun,
                  borderColor: selectedCard === card.id ? colors.primary : colors.border
                }
              ]}>
                <View style={styles.cardContent}>
                  <View style={styles.cardIcon}>
                    {getCardIcon(card.type)}
                  </View>
                  <View style={styles.cardDetails}>
                    <Text style={[styles.cardText, { color: colors.textPrimary }]}>
                      •••• •••• •••• {card.lastFour}
                    </Text>
                    <Text style={[styles.cardSubtext, { color: colors.textSecondary }]}>
                      {card.name} • {t("cardList.expires")} {card.expiry}
                    </Text>
                  </View>
                </View>
                
                <Animated.View
                  style={[
                    styles.deleteButton,
                    {
                      opacity: deleteAnimations[card.id],
                      transform: [
                        {
                          translateX: deleteAnimations[card.id].interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => handleDeleteCard(card.id)}>
                    <MaterialIcons 
                      name="delete-outline" 
                      size={24} 
                      color={colors.error} 
                    />
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonGroup}>
        <PrimaryButton
          onPress={handleAddCard}
          text={t("cardList.addCardButton")}
        />
        <SecondaryButton
          onPress={handleContinue}
          text={t("cardList.continueButton")}
          disabled={cards.length === 0}
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
    marginBottom: 30,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtext: {
    fontSize: 16,
  },
  cardList: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardDetails: {
    flex: 1,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 14,
  },
  deleteButton: {
    position: 'absolute',
    right: 16,
  },
  buttonGroup: {
    marginBottom: 40,
  },
  noCardsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default CardList;