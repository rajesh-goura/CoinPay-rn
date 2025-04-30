import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState, useRef } from 'react';
import runChat from './config';
import SecondaryHeader from '../../components/SecondaryHeader';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../themes/Theme'; // Adjust path as needed
import { format } from 'date-fns';
import { Image } from 'expo-image';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, I am CoinPay Helper Bot. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation();
  const { colors } = useTheme() as CustomTheme;// Get theme colors

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Get AI response
      const aiResponse = await runChat(input);
      
      // Add AI response
      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages(prev => [...prev, { text: "Sorry, I encountered an error. Please try again.", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  const currentDateTime = format(new Date(), "EEEE 'at' h:mm a"); // e.g. "Tuesday at 2:48 PM"

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SecondaryHeader
        title="Support"
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
        onContentSizeChange={() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
        }}
      >
        {/* Date and time header */}
        <View style={styles.dateTimeContainer}>
          <Text style={[styles.dateTimeText, { color: colors.textSecondary }]}>
            {currentDateTime}
          </Text>
        </View>

        {/* Messages */}
        {messages.map((message, index) => (
          <View 
            key={index} 
            style={[
              styles.messageContainer,
              message.isUser ? styles.userContainer : styles.aiContainer
            ]}
          >
            {!message.isUser && (
              <View style={styles.botIconContainer}>
                <Image 
                  source={require('@/assets/icons/chatbott.png')} // Adjust path to your bot icon
                  style={styles.botIcon}
                />
              </View>
            )}
            
            <View style={[
              styles.messageBubble, 
              message.isUser 
                ? [styles.userBubble, { backgroundColor: colors.primary }]
                : styles.aiBubble
            ]}>
              <Text style={[
                styles.messageText,
                message.isUser 
                  ? styles.userMessageText 
                  : { color: colors.text }
              ]}>
                {message.text}
              </Text>
            </View>
            
            {message.isUser && (
              <View style={styles.userIconContainer}>
                <Image 
                  source={require('@/assets/images/user.png')} // Adjust path to your user icon
                  style={styles.userIcon}
                />
              </View>
            )}
          </View>
        ))}
        
        {loading && (
          <View style={[styles.messageContainer, styles.aiContainer]}>
            <View style={styles.botIconContainer}>
              <Image 
                source={require('@/assets/icons/chatbott.png')} // Adjust path to your bot icon
                style={styles.botIcon}
              />
            </View>
            <View style={[styles.messageBubble, styles.aiBubble]}>
              <ActivityIndicator size="small" color={colors.text} />
            </View>
          </View>
        )}
      </ScrollView>
      
      <View style={[styles.inputContainer]}>
        <TextInput
          style={[
            styles.input, 
            { 
              backgroundColor: colors.modalBackgroun,
              color: colors.textPrimary,
              borderColor: colors.border
            }
          ]}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor={colors.textSecondary}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity 
          style={[styles.sendButton, { backgroundColor: colors.primary }]} 
          onPress={handleSend}
        >
          <Image 
            source={require('@/assets/icons/send-right.svg')} // Adjust path to your send icon
            style={[styles.sendButtonIcon]}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    paddingBottom: 16,
  },
  dateTimeContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateTimeText: {
    fontSize: 14,
    opacity: 0.7,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  botIconContainer: {
    marginRight: 8,
  },
  userIconContainer: {
    marginLeft: 8,
  },
  botIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  aiBubble: {
    backgroundColor: '#e0e0e0',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 24,
    marginRight: 8,
    fontSize: 16,
    borderWidth: 1,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 24,
    width:60,
    height: 60,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sendButtonIcon:{
    width: 24,
    height: 24,
    tintColor: 'white',
    
  }
});

export default ChatScreen;