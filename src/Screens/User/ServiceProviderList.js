import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import AntIcons from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ServiceProvidersScreen = ({navigation}) => {
  const providerCategories = [
    {id: 1, name: 'Electrician', icon: 'bolt'},
    {id: 2, name: 'Plumber', icon: 'wrench'},
    {id: 3, name: 'Painter', icon: 'paint-brush'},
    {id: 4, name: 'Cleaner', icon: 'trash'},
    {id: 5, name: 'Carpenter', icon: 'hammer'},
  ];

  // Enhanced provider data with additional fields to match the details screen
  const providers = {
    Electrician: [
      {
        id: 1,
        name: 'Jackson',
        profession: 'Electrician',
        rating: 4.8,
        color: '#FFCDD2',
        ordersCompleted: 42,
        experience: 5,
        skills: ['Wiring', 'Installation', 'Maintenance', 'Lighting'],
        bio: "I'm Jackson, a certified electrician with 5 years of experience in residential and commercial electrical work. I ensure safe and efficient solutions for all your electrical needs.",
        reviews: [
          {
            id: 1,
            name: 'Mark',
            date: '15/01/2024',
            rating: 5,
            comment: 'Jackson did an excellent job rewiring my kitchen. Professional, clean, and efficient work.',
            avatar: 'M',
          },
        ],
      },
      {
        id: 2,
        name: 'Emily Joni',
        profession: 'Electrician',
        rating: 4.6,
        color: '#FFE0B2',
        ordersCompleted: 38,
        experience: 3,
        skills: ['Repair', 'Lighting', 'Wiring', 'Safety'],
        bio: "Experienced electrician with a focus on safety and reliability. I specialize in residential installations and repairs with attention to detail.",
        reviews: [
          {
            id: 1,
            name: 'Laura',
            date: '10/01/2024',
            rating: 5,
            comment: 'Emily was very professional and completed the job quickly. Will definitely hire again!',
            avatar: 'L',
          },
        ],
      },
    ],
    Plumber: [
      {
        id: 3,
        name: 'Ethan Ilia',
        profession: 'Plumber',
        rating: 4.7,
        color: '#C8E6C9',
        ordersCompleted: 64,
        experience: 6,
        skills: ['Pipe Repair', 'Installation', 'Water Heater', 'Drainage'],
        bio: "I'm Ethan, a licensed plumber with 6 years of experience. I specialize in comprehensive plumbing solutions for both residential and commercial properties.",
        reviews: [
          {
            id: 1,
            name: 'David',
            date: '05/01/2024',
            rating: 5,
            comment: 'Ethan fixed a complicated leak in my basement. Very thorough and professional work.',
            avatar: 'D',
          },
        ],
      },
      {
        id: 4,
        name: 'Isabella Ana',
        profession: 'Plumber',
        rating: 4.3,
        color: '#BBDEFB',
        ordersCompleted: 56,
        experience: 4,
        skills: ['Sink', 'Shower', 'Boiler', 'Toilet'],
        bio: "I'm Isabella Ana, a dedicated plumbing professional with 4 years of experience. I'm here to ensure your home's plumbing runs smoothly, with years of trusted experience.",
        reviews: [
          {
            id: 1,
            name: 'Josh Peter',
            date: '12/01/2024',
            rating: 4,
            comment: 'Isabella exceeded my expectations! Quick, reliable, and fixed my plumbing issue with precision.',
            avatar: 'J',
          },
        ],
      },
    ],
    Painter: [
      {
        id: 5,
        name: 'Lucas',
        profession: 'Painter',
        rating: 4.5,
        color: '#E1BEE7',
        ordersCompleted: 45,
        experience: 7,
        skills: ['Interior', 'Exterior', 'Decorative', 'Residential'],
        bio: "Professional painter with 7 years of experience. I specialize in both interior and exterior painting with a focus on quality and attention to detail.",
        reviews: [
          {
            id: 1,
            name: 'Rachel',
            date: '20/01/2024',
            rating: 4,
            comment: 'Lucas did a fantastic job painting our living room. Very detail-oriented and clean work.',
            avatar: 'R',
          },
        ],
      },
      {
        id: 6,
        name: 'Ethan',
        profession: 'Painter',
        rating: 4.4,
        color: '#F8BBD0',
        ordersCompleted: 32,
        experience: 5,
        skills: ['Residential', 'Commercial', 'Wallpaper', 'Texture'],
        bio: "I'm a dedicated painter with 5 years of experience in both residential and commercial painting. I pride myself on clean lines and perfect finishes.",
        reviews: [
          {
            id: 1,
            name: 'Nathan',
            date: '08/01/2024',
            rating: 5,
            comment: 'Ethan was punctual, professional, and did an excellent job painting our kitchen cabinets.',
            avatar: 'N',
          },
        ],
      },
    ],
    Cleaner: [
      {
        id: 7,
        name: 'Harper',
        profession: 'Cleaner',
        rating: 4.9,
        color: '#B2DFDB',
        ordersCompleted: 78,
        experience: 4,
        skills: ['Deep Clean', 'Regular Clean', 'Move-in/out', 'Office'],
        bio: "I'm Harper, a professional cleaner with 4 years of experience. I offer thorough cleaning services for homes and offices, ensuring every corner shines.",
        reviews: [
          {
            id: 1,
            name: 'Sarah',
            date: '22/01/2024',
            rating: 5,
            comment: 'Harper is amazing! My house has never been so clean. Attention to detail is incredible.',
            avatar: 'S',
          },
        ],
      },
      {
        id: 8,
        name: 'Caleb',
        profession: 'Cleaner',
        rating: 4.6,
        color: '#D7CCC8',
        ordersCompleted: 52,
        experience: 3,
        skills: ['Residential', 'Commercial', 'Carpet', 'Windows'],
        bio: "Professional cleaner specializing in residential and commercial spaces. I use eco-friendly products and deliver spotless results.",
        reviews: [
          {
            id: 1,
            name: 'Emma',
            date: '17/01/2024',
            rating: 4,
            comment: 'Caleb did a great job cleaning our office space. Very thorough and professional.',
            avatar: 'E',
          },
        ],
      },
    ],
    Carpenter: [
      {
        id: 9,
        name: 'William',
        profession: 'Carpenter',
        rating: 4.7,
        color: '#FFECB3',
        ordersCompleted: 48,
        experience: 8,
        skills: ['Furniture', 'Cabinets', 'Framing', 'Repairs'],
        bio: "I'm William, a skilled carpenter with 8 years of experience. I specialize in custom furniture, cabinets, and woodworking projects of all sizes.",
        reviews: [
          {
            id: 1,
            name: 'Michael',
            date: '14/01/2024',
            rating: 5,
            comment: 'William built beautiful custom shelves for our living room. Exceptional craftsmanship and attention to detail.',
            avatar: 'M',
          },
        ],
      },
      {
        id: 10,
        name: 'Sophie',
        profession: 'Carpenter',
        rating: 4.8,
        color: '#CFD8DC',
        ordersCompleted: 61,
        experience: 6,
        skills: ['Custom Work', 'Restoration', 'Decks', 'Stairs'],
        bio: "Expert carpenter with 6 years of experience in custom woodworking and furniture restoration. I bring creativity and precision to every project.",
        reviews: [
          {
            id: 1,
            name: 'James',
            date: '09/01/2024',
            rating: 5,
            comment: 'Sophie restored our antique dining table beautifully. Her work is exceptional and highly professional.',
            avatar: 'J',
          },
        ],
      },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState('Electrician');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntIcons name="arrowleft" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Services Providers</Text>
      </View>

      {/* Category Bubbles */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScrollView}
        contentContainerStyle={styles.categoriesContainer}>
        {providerCategories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryBubble,
              selectedCategory === category.name &&
                styles.selectedCategoryBubble,
            ]}
            onPress={() => setSelectedCategory(category.name)}>
            <FontAwesome
              name={category.icon}
              size={20}
              color={selectedCategory === category.name ? '#FFFFFF' : '#4CAF50'}
              style={styles.categoryIcon}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.name &&
                  styles.selectedCategoryText,
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Selected Category Providers Section */}
      <ScrollView style={styles.providersScrollView}>
        <View style={styles.providerSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleContainer}>
              <FontAwesome
                name={
                  providerCategories.find(cat => cat.name === selectedCategory)
                    ?.icon || 'user'
                }
                size={18}
                color="#4CAF50"
              />
              <Text style={styles.sectionTitle}>
                {selectedCategory} Providers
              </Text>
            </View>
          </View>

          <View style={styles.providersGrid}>
            {providers[selectedCategory]?.map(provider => (
              <TouchableOpacity
                key={provider.id}
                style={styles.providerCard}
                onPress={() => navigation.navigate('ServiceProviderBookDetails', { provider })}>
                <View
                  style={[
                    styles.providerImageContainer,
                    {backgroundColor: provider.color},
                  ]}>
                  {/* Replace with actual image if available */}
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                      {provider.name.charAt(0)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerProfession}>
                  {provider.profession}
                </Text>
                <View style={styles.ratingRow}>
                  <View style={styles.ratingContainer}>
                    <AntIcons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{provider.rating}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.contactButton}
                    onPress={() => navigation.navigate('ServiceProviderBookDetails', { provider })}>
                    <Text style={styles.contactButtonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
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
  categoriesScrollView: {
    maxHeight: 60,
    flexGrow: 0,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  categoryBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCategoryBubble: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  providersScrollView: {
    flex: 1,
  },
  providerSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  viewAllText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  providersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  providerCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  providerImageContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  providerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
    marginHorizontal: 10,
  },
  providerProfession: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
  },
  contactButton: {
    backgroundColor: '#4CAF50',
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

export default ServiceProvidersScreen;