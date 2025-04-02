import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
const ServiceProviderDetails = ({navigation}) => {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="west" size={20} color="#C6C6C6 " />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ServiceOffer')}>
          <Text>Skip</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Enter your details</Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={details.name}
        onChangeText={text => setDetails({...details, name: text})}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={details.email}
        onChangeText={text => setDetails({...details, email: text})}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Your Age"
        value={details.age}
        onChangeText={text => setDetails({...details, age: text})}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Your Address"
        value={details.address}
        onChangeText={text => setDetails({...details, address: text})}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ServiceOffer')}>
        <Text style={styles.buttonText}>Submit</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#00C853',
  },
  button: {
    backgroundColor: '#00C853',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ServiceProviderDetails;
