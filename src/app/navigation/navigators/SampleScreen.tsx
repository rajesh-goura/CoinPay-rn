import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PrimaryButton from '../../components/PrimaryButton'
import { useAppDispatch } from '../../redux/store'
import { logout } from '../../redux/slices/authSlice'
import { useTheme } from '@react-navigation/native'
import { Alert } from 'react-native'

const SampleScreen = () => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(logout()).unwrap()
              // Navigation would be handled by the auth state change in your root navigator
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.')
            }
          },
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Sample Screen</Text>
      
      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={handleLogout}
          text="Logout"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
})

export default SampleScreen