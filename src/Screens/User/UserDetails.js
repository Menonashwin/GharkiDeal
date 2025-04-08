import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useMutation } from '../../utils/ApiService';
const UserDetails = ({navigation}) => {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    address: '',
    zone: '',
  });
  const [selectedZone, setSelectedZone] = useState('');
  const zone = ['Kakkanad', 'Palarivattom', 'kalamassery', 'Edappally'];
  const [showModal, setShowModal] = useState(false);
  const { fetchData, loading: uploading, data } = useMutation();
  const validateForm = () => {
    if (!details.name.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    if (!details.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!selectedZone) {
      Alert.alert('Error', 'Please select your zone');
      return false;
    }
    if (!details.address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
          Alert.alert('Error', 'Please provide at least one field');
          return;
        }
    
    try {
      const detailData = {
        name: details.name,
          email: details.email,
          address: details.address,
          zone: selectedZone,
      }
      console.log('detaildata : ', data)
      const response = await fetchData(
        {
          endpoint: 'users/profile',
          method: 'PUT',
          data: detailData,
        },
      );
      setShowModal(true);
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert(
        'Error', 'Failed to submit form'
      );
      console.error('Error saving profile:', error);
    } 
  };

  const handleHomePress = () => {
    setShowModal(false);
    navigation.navigate('UserHome');
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}>
          <Icons name="west" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Enter your details</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icons
              name="person-outline"
              size={20}
              color="#C6C6C6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor={'#C6C6C6'}
              value={details.name}
              onChangeText={text => setDetails({...details, name: text})}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icons
              name="email"
              size={20}
              color="#C6C6C6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={'#C6C6C6'}
              value={details.email}
              onChangeText={text => setDetails({...details, email: text})}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icons
              name="location-on"
              size={20}
              color="#C6C6C6"
              style={styles.inputIcon}
            />
            <Picker
              selectedValue={selectedZone}
              onValueChange={itemValue => setSelectedZone(itemValue)}
              style={styles.input}
              dropdownIconColor="#C6C6C6"
              placeholder="Select Your Zone">
              <Picker.Item label="Select Your Zone" value="" color="#C6C6C6" />
              {zone.map(area => (
                <Picker.Item key={area} label={area} value={area} />
              ))}
            </Picker>
          </View>
          <View style={styles.inputWrapper}>
            <Icons
              name="location-on"
              size={20}
              color="#C6C6C6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Address"
              placeholderTextColor={'#C6C6C6'}
              value={details.address}
              onChangeText={text => setDetails({...details, address: text})}
              multiline={true}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, uploading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={uploading}>
          <Text style={styles.saveButtonText}>
            {uploading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
        <Modal
          visible={showModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Submitted Sucessfully</Text>
              <Text style={styles.modalText}>Your Registration Completed</Text>
              <TouchableOpacity
                style={styles.homeButton}
                onPress={handleHomePress}>
                <Text style={styles.homeButtonText}>Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 10,
  },
  skipText: {
    color: '#666',
    fontSize: 16,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00C853',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#A0D9B7',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
    color: '#333',
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  homeButton: {
    backgroundColor: '#00C853',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default UserDetails;
