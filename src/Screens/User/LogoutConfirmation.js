import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { removeAuthToken } from '../../utils/ApiService';

const LogoutConfirmation = ({ navigation }) => {

  const handleLogout = async () => {
    try{
      const success = await removeAuthToken();
      if (success){
        navigation.navigate('Onboard');

      }else{
        Alert.alert('Logout Failed', 'Please try again later.');
      }
    }catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Unexpected error occurred.');
    }
  };

  return (
    <SafeAreaView style={styles.containerWithOverlay}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.logoutModalContainer}>
        <View style={styles.logoutModal}>
          <Text style={styles.logoutTitle}>Logout</Text>
          <Text style={styles.logoutConfirmText}>Are you sure to logout?</Text>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerWithOverlay: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 40 : 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00C853',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    color: '#333',
  },
  logoutModalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoutModal: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  logoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  logoutConfirmText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#00C853',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelText: {
    fontSize: 14,
    color: '#333',
  },
  bottomNavigation: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeNavText: {
    fontSize: 12,
    color: '#00C853',
    marginTop: 4,
  },
});

export default LogoutConfirmation;