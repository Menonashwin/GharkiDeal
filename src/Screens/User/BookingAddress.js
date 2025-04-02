import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

import AntIcons from 'react-native-vector-icons/AntDesign';

const ServiceProviderBookingScreen = ({ route, navigation }) => {
  // Extract provider info from navigation params if needed
  const { provider } = route.params || {};
  
  const [houseNumber, setHouseNumber] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  
  // Form validation
  const isFormValid = () => {
    return houseNumber.trim() !== '' && 
           streetNumber.trim() !== '' && 
           completeAddress.trim() !== '';
  };
  
  const handleNext = () => {
 
    if (isFormValid()) {
     
      navigation.navigate('BookingDate', {
        provider,
        location: {
          houseNumber,
          streetNumber,
          completeAddress
        }
      });
    } else {
      
      alert('Please fill in all required fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntIcons name="arrowleft" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking</Text>
      </View>
      
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Enter your location address</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>House number</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter house number"
                value={houseNumber}
                onChangeText={setHouseNumber}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Street number</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter street number"
                value={streetNumber}
                onChangeText={setStreetNumber}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Complete Address</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter street number"
                value={completeAddress}
                onChangeText={setCompleteAddress}
                multiline={true}
                numberOfLines={2}
              />
            </View>
          </View>
        </ScrollView>
     
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.nextButton, !isFormValid() && styles.disabledButton]}
          onPress={handleNext}
          disabled={!isFormValid()}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4CAF50',
    marginLeft: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  formContainer: {
    width: '100%',
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  nextButton: {
    backgroundColor: '#00E676',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#B2DFDB',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ServiceProviderBookingScreen;