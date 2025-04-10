import React, {useEffect, useState} from 'react';
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

const UserOtpScreen = ({navigation, route}) => {
  const [otp, setOtp] = useState('');
  const {phone, otp: receivedOTP} = route.params;
  const { fetchData, loading: uploading, data } = useMutation();

  useEffect(() => {
    setOtp(receivedOTP);
    Toast.show({
      type: 'success',
      text1: 'Response OTP: ' + receivedOTP,
    });
  }, [receivedOTP]);

  const handleVerify = async () => {
    if (otp.length === 5) {
      try {

        const receivedOTPData={
          ph_no: phone,
          otp: receivedOTP,
          user_type: 'user',
        }
        console.log('Received OTP:', receivedOTPData);
        const response = await fetchData( {
          endpoint: 'auth/verify-otp',
          method: 'POST',
          data: receivedOTPData,
        });
        console.log(response);
        navigation.navigate('UserDetails');
      } catch (error) {
        console.error('Error.. :', error);
      }
    } else {
      alert('Please enter a valid 5-digit PIN');
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <Toast />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icons name="west" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Verification</Text>
        <Text style={styles.subHeading}>
          Enter 5-digit PIN code sent to your phone number
        </Text>

        <View style={styles.otpContainer}>
          <TextInput
            style={styles.otpInput}
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={5}
            placeholder="0 0 0 0 0"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.verifyButton,
            otp?.length !== 5 && styles.verifyButtonDisabled,
          ]}
          onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendContainer}
          onPress={() => console.log('Resend OTP')}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>
          <Text style={styles.resendLinkText}>Resend</Text>
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
  backButton: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  otpContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  otpInput: {
    fontSize: 24,
    letterSpacing: 10,
    textAlign: 'center',
    width: '100%',
    color: '#333',
  },
  verifyButton: {
    backgroundColor: '#00C853',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    color: '#666',
    marginRight: 5,
  },
  resendLinkText: {
    color: '#00C853',
    fontWeight: 'bold',
  },
});

export default UserOtpScreen;
