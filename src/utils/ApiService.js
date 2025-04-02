import {API_URL} from 'react-native-dotenv';
import * as Keychain from 'react-native-keychain';

export const fetchData = async (endpoint, method = 'GET', body = null) => {
  try {
    // const credentials = await Keychain.getGenericPassword('keyToken');
    // const credentials = await Keychain.getGenericPassword();
    // // console.log('Token', credentials.password);
    // let token = credentials.password;
    const response = await fetch(`${API_URL}${endpoint}/${token}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:, error.message`);
    throw error;
  }
};


 // const credentials = await Keychain.getGenericPassword('keyToken');
    // const credentials = await Keychain.getGenericPassword();
    // // console.log('Token', credentials.password);