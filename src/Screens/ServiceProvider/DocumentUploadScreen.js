import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import * as DocumentPicker from 'react-native-document-picker';
import Icons from 'react-native-vector-icons/MaterialIcons';

const DocumentUploadScreen = ({navigation}) => {
  const [serviceLicense, setServiceLicense] = useState(null);
  const [certification, setCertification] = useState(null);

  const pickDocument = async type => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (type === 'license') {
        setServiceLicense(result[0]);
      } else {
        setCertification(result[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        Alert.alert('Error', 'Something went wrong while picking the file');
      }
    }
  };

  const renderUploadSection = (type, document, label) => {
    const isLicense = type === 'license';
    const fileName = document?.name || '';

    return (
      <View style={styles.uploadSection}>
        <Text style={styles.uploadLabel}>{label}</Text>
        <View style={styles.uploadContainer}>
          <View style={[styles.fileInfo, document && styles.fileInfoUploaded]}>
            <Text style={styles.fileName} numberOfLines={1}>
              {document ? fileName : 'No file selected'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => pickDocument(type)}>
            <Text style={styles.changeButtonText}>
              {document ? 'Change' : '+ Upload'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icons name= 'west' size={20} color="#C6C6C6" />
      </TouchableOpacity>

      <Text style={styles.title}>We need a few Documents.</Text>

      {renderUploadSection(
        'license',
        serviceLicense,
        'Upload your services license'
      )}
      {renderUploadSection(
        'certification',
        certification,
        'Upload your Certification'
      )}

      <TouchableOpacity
        style={[
          styles.nextButton,
          (!serviceLicense || !certification) && styles.nextButtonDisabled,
        ]}
        disabled={!serviceLicense || !certification}
        onPress={() => navigation.navigate('BankDetails')}>
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
    color: '#333',
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  uploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fileInfo: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: 'white',
  },
  fileInfoUploaded: {
    backgroundColor: '#F8F8F8',
  },
  fileName: {
    color: '#666',
    fontSize: 16,
  },
  changeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  changeButtonText: {
    color: '#666',
    fontSize: 16,
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

export default DocumentUploadScreen;