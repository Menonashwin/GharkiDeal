import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const OnboardScreen = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const SelectionCard = ({title, description, onPress, isSelected}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, isSelected && styles.selectedCard]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>I am</Text>

        <SelectionCard
          title="Service Provider"
          description="I offer professional services."
          onPress={() => setSelectedOption('provider')}
          isSelected={selectedOption === 'provider'}
        />

        <SelectionCard
          title="Looking For Service"
          description="I am looking for home services."
          onPress={() => setSelectedOption('seeker')}
          isSelected={selectedOption === 'seeker'}
        />

        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedOption && styles.nextButtonDisabled,
          ]}
          disabled={!selectedOption}
          onPress={() => {
            if (selectedOption === 'provider') {
              navigation.navigate('PhoneVerification');
            } else if (selectedOption === 'seeker') {
              navigation.navigate('UserVerification');
            }
          }}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  heading: {
    fontSize: 52,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000000',
  },
  card: {
    padding: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    borderColor: '#00C853',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
  },
  nextButton: {
    backgroundColor: '#00C853',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardScreen;
