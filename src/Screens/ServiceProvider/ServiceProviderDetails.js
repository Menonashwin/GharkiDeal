import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useMutation} from '../../utils/ApiService';
import {Picker} from '@react-native-picker/picker';

const ServiceProviderDetails = ({navigation}) => {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    address: '',
    zone: '',
  });
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');

  const experiences = ['1-2 years', '2-5 years', '5+ years'];
  const zone = ['Kakkanad', 'Palarivattom', 'kalamassery', 'Edappally'];
  const serviceTypes = [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Cleaning',
    'Painting',
    'Gardening',
  ];

  const {fetchData, loading: uploading, data} = useMutation();

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
    if (!selectedServiceType) {
      Alert.alert('Error', 'Please select a service type');
      return false;
    }
    if (!selectedExperience) {
      Alert.alert('Error', 'Please select your experience');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const detailData = {
        name: details.name,
        email: details.email,
        zone: selectedZone,
        address: details.address,
        service_type: selectedServiceType,
        experience_years: parseInt(selectedExperience),
      };

      const response = await fetchData({
        endpoint: 'service-providers/profile',
        method: 'POST',
        data: detailData,
      });

      console.log('detaildata : ', response);
      if (response) {
        navigation.navigate('ServiceOffer');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to submit form');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="west" size={20} color="#C6C6C6" />
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

          {/* Service Type Picker */}
          <View style={styles.inputWrapper}>
            <Icons
              name="home-repair-service"
              size={20}
              color="#C6C6C6"
              style={styles.inputIcon}
            />
            <Picker
              selectedValue={selectedServiceType}
              onValueChange={itemValue => setSelectedServiceType(itemValue)}
              style={styles.input}
              dropdownIconColor="#C6C6C6">
              <Picker.Item
                label="Select Service Type"
                value=""
                color="#C6C6C6"
              />
              {serviceTypes.map(type => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
          <View style={styles.inputWrapper}>
          <Icons
              name="home-repair-service"
              size={20}
              color="#C6C6C6"
              style={styles.inputIcon}
            />
              <Picker
                selectedValue={selectedExperience}
                onValueChange={itemValue => setSelectedExperience(itemValue)}
                style={styles.input}>
                <Picker.Item label="Select Experience" value=""  color="#C6C6C6"/>
                {experiences.map(exp => (
                  <Picker.Item key={exp} label={exp} value={exp} />
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
            <Picker
              selectedValue={selectedZone}
              onValueChange={itemValue => setSelectedZone(itemValue)}
              style={styles.input}
              dropdownIconColor="#C6C6C6">
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
      </View>
    </View>
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
});

export default ServiceProviderDetails;
