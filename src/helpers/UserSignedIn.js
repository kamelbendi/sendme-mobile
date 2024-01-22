import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to install this library

const COOKIE_NAME = 'your_cookie_name';
const LOCAL_STORAGE_NAME = 'your_local_storage_name';

export async function UserSignedIn(user) {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (3 * 24 * 60 * 60 * 1000));
  const expires = currentDate.toISOString();

  // Using AsyncStorage to store the token
  await AsyncStorage.setItem(COOKIE_NAME, `${user.token};${expires};path=/`);
  
  // Using AsyncStorage to store user details
  await AsyncStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(user));
}

export async function getCookie() {
  try {
    // Using AsyncStorage to retrieve the token
    const token = await AsyncStorage.getItem(COOKIE_NAME);

    // Parse the token and check if it's still valid if needed
    return token ? token.split(';')[0] : '';
  } catch (error) {
    console.error('Error getting cookie:', error);
    return '';
  }
}

export async function deleteCookie() {
  try {
    // Using AsyncStorage to remove the token
    await AsyncStorage.removeItem(COOKIE_NAME);

    // Using AsyncStorage to remove user details
    await AsyncStorage.removeItem(LOCAL_STORAGE_NAME);
  } catch (error) {
    console.error('Error deleting cookie:', error);
  }
}
