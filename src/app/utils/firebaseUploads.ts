// utils/firebaseUploads.js
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export const uploadImage = async (uri: string, path: string | undefined) => {
  try {
    // Reference to storage path
    const reference = storage().ref(path);
    
    // Upload the file
    await reference.putFile(uri);
    
    // Get the download URL
    const downloadUrl = await reference.getDownloadURL();
    
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const saveImageReference = async (userId: string | undefined, type: string, url: string) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .update({
        [`verification.${type}`]: url,
        [`verification.${type}Verified`]: false,
        [`verification.${type}Date`]: firestore.FieldValue.serverTimestamp()
      });
  } catch (error) {
    console.error("Error saving reference:", error);
    throw error;
  }
};