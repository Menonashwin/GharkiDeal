import React, {useState, useEffect} from 'react';
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
import {useMutation} from '../../utils/ApiService';
import {launchImageLibrary} from 'react-native-image-picker';

const EditProfile = ({navigation}) => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    zone: '',
    ph_no: '',
    profileImage: null,
  });
  const [imageSelected, setImageSelected] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {fetchData, loading: uploading, data} = useMutation();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetchData({
        endpoint: 'users/profile',
        method: 'GET',
      });

      console.log('Profile Response:', response);

      if (response) {
        console.log(
          'latest----------------------->',
          response?.profile?.profile_image_url,
          response?.profile_image_url,
        );
        // Prepare profile data from response
        setProfileData({
          name: response.profile?.name || '',
          email: response.profile?.email || '',
          zone: response.zone || '',
          ph_no: response.ph_no || '',
          profileImage: response.profile?.profile_image_url
            ? {uri: response?.profile.profile_image_url}
            : null,
        });
      }
    } catch (error) {
      console.error('GET Error:', error);
      Alert.alert('Error', 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle image selection
  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 800,
      maxWidth: 800,
      quality: 0.7,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
        Alert.alert('Error', 'Failed to select image');
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        setProfileData({...profileData, profileImage: {uri: imageUri}});
        setImageSelected(true);
      }
    });
  };

  // Function to handle profile save with image upload if needed
  const handleSaveProfile = async () => {
    try {
      setSubmitting(true);
      const formData = new FormData();
      if (imageSelected) {
        formData.append('file', {
          uri: profileData.profileImage.uri,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
      }
      console.log('Image Selected:',  profileData.profileImage.uri,formData);
      await fetchData({
        endpoint: 'users/profile-image',
        method: 'POST',
        data: formData,
      });
      const LogData = {
        name: profileData.name,
        email: profileData.email,
        zone: profileData.zone,
      };

      const response = await fetchData({
        endpoint: 'users/profile',
        method: 'PUT',
        data: LogData,
      });

      console.log('Update Response:', response);

      if (response) {
        Alert.alert('Success', 'Profile updated successfully', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      }
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (uploading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.editHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.editHeaderTitle}>Edit Profile</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#00C853" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.editHeaderTitle}>Edit Profile</Text>
      </View>

      <ScrollView style={styles.editForm}>
        <View style={styles.profileImageEditContainer}>
          {profileData.profileImage ? (
            <Image
              source={profileData.profileImage}
              style={styles.profileImageEdit}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Icons name="person" size={40} color="#aaa" />
            </View>
          )}
          <TouchableOpacity
            style={styles.editImageButton}
            onPress={handleSelectImage}>
            <AntIcons name="edit" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={profileData.name}
            onChangeText={text => setProfileData({...profileData, name: text})}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            onChangeText={text => setProfileData({...profileData, email: text})}
            keyboardType="email-address"
            placeholder="Enter your email"
          />
        </View>



        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Zone</Text>
          <TextInput
            style={styles.input}
            value={profileData.zone}
            onChangeText={text => setProfileData({...profileData, zone: text})}
            placeholder="Enter your zone"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone number</Text>
          <TextInput
            style={styles.input}
            value={profileData.ph_no}
            onChangeText={text => setProfileData({...profileData, ph_no: text})}
            keyboardType="phone-pad"
            placeholder="Enter your phone number"
          />
        </View>

        {/* Add some spacing at the bottom for better scrolling */}
        <View style={{height: 100}} />
      </ScrollView>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveProfile}
        disabled={submitting}>
        {submitting ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.saveButtonText}>Save</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
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
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
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
  saveButton: {
    backgroundColor: '#00C853',
    padding: 15,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
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
