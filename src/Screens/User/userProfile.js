import React, {useEffect, useState} from 'react';
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
import Icons from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useMutation} from '../../utils/ApiService';
const UserProfile = ({navigation}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const {fetchData} = useMutation();

 
  // Function to fetch profile image from server
  const fetchProfileImage = async () => {
    try {
      setLoading(true);
      const response = await fetchData({
        endpoint: 'users/profile',
        method: 'GET',
      });

      console.log('Profile Data Response:', response);

      if (response && response.profile.profile_image_url) {
        // Update with the URL returned from the server
        setProfileImage({uri: response.profile.profile_image_url});
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      Alert.alert(
        'Error',
        'Failed to load profile picture. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const success = await removeAuthToken();
      if (success) {
        // Navigate to Login screen or wherever you want after logout
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }], // Replace 'Login' with your actual login screen name
        });
      } else {
        Alert.alert('Error', 'Failed to logout. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'An unexpected error occurred during logout.');
    }
  };

  // Fetch profile data when component mounts
  useEffect(() => {
    fetchProfileImage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <View style={styles.imageContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : profileImage ? (
            <Image source={profileImage} style={styles.profileImage} />
          ) : (
            <View style={styles.noImageContainer}>
              <Icons name="person" size={32} color="#00C853" />
              <Text style={styles.noPhotoText}>No Photo</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.menuIconContainer}>
            <Icons name="person" size={20} color="#666" />
          </View>
          <Text style={styles.menuText}>Edit Profile</Text>
          <Icons name="chevron-right" size={24} color="#00C853" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Notification')}>
          <View style={styles.menuIconContainer}>
            <AntIcons name="bells" size={20} color="#666" />
          </View>
          <Text style={styles.menuText}>Notification</Text>
          <Icons name="chevron-right" size={24} color="#00C853" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('PaymentMethod')}>
          <View style={styles.menuIconContainer}>
            <FontAwesome name="credit-card" size={20} color="#666" />
          </View>
          <Text style={styles.menuText}>Payment method</Text>
          <Icons name="chevron-right" size={24} color="#00C853" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AddAddress')}>
          <View style={styles.menuIconContainer}>
            <FontAwesome name="home" size={20} color="#666" />
          </View>
          <Text style={styles.menuText}>Add / View Your Address</Text>
          <Icons name="chevron-right" size={24} color="#00C853" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('HelpSupport')}>
          <View style={styles.menuIconContainer}>
            <Icons name="help-outline" size={20} color="#666" />
          </View>
          <Text style={styles.menuText}>Help & support</Text>
          <Icons name="chevron-right" size={24} color="#00C853" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('LogoutConfirmation')}>
          <View style={styles.menuIconContainer}>
            <Icons name="logout" size={20} color="#666" />
          </View>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('UserHome')}>
          <Icons name="home" size={24} color="#999" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ScheduledOrder')}>
          <Icons name="receipt" size={24} color="#999" />
          <Text style={styles.navText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icons name="person" size={24} color="#00C853" />
          <Text style={styles.activeNavText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    fontSize: 12,
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPhotoText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  menuContainer: {
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
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

export default UserProfile;
