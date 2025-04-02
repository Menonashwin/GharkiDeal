import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';

const AddBankDetails = ({ navigation }) => {
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    branchName: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.editHeaderTitle}>Add Bank Details</Text>
      </View>

      <Text style={styles.bankDetailsSubtitle}>Enter Your Bank Details</Text>

      <View style={styles.bankForm}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            value={bankDetails.accountNumber}
            onChangeText={(text) => setBankDetails({ ...bankDetails, accountNumber: text })}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>IFSC Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Code"
            value={bankDetails.ifscCode}
            onChangeText={(text) => setBankDetails({ ...bankDetails, ifscCode: text })}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Account holder name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={bankDetails.accountHolderName}
            onChangeText={(text) => setBankDetails({ ...bankDetails, accountHolderName: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Branch</Text>
          <TextInput
            style={styles.input}
            placeholder="Branch name"
            value={bankDetails.branchName}
            onChangeText={(text) => setBankDetails({ ...bankDetails, branchName: text })}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  editHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 40 : 16,
  },
  editHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 24,
    color: '#00C853',
  },
  bankDetailsSubtitle: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  bankForm: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 15 : 10,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#00C853',
    padding: 15,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddBankDetails;