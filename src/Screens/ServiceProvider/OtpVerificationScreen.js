import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useMutation} from '../../utils/ApiService';

const OTPVerificationScreen = ({navigation, route}) => {
  const [otp, setOtp] = useState('');
  const {fetchData, loading: uploading, data} = useMutation();
  const {phone, otp: receivedOTP} = route.params;

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
        const providerOtpData = {
          ph_no: phone,
          otp: receivedOTP,
          user_type: 'service_provider',
        };
        const response = await fetchData({
          endpoint: 'auth/verify-otp',
          method: 'POST',
          data: providerOtpData,
        });
        console.log(response.data);
        navigation.navigate('ServiceProviderDetails');
      } catch (error) {
        console.error('Upload Error :', error);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid PIN',
        text2: 'Please enter a valid 5-digit PIN',
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
        <Text style={styles.headerTitle}>Verification</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Verify Your Phone</Text>
        <Text style={styles.subtitle}>
          Enter the 5-digit PIN code sent to {phone}
        </Text>

        <View style={styles.otpContainer}>
          <TextInput
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={5}
            placeholder="0 0 0 0 0"
            placeholderTextColor="#AAAAAA"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, otp.length !== 5 && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={otp.length !== 5}>
          <Text style={styles.buttonText}>Verify PIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendButton}
          onPress={() => console.log('Resend OTP')}>
          <Text style={styles.resendText}>Didn't receive code?</Text>
          <Text style={styles.resendActionText}>Send again</Text>
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
  otpContainer: {
    width: '80%',
    marginBottom: 40,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#00C853',
    padding: 12,
    fontSize: 28,
    letterSpacing: 16,
    textAlign: 'center',
    fontWeight: 'bold',
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
  resendButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  resendText: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 4,
  },
  resendActionText: {
    color: '#00C853',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OTPVerificationScreen;
