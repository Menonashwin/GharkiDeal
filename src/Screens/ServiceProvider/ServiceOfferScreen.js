import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import * as DocumentPicker from 'react-native-document-picker';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useMutation} from '../../utils/ApiService';

const ServiceOfferScreen = ({navigation}) => {
  const [aadharDocument, setAadharDocument] = useState(null);
  const { fetchData, loading: uploading, data } = useMutation();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
      console.log('Document selected:', result);
      setAadharDocument(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled picker');
      } else {
        console.error(err);
        Alert.alert('Error', 'Could not pick the document.');
      }
    }
  };

  const handleNext = async() => {
      if (!aadharDocument) {
    Alert.alert('Error', 'Please provide at least one field');
    return;
  }
      try{
        const formData = new FormData();
        if(aadharDocument){
          formData.append('file', {
            uri: aadharDocument.uri,
            name: 'image.jpg',
            type: 'image/jpeg',
          });   
      }
      const response = await fetchData({
        endpoint: 'service-providers/id-proof',
        method: 'POST',
        data: formData,
      });
      console.log('Response:', response);
      Alert.alert('Success', 'Document uploaded successfully!');
      navigation.navigate('UserHome');
      }
      catch (error) {
        console.error('Upload error:', error);
        Alert.alert('Error', 'Failed to upload document');
      }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icons name="west" size={20} color="#C6C6C6" />
      </TouchableOpacity>

      <Text style={styles.title}>Document Upload</Text>

      <Text style={styles.uploadLabel}>Upload your Aadhar Card</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
        <View style={styles.uploadButtonContent}>
          <Icons
            name="upload-file"
            size={20}
            color="#666"
            style={styles.uploadIcon}
          />
          <Text style={styles.uploadButtonText}>
            {aadharDocument?.name || '+ Upload'}
          </Text>
        </View>
      </TouchableOpacity>

      {aadharDocument && (
        <Text style={styles.fileInfo}>File: {aadharDocument.name}</Text>
      )}

      <TouchableOpacity
        style={[
          styles.nextButton,
          !(aadharDocument) &&
            styles.nextButtonDisabled,
        ]}
        disabled={!(aadharDocument)}
        onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: 'white'},
  backButton: {marginBottom: 20},
  title: {fontSize: 24, marginBottom: 30},
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  picker: {height: 50},
  uploadLabel: {fontSize: 14, color: '#666', marginBottom: 8},
  uploadButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonContent: {flexDirection: 'row', alignItems: 'center'},
  uploadIcon: {marginRight: 8},
  uploadButtonText: {color: '#666', fontSize: 16},
  fileInfo: {color: '#00C853', marginBottom: 20, fontSize: 12},
  nextButton: {
    backgroundColor: '#00C853',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  nextButtonDisabled: {backgroundColor: '#cccccc'},
  nextButtonText: {color: 'white', fontSize: 16},
});

export default ServiceOfferScreen;
