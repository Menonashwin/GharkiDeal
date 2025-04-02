import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';

const PopularServicesScreen = ({ navigation }) => {
  const popularServices = [
    { id: 1, name: 'Air Condition', icon: 'ac-unit' },
    { id: 2, name: 'Electric', icon: 'electrical-services' },
    { id: 3, name: 'Home Flooring', icon: 'grid-on' },
    { id: 4, name: 'Carpet', icon: 'carpet' },
    { id: 5, name: 'Carpenters', icon: 'handyman' },
    { id: 6, name: 'Car washer', icon: 'local-car-wash' },
    { id: 7, name: 'Furniture', icon: 'weekend' },
    { id: 8, name: 'Painter', icon: 'format-paint' },
    { id: 9, name: 'Loading', icon: 'local-shipping' },
  ];

  // Create two columns of services
  const getServiceColumns = () => {
    const leftColumn = [];
    const rightColumn = [];
    
    popularServices.forEach((service, index) => {
      if (index % 2 === 0) {
        leftColumn.push(service);
      } else {
        rightColumn.push(service);
      }
    });
    
    return { leftColumn, rightColumn };
  };
  
  const { leftColumn, rightColumn } = getServiceColumns();

  const renderServiceItem = (service) => (
    <TouchableOpacity 
      key={service.id} 
      style={styles.serviceItem}
      onPress={() => navigation.navigate('ServiceDetails', { service })}
    >
      <View style={styles.serviceIconContainer}>
        <Icons name={service.icon} size={24} color="#00C853" />
      </View>
      <Text style={styles.serviceName}>{service.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntIcons name="arrowleft" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Popular services</Text>
      </View>
      
      {/* Services Grid */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.servicesGrid}>
          {/* Left Column */}
          <View style={styles.column}>
            {leftColumn.map(service => renderServiceItem(service))}
          </View>
          
          {/* Right Column */}
          <View style={styles.column}>
            {rightColumn.map(service => renderServiceItem(service))}
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Icons name="home" size={24} color="#999" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Orders')}>
          <Icons name="receipt" size={24} color="#999" />
          <Text style={styles.navText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserProfile')}>
          <Icons name="person-outline" size={24} color="#00C853" />
          <Text style={styles.activeNavText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4CAF50',
    marginLeft: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeNavText: {
    fontSize: 12,
    color: '#00C853',
    marginTop: 4,
  },
});

export default PopularServicesScreen;