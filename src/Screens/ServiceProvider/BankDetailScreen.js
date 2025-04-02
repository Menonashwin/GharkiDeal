import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';

const BankDetailsScreen = ({ navigation }) => {
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    branchName: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    setShowModal(true);
  };

  const handleHomePress = () => {
    setShowModal(false);
    navigation.navigate('ServiceProviderHome'); 
  };

  return ( 
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="west" size={20} color="#C6C6C6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Bank Details</Text>
      </View>

      <Text style={styles.subtitle}>Enter Your Bank Details</Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            value={bankDetails.accountNumber}
            onChangeText={(text) =>
              setBankDetails({ ...bankDetails, accountNumber: text })
            }
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>IFSC Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Code"
            value={bankDetails.ifscCode}
            onChangeText={(text) =>
              setBankDetails({ ...bankDetails, ifscCode: text })
            }
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account holder name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={bankDetails.accountHolderName}
            onChangeText={(text) =>
              setBankDetails({ ...bankDetails, accountHolderName: text })
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Branch</Text>
          <TextInput
            style={styles.input}
            placeholder="Branch name"
            value={bankDetails.branchName}
            onChangeText={(text) =>
              setBankDetails({ ...bankDetails, branchName: text })
            }
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Application received</Text>
            <Text style={styles.modalText}>
              Your application for the service has received, you will get
              conformation message from our staff
            </Text>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={handleHomePress}
            >
              <Text style={styles.homeButtonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 15,
    color: '#00C853',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#00C853',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
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

export default BankDetailsScreen;