import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

import AntIcons from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ServiceProviderDetailsScreen = ({ route, navigation }) => {
  // Extract the provider data from route params
  // In a real app, you would fetch this data from an API or pass it via navigation
  const { provider } = route.params || {
    id: 2,
    name: 'Emily Jani',
    profession: 'Plumber',
    rating: 4.8,
    color: '#FFE0B2',
    ordersCompleted: 56,
    experience: 4,
    skills: ['Sink', 'Shower', 'Boiler', 'Toilet'],
    bio: "I'm Emily Jani, a dedicated plumbing professional with 4 years of experience. I'm here to ensure your home's plumbing runs smoothly, with years of trusted experience.",
    reviews: [
      {
        id: 1,
        name: 'Josh Peter',
        date: '12/01/2024',
        rating: 5,
        comment: 'Emily Jani exceeded my expectations! Quick, reliable, and fixed my plumbing issue with precision. Highly recommend.',
        avatar: 'J',
      },
      {
        id: 2,
        name: 'Caleb',
        date: '12/01/2024',
        rating: 4,
        comment: 'Emily Jani exceeded my expectations! Quick, reliable, and fixed my plumbing issue with precision. Highly recommend.',
        avatar: 'C',
      },
      {
        id: 3,
        name: 'Ethan',
        date: '12/01/2024',
        rating: 4,
        comment: 'Emily Jani exceeded my expectations! Quick, reliable, and fixed my plumbing issue with precision. Highly recommend.',
        avatar: 'E',
      },
    ],
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntIcons
          key={i}
          name="star"
          size={14}
          color={i <= rating ? "#FFD700" : "#E0E0E0"}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  const handleBookPress = () => {
    navigation.navigate('BookingAddress', { provider });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntIcons name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <AntIcons name="heart" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Provider Image and Basic Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{provider.name.charAt(0)}</Text>
            </View>
          </View>
          
          <Text style={styles.providerName}>{provider.name}</Text>
          <Text style={styles.providerProfession}>{provider.profession}</Text>
          
          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <AntIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.statValue}>{provider.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <AntIcons name="checkcircle" size={20} color="#4CAF50" />
              <Text style={styles.statValue}>{provider.ordersCompleted}</Text>
              <Text style={styles.statLabel}>Orders Completed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <AntIcons name="calendar" size={20} color="#7B68EE" />
              <Text style={styles.statValue}>{provider.experience} Years</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>
        </View>

        {/* Skills Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {provider.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBookPress}>
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>

        {/* Bio Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <Text style={styles.bioText}>{provider.bio}</Text>
        </View>

        {/* Reviews Section */}
        <View style={[styles.sectionContainer, { marginBottom: 20 }]}>
          <Text style={styles.sectionTitle}>Review</Text>
          {provider.reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerAvatar}>
                  <Text style={styles.reviewerAvatarText}>{review.avatar}</Text>
                </View>
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>{review.name}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              </View>
              <View style={styles.reviewStars}>
                {renderStars(review.rating)}
              </View>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Call button */}
      <TouchableOpacity style={styles.callButton}>
        <AntIcons name="phone" size={24} color="#fff" />
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  favoriteButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  providerName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  providerProfession: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 6,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
  reviewItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewerAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewerInfo: {
    justifyContent: 'center',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  reviewStars: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  callButton: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ServiceProviderDetailsScreen;