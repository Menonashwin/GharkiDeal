import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrdersScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Scheduled');

  const completedOrders = [
    {
      id: 1,
      serviceType: 'Plumbing',
      bookingDate: 'December 24, 2024',
      serviceName: 'Emily Jani',
    },
    {
      id: 2,
      serviceType: 'Painter',
      bookingDate: 'December 07, 2024',
      serviceName: 'Lucas',
    },
  ];

  const scheduledOrders = [
    {
      id: 1,
      serviceType: 'Plumbing',
      bookingDate: 'January 04, 2024',
      arrivalTime: '10:00AM',
      serviceName: 'Emily Jani',
    },
    {
      id: 2,
      serviceType: 'Locksmith',
      bookingDate: 'January 04, 2024',
      arrivalTime: '10:00AM',
      serviceName: 'Benjamin',
    },
  ];

  const getServiceIcon = (serviceType) => {
    switch (serviceType.toLowerCase()) {
      case 'plumbing':
        return 'water-pump';
      case 'painter':
        return 'brush';
      case 'locksmith':
        return 'lock';
      default:
        return 'tools';
    }
  };

  const navigateToHome = () => navigation.navigate('UserHome');
  const navigateToProfile = () => navigation.navigate('UserProfile');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>My orders</Text>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Scheduled' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Scheduled')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Scheduled' && styles.activeTabText,
            ]}
          >
            Scheduled
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Completed' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Completed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Completed' && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        {activeTab === 'Scheduled'
          ? 'Upcoming Booking services'
          : 'Paid services'}
      </Text>

      <ScrollView style={styles.ordersContainer}>
        {activeTab === 'Scheduled'
          ? scheduledOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.serviceRow}>
                  <View style={styles.iconContainer}>
                    <Icons
                      name={getServiceIcon(order.serviceType)}
                      size={24}
                      color="#666"
                    />
                  </View>
                  <Text style={styles.serviceType}>{order.serviceType}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Booking date</Text>
                  <Text style={styles.detailValue}>{order.bookingDate}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Arrival time</Text>
                  <Text style={styles.detailValue}>{order.arrivalTime}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Plumber name</Text>
                  <Text style={styles.detailValueGreen}>
                    {order.serviceName}
                  </Text>
                </View>

                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                </TouchableOpacity>
              </View>
            ))
          : completedOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.serviceRow}>
                  <View style={styles.iconContainer}>
                    <Icons
                      name={getServiceIcon(order.serviceType)}
                      size={24}
                      color="#666"
                    />
                  </View>
                  <Text style={styles.serviceType}>{order.serviceType}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Booking date</Text>
                  <Text style={styles.detailValue}>{order.bookingDate}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    {order.serviceType === 'Painter'
                      ? 'Painter name'
                      : 'Plumber name'}
                  </Text>
                  <Text style={styles.detailValueGreen}>
                    {order.serviceName}
                  </Text>
                </View>
              </View>
            ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={navigateToHome}>
          <Icons name="home-outline" size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icons name="calendar-check" size={24} color="#00C853" />
          <Text style={styles.navTextActive}>Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={navigateToProfile}>
          <Icons name="account-outline" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00C853',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#00C853',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666',
    marginLeft: 20,
    marginBottom: 15,
  },
  ordersContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
  },
  detailValueGreen: {
    fontSize: 14,
    color: '#00C853',
    textAlign: 'right',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#00C853',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#00C853',
    fontSize: 15,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 12,
    color: '#00C853',
    marginTop: 4,
  },
});

export default OrdersScreen;
