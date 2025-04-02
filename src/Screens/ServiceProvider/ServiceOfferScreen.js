import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icons from 'react-native-vector-icons/MaterialIcons';

const ServiceOfferScreen = ({ navigation }) => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const services = ['Plumber', 'Electrician', 'Carpenter', 'Painter'];
  const experiences = ['1-2 years', '2-5 years', '5+ years'];
  const areas = ['Area 1', 'Area 2', 'Area 3'];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icons name='west' size={20} color="#C6C6C6 "/>
      </TouchableOpacity>

      <Text style={styles.title}>Service offer</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedService}
          onValueChange={(itemValue) => setSelectedService(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Your service" value="" />
          {services.map((service) => (
            <Picker.Item key={service} label={service} value={service} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedExperience}
          onValueChange={(itemValue) => setSelectedExperience(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Your Experience" value="" />
          {experiences.map((exp) => (
            <Picker.Item key={exp} label={exp} value={exp} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedArea}
          onValueChange={(itemValue) => setSelectedArea(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Service Zone" value="" />
          {areas.map((area) => (
            <Picker.Item key={area} label={area} value={area} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity 
        style={[
          styles.nextButton,
          (!selectedService || !selectedExperience || !selectedArea) && styles.nextButtonDisabled
        ]}
        onPress={() => navigation.navigate('DocumentUpload')}
        disabled={!selectedService || !selectedExperience || !selectedArea}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
  },
  nextButton: {
    backgroundColor: '#00C853',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  nextButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ServiceOfferScreen;