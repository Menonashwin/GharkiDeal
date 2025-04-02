import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Platform,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';

const NotificationSettings = ({ navigation }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    generalNotification: true,
    sound: true,
    vibrate: true,
    newService: true,
    payment: true,
  });

  const toggleSwitch = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.editHeaderTitle}>Notification</Text>
      </View>

      <View style={styles.notificationContainer}>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>General notification</Text>
          <Switch
            trackColor={{ false: "#ddd", true: "#00C853" }}
            thumbColor="#fff"
            ios_backgroundColor="#ddd"
            onValueChange={() => toggleSwitch('generalNotification')}
            value={notificationSettings.generalNotification}
          />
        </View>

        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>Sound</Text>
          <Switch
            trackColor={{ false: "#ddd", true: "#00C853" }}
            thumbColor="#fff"
            ios_backgroundColor="#ddd"
            onValueChange={() => toggleSwitch('sound')}
            value={notificationSettings.sound}
          />
        </View>

        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>Vibrate</Text>
          <Switch
            trackColor={{ false: "#ddd", true: "#00C853" }}
            thumbColor="#fff"
            ios_backgroundColor="#ddd"
            onValueChange={() => toggleSwitch('vibrate')}
            value={notificationSettings.vibrate}
          />
        </View>

        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>New Service</Text>
          <Switch
            trackColor={{ false: "#ddd", true: "#00C853" }}
            thumbColor="#fff"
            ios_backgroundColor="#ddd"
            onValueChange={() => toggleSwitch('newService')}
            value={notificationSettings.newService}
          />
        </View>

        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>Payment</Text>
          <Switch
            trackColor={{ false: "#ddd", true: "#00C853" }}
            thumbColor="#fff"
            ios_backgroundColor="#ddd"
            onValueChange={() => toggleSwitch('payment')}
            value={notificationSettings.payment}
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
  notificationContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
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

export default NotificationSettings;