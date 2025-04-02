import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {API_URL} from 'react-native-dotenv';
import axios from 'axios';
import { fetchData } from '../../utils/ApiService';

const EditProfile = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    address: '',
    zone: '',
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('Profile Data Updated:', profileData);
  }, [profileData]);
  
  useEffect(() => {
    fetchProfile();
  }, []);

  
  const fetchProfile = async () => {
    try {
      const response = await fetchData(`users/findOne/{id}`);
      console.log('Profile Response:', response);
      setProfileData(response);
      console.log('Profile Data:', response);
    } 
    catch (error) {
      console.error('GET Error:', error);
      Alert.alert('Error', 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const payload = {
        name: profileData.fullName,
        email: profileData.email,
        address: profileData.address,
        zone: profileData.zone,
        phoneNumber: profileData.phoneNumber,
      };

      const response = await axios.post(`${API_URL}users/update-profile/{id}`, payload);

      if (response.status === 200) {
        Alert.alert('Success', 'Profile updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error('POST Error:', error);
      Alert.alert('Error', 'Something went wrong while saving profile');
    } 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.editHeaderTitle}>Edit Profile</Text>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#00C853" />
        </View>
      ) : (
        <>
          <ScrollView style={styles.editForm}>
            <View style={styles.profileImageEditContainer}>
              <Image
                source={require('../assets/ashwin.jpeg')}
                style={styles.profileImageEdit}
              />
              <TouchableOpacity style={styles.editImageButton}>
                <AntIcons name="edit" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={profileData.fullName}
                onChangeText={(text) => setProfileData({ ...profileData, fullName: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={profileData.email}
                onChangeText={(text) => setProfileData({ ...profileData, email: text })}
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.input}
                value={profileData.address}
                onChangeText={(text) => setProfileData({ ...profileData, address: text })}
              />
            </View>


            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Zone</Text>
              <TextInput
                style={styles.input}
                value={profileData.zone}
                onChangeText={(text) => setProfileData({ ...profileData, zone: text })}
              />
            </View>


            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone number</Text>
              <TextInput
                style={styles.input}
                value={profileData.phoneNumber}
                onChangeText={(text) =>
                  setProfileData({ ...profileData, phoneNumber: text })
                }
                keyboardType="phone-pad"
              />
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveProfile}
          >
            <Text style={styles.saveButtonText}>
                Save
              </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  editHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 40 : 16,
  },
  editHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 24,
    color: '#00C853',
  },
  profileImageEditContainer: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  profileImageEdit: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#00C853',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editForm: {
    paddingHorizontal: 16,
    marginBottom: 80,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 15 : 10,
    fontSize: 14,
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#00C853',
    padding: 15,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EditProfile;
