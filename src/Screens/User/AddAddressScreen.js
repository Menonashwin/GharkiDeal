import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useMutation} from '../../utils/ApiService';

const AddAddressScreen = () => {
  const {fetchData, loading: uploading} = useMutation();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState('');
  const [zone, setZone] = useState('');
  const [landmark, setLandmark] = useState('');

  useEffect(() => {
    getAddressList();
  }, []);

  const getAddressList = async () => {
    try {
      const res = await fetchData({
        endpoint: 'users/addresses',
        method: 'GET',
      });
      setAddresses(res);
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
    }
  };

  const handleAddAddress = async () => {
    const payload = {
      address,
      zone,
      landmark,
    };

    try {
      await fetchData({
        endpoint: 'users/addresses',
        method: 'POST',
        data: payload,
      });
      Alert.alert('Success', 'Address added successfully');
      resetForm();
      setShowForm(false);
      getAddressList(); 
    } catch (err) {
      console.error('Failed to add address:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const resetForm = () => {
    setAddress('');
    setZone('');
    setLandmark('');
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text>
        {item.address}, {item.zone}
      </Text>
      <Text>{item.landmark}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {showForm ? (
          <>
            <Text style={styles.heading}>Add Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Zone / Area"
              value={zone}
              onChangeText={setZone}
            />
            <TextInput
              style={styles.input}
              placeholder="Landmark"
              value={landmark}
              onChangeText={setLandmark}
            />

            <TouchableOpacity style={styles.button} onPress={handleAddAddress}>
              <Text style={styles.buttonText}>Save Address</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {uploading && <Text style={styles.loadingText}>Loading...</Text>}
            <FlatList
              data={addresses}
              keyExtractor={item => item.id?.toString()}
              renderItem={renderItem}
              ListEmptyComponent={
                <Text style={{textAlign: 'center', marginTop: 20}}>
                  No addresses yet.
                </Text>
              }
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                resetForm();
                setShowForm(true);
              }}>
              <Text style={styles.buttonText}>Add Address</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#F1F8E9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  button: {
    backgroundColor: '#66BB6A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#F1F8E9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#AED581',
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default AddAddressScreen;
