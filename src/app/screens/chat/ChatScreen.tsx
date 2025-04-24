// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
// } from 'react-native';
// import { CustomTheme } from '../../themes/Theme'; // Assuming this exists
// // Assuming this is correctly set up
// import axios, { AxiosError } from 'axios';
// import { useTheme } from '@react-navigation/native';

// interface Message {
//   id: string;
//   text: string;
//   isUser: boolean;
// }

// const ChatScreen = () => {
//   const { colors } = useTheme() as CustomTheme;
//   const [messages, setMessages] = useState<Message[]>([
//     { id: '1', text: 'Hello! How can I help you today?', isUser: false },
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const scrollViewRef = useRef<ScrollView>(null);

//   // Scroll to bottom whenever messages change
//   useEffect(() => {
//     if (scrollViewRef.current) {
//       setTimeout(() => {
//         scrollViewRef.current?.scrollToEnd({ animated: true });
//       }, 100); // Delay added for better UX
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     if (inputText.trim() === '' || isLoading) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputText,
//       isUser: true,
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputText('');
//     setIsLoading(true);

//     try {
//       const apiKey = 'AIzaSyBFL5aJjhmnhnWMfshbgr94cgSUhtG6_f0'; // **IMPORTANT: Replace with your actual API key!**
//       // Corrected URL:  Check the latest Gemini API documentation for the correct endpoint.
//       const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro/generateContent'; //  Using v1beta and the model.
//       const response = await axios.post(
//         apiUrl,
//         {
//           contents: [
//             {
//               role: 'user',
//               parts: [{ text: inputText }],
//             },
//           ],
//         },
//         {
//           params: {
//             key: apiKey,
//           },
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       const botText =
//         response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "I'm here to help!";

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: botText,
//         isUser: false,
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       const axiosError = error as AxiosError; // Type assertion
//       console.error('Gemini Chat Error:', axiosError.message, axiosError.response?.data); // Improved error logging
//       let errorMessage = 'Sorry, I couldn’t respond. Please try again later.';
//       if (axiosError.response) {
//         // Customize error message based on server response
//         if (axiosError.response.status === 400) {
//           errorMessage =
//             'Bad Request: There was an error with your request. Please check your input and try again.';
//         } else if (axiosError.response.status === 401) {
//           errorMessage =
//             'Unauthorized: Invalid API key. Please check your API key and try again.'; // More specific message
//         } else if (axiosError.response.status === 404) {
//           errorMessage =
//             'Not Found: The requested API endpoint or model was not found.  Please check the API documentation for the correct URL and model name.';
//         } else {
//           errorMessage = `Error: ${axiosError.response.status} - ${errorMessage}`;
//         }
//       }
//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: errorMessage,
//         isUser: false,
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={[styles.container, { backgroundColor: colors.background }]}
//       keyboardVerticalOffset={80}
//     >
//       <ScrollView
//         contentContainerStyle={styles.messagesContainer}
//         ref={scrollViewRef} // Attach the ref here
//       >
//         {messages.map((message) => (
//           <View
//             key={message.id}
//             style={[
//               styles.messageBubble,
//               message.isUser
//                 ? [styles.userBubble, { backgroundColor: colors.primary }]
//                 : [styles.botBubble, { backgroundColor: colors.card }],
//             ]}
//           >
//             <Text
//               style={[
//                 styles.messageText,
//                 { color: message.isUser ? 'white' : colors.text },
//               ]}
//             >
//               {message.text}
//             </Text>
//           </View>
//         ))}
//         {isLoading && (
//           <View
//             style={[
//               styles.messageBubble,
//               styles.botBubble,
//               { backgroundColor: colors.card },
//             ]}
//           >
//             <ActivityIndicator size="small" color={colors.primary} />
//           </View>
//         )}
//       </ScrollView>

//       <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
//         <TextInput
//           style={[styles.input, { color: colors.text }]}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="Type your message..."
//           placeholderTextColor={colors.textSecondary}
//           onSubmitEditing={handleSend}
//           editable={!isLoading}
//           returnKeyType="send" // Add this for a "Send" button on the keyboard
//         />
//         <TouchableOpacity
//           onPress={handleSend}
//           style={styles.sendButton}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator size="small" color={colors.primary} />
//           ) : (
//             <Text style={[styles.sendText, { color: colors.primary }]}>
//               Send
//             </Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   messagesContainer: {
//     padding: 16,
//     paddingBottom: 80,
//   },
//   messageBubble: {
//     maxWidth: '80%',
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 8,
//   },
//   userBubble: {
//     alignSelf: 'flex-end',
//     borderBottomRightRadius: 0,
//   },
//   botBubble: {
//     alignSelf: 'flex-start',
//     borderBottomLeftRadius: 0,
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     padding: 10,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     alignItems: 'center', // Vertically center items
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     marginRight: 10,
//   },
//   sendButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//   },
//   sendText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default ChatScreen;



import { View, Text } from 'react-native'
import React from 'react'

const ChatScreen = () => {
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  )
}

export default ChatScreen