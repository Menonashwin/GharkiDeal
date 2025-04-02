import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Icons from 'react-native-vector-icons/MaterialIcons';

const BookingDateScreen = ({route, navigation}) => {
  const {provider} = route.params || {name: 'Plumber'};

  // Get current date in YYYY-MM-DD format
  const today = new Date();
  const currentDateString = today.toISOString().split('T')[0];

  // State for selected date and time
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const timeSlots = [
    {period: 'AM', slots: ['09:00', '10:00', '11:00', '12:30']},
    {
      period: 'PM',
      slots: [
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
      ],
    },
  ];

  // Validate form whenever selections change
  useEffect(() => {
    setIsFormValid(selectedDate !== '' && selectedTime !== '');
  }, [selectedDate, selectedTime]);

  // Handle date selection from calendar
  const handleDateSelect = day => {
    setSelectedDate(day.dateString);
  };

  // Handle time selection
  const handleTimeSelect = time => {
    setSelectedTime(time);
  };

  // Format selected date for display
  const getFormattedDate = () => {
    if (!selectedDate) return '';

    const date = new Date(selectedDate);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleNextPress = () => {
    if (isFormValid) {
      const bookingDetails = {
        provider,
        date: getFormattedDate(),
        time: selectedTime,
      };
      navigation.navigate('BookingConfirmation', {bookingDetails});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plumber booking</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <Calendar
            current={currentDateString}
            minDate={currentDateString}
            maxDate={
              new Date(
                today.getFullYear() + 1,
                today.getMonth(),
                today.getDate(),
              )
                .toISOString()
                .split('T')[0]
            }
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: {selected: true, selectedColor: '#00C853'},
            }}
            monthFormat={'MMMM yyyy'}
            hideExtraDays={false}
            showWeekNumbers={false}
            enableSwipeMonths={true}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#999',
              selectedDayBackgroundColor: '#00C853',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00C853',
              dayTextColor: '#333',
              textDisabledColor: '#d9e1e8',
              arrowColor: '#00C853',
              monthTextColor: '#333',
              indicatorColor: '#00C853',
              textDayFontWeight: '400',
              textMonthFontWeight: '500',
              textDayHeaderFontWeight: '400',
              textDayFontSize: 14,
              textMonthFontSize: 14,
              textDayHeaderFontSize: 12,
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Hours</Text>

          {timeSlots.map(group => (
            <View key={group.period} style={styles.timeSection}>
              <Text style={styles.timeSectionHeader}>{group.period}</Text>
              <View style={styles.timeSlotContainer}>
                {group.slots.map(time => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.selectedTimeSlot,
                    ]}
                    onPress={() => handleTimeSelect(time)}>
                    <Text
                      style={[
                        styles.timeSlotText,
                        selectedTime === time && styles.selectedTimeSlotText,
                      ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.nextButton, !isFormValid && styles.nextButtonDisabled]}
        onPress={handleNextPress}
        disabled={!isFormValid}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#00C853',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  timeSection: {
    marginBottom: 16,
  },
  timeSectionHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
    marginBottom: 8,
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTimeSlot: {
    backgroundColor: '#00C853',
  },
  selectedTimeSlotText: {
    color: '#FFF',
  },
  nextButton: {
    backgroundColor: '#00C853',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BookingDateScreen;
