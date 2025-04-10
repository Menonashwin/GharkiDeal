import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {useMutation} from '../../utils/ApiService';
const PhoneVerificationScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const { fetchData, loading: uploading, data } = useMutation();

  console.log('error occured');
  const handleSubmit = async () => {
    try {
      const loginData={
        ph_no: phone,
        user_type: 'service_provider',
      }
      const response = await fetchData(
        {
          endpoint: 'auth/phone',
          method: 'POST',
          data: loginData,
        },     
      );
      console.log('Response:', response);
      navigation.navigate('OTPInput', {
        phone: phone,
        otp: response.otp,
      });
    } catch (error) {
      console.error('Upload Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Verification failed',
        text2: 'Please try again',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Toast />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icons name="west" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phone Verification</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Verify Your Phone</Text>
        <Text style={styles.subtitle}>
          Enter your phone number to receive a verification code
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter 10-digit number"
            placeholderTextColor="#AAAAAA"
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, phone.length !== 10 && styles.buttonDisabled]}
          onPress={() => {
            if (phone.length === 10) {
              handleSubmit();
            } else {
              Toast.show({
                type: 'error',
                text1: 'Invalid Phone Number',
                text2: 'Please enter a valid 10-digit number',
              });
            }
          }}
          disabled={phone.length !== 10}>
          <Text style={styles.buttonText}>Send Verification Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#00C853',
    padding: 12,
    fontSize: 18,
    color: '#333333',
  },
  button: {
    backgroundColor: '#00C853',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PhoneVerificationScreen;
