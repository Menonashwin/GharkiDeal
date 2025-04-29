import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getAuthToken } from '../utils/ApiService'; 
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboard'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

    useEffect(() => {
      const checkAuth = async () => {
        const token = await getAuthToken();
        if (token) {
          navigation.replace('UserHome');
        } else {
          navigation.replace('Onboard');
        }
      };
  
      checkAuth();
    }, []);

  return (
    <LinearGradient
      colors={['#ffffff', '#4CDA64']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/GharKiDeal.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tagline: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
    letterSpacing: 1,
  },
});

export default SplashScreen;