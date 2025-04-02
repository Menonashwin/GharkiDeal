import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <Image
          source={require('../assets/ashwin.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Ashwin</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <View style={styles.menuIconContainer}>
            <Icons name="person" size={20} color="#666" />
          </View>
          <Text style={styles.menuText}>Edit Profile</Text>
          <Icons name="chevron-right" size={24} color="#00C853" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Notification')}
        >
          <View style={styles.menuIconContainer}>
            <AntIcons name="bells" size={20} color="#666" />
          </View>
          <Text style={styles.menuText}>Notification</Text>
          <Icons name="chevron-right" size={24} color="#00C853" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('PaymentMethod')}
        >
          <View style={styles.menuIconContainer}>
            <FontAwesome name="credit-card" size={20} color="#666" />
          </View>
          <Text style={styles.menuText}>Payment method</Text>
          <Icons name="chevron-right" size={24} color="#00C853" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('HelpSupport')}
        >
          <View style={styles.menuIconContainer}>
            <Icons name="help-outline" size={20} color="#666" />
          </View>
          <Text style={styles.menuText}>Help & support</Text>
          <Icons name="chevron-right" size={24} color="#00C853" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('LogoutConfirmation')}
        >
          <View style={styles.menuIconContainer}>
            <Icons name="logout" size={20} color="#666" />
          </View>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserHome')}>
          <Icons name="home" size={24} color="#999" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Order')}>
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
  menuIcon: {
    width: 20,
    height: 20,
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