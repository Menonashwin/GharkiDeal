import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useMutation } from '../../utils/ApiService';

const UserVerification = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const { fetchData, loading: uploading, otpData } = useMutation()

  const handleSubmit = async () => {
    if (!phone){
      Alert.alert('Please enter a valid phone number');
      return;
    }
    try {

      const otpData={
        ph_no: phone,
        user_type: 'user',
      }

      const response = await fetchData (
        {
          endpoint: 'auth/phone',
          method: 'POST',
          data: otpData,
        },
      );
      navigation.navigate('UserOtp', {
        phone: phone,
        otp: response.otp,
      });
      
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Error', 'Failed to submit form');
    }
  };

  return (
    <>
      <View style={styles.headerSection}>
        <Toast />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icons name="west" size={22} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>LogIn</Text>
          <Text style={styles.descriptionText}>
            Please enter your phone number to continue
          </Text>
        </View>

        <View style={styles.phoneInputContainer}>
          <View style={styles.phoneInputWrapper}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              placeholderTextColor="#A9A9A9"
            />
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              if (phone.length === 10) {
                handleSubmit();
              }
            }}>
            <Text style={styles.continueButtonText}>Continue</Text>
            <Icons name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  textContainer: {
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  phoneInputContainer: {
    backgroundColor: '#F7F8F9',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 15,
    marginBottom: 25,
  },
  countryCodeContainer: {
    marginRight: 15,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    paddingRight: 15,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  continueButton: {
    backgroundColor: '#00C853',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
});

export default UserVerification;
