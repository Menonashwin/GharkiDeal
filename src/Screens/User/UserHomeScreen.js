import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';

const UserHomeScreen = ({navigation}) => {
  const popularServices = [
    { id: 1, name: 'Plumbing', icon: 'plumbing' },
    { id: 2, name: 'Electric work', icon: 'electrical-services' },
    { id: 3, name: 'Solar', icon: 'wb-sunny' },
    { id: 4, name: 'AC', icon: 'ac-unit' },
  ];

  // Enhanced service providers with additional data needed for details screen
  const serviceProviders = [
    { 
      id: 1, 
      name: 'Joseph Johny', 
      profession: 'Plumber', 
      rating: 4.8,
      color: '#C5E1F9',
      ordersCompleted: 48,
      experience: 5,
      skills: ['Sink', 'Shower', 'Boiler', 'Toilet'],
      bio: "I'm Joseph Johny, a professional plumber with 5 years of experience. I specialize in all types of plumbing services and ensure quality work with every job.",
      reviews: [
        {
          id: 1,
          name: 'Mark Thomas',
          date: '05/02/2024',
          rating: 5,
          comment: 'Joseph did an amazing job fixing our kitchen sink. He was prompt, professional, and thorough.',
          avatar: 'M',
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          date: '28/01/2024',
          rating: 4,
          comment: 'Great service! Fixed our leaky faucet quickly and for a reasonable price.',
          avatar: 'S',
        },
      ],
    },
    { 
      id: 2, 
      name: 'Sreejith S', 
      profession: 'Electrician', 
      rating: 4.5,
      color: '#E8D0F0',
      ordersCompleted: 36,
      experience: 3,
      skills: ['Wiring', 'Lighting', 'Switches', 'Fans'],
      bio: "I'm Sreejith S, an experienced electrician with 3 years in the field. I handle all electrical installations and repairs with precision and safety as my top priority.",
      reviews: [
        {
          id: 1,
          name: 'Alex Chen',
          date: '15/01/2024',
          rating: 5,
          comment: 'Sreejith installed new lighting in our living room. The work was excellent and he was very professional.',
          avatar: 'A',
        },
        {
          id: 2,
          name: 'Michael Smith',
          date: '10/01/2024',
          rating: 4,
          comment: 'Fixed our electrical panel issues quickly. Would recommend.',
          avatar: 'M',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.promotionBanner}>
          <Text style={styles.promotionTitle}>Get 30% off</Text>
          <Text style={styles.promotionSubtitle}>
            Just by Booking Home Services
          </Text>
        </View>

       
        <View style={styles.searchContainer}>
          <Icons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search here..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Icons name="tune" size={20} color="#333" />
          </TouchableOpacity>
        </View>

    
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PopularService')}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.servicesScrollView}
          >
            {popularServices.map((service) => (
              <TouchableOpacity 
                key={service.id} 
                style={styles.serviceCard}
                onPress={() => navigation.navigate('ServiceDetails', { service })}
              >
                <View style={styles.serviceIconContainer}>
                  <Icons name={service.icon} size={24} color="#00C853" />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

     
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Service Providers</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ServiceProviderList')}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.providersContainer}>
            {serviceProviders.map((provider) => (
              <TouchableOpacity 
                key={provider.id} 
                style={styles.providerCard}
                onPress={() => navigation.navigate('ServiceProviderBookDetails', { provider })}
              >
                <View style={[
                  styles.providerImageContainer,
                  provider.id === 1 ? styles.blueBg : styles.purpleBg
                ]}>
                </View>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerProfession}>{provider.profession}</Text>
                <View style={styles.ratingContainer}>
                  <AntIcons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{provider.rating}</Text>
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => navigation.navigate('ServiceProviderBookDetails', { provider })}
                  >
                    <Text style={styles.contactButtonText}>Contact</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Icons name="home" size={24} color="#00C853" />
          <Text style={styles.activeNavText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ScheduledOrder')}>
          <Icons name="receipt" size={24} color="#999" />
          <Text style={styles.navText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserProfile')}>
          <Icons name="person-outline" size={24} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  promotionBanner: {
    backgroundColor: '#00C853',
    padding: 30,
    borderRadius: 10,
    margin: 10,
    marginBottom: 12,
  },
  promotionTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  promotionSubtitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  filterButton: {
    padding: 4,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  viewAllText: {
    color: '#00C853',
    fontSize: 14,
  },
  servicesScrollView: {
    paddingLeft: 16,
  },
  serviceCard: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  serviceIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  providersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  providerCard: {
    width: '48%',
    marginBottom: 16,
  },
  providerImageContainer: {
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  blueBg: {
    backgroundColor: '#C5E1F9',
  },
  purpleBg: {
    backgroundColor: '#E8D0F0',
  },
  providerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  providerProfession: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
    marginRight: 8,
  },
  contactButton: {
    backgroundColor: '#00C853',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  bottomNavigation: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 3,
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

export default UserHomeScreen;