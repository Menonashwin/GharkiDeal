import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardScreen from './src/Screens/ServiceProvider/OnboardScreen';
import PhoneVerificationScreen from './src/Screens/ServiceProvider/PhoneVerificationScreen';
import OTPVerificationScreen from './src/Screens/ServiceProvider/OtpVerificationScreen';
import ServiceProviderDetails from './src/Screens/ServiceProvider/ServiceProviderDetails';
import ServiceOfferScreen from './src/Screens/ServiceProvider/ServiceOfferScreen';
import UserVerification from './src/Screens/User/UserVerification';
import UserOtpScreen from './src/Screens/User/UserOtpScreen';
import UserDetails from './src/Screens/User/UserDetails';
import UserProfile from './src/Screens/User/userProfile';
import EditProfile from './src/Screens/User/EditProfile';
import UserHomeScreen from './src/Screens/User/UserHomeScreen';
import NotificationSettings from './src/Screens/User/NotificationSettings';
import AddBankDetails from './src/Screens/User/AddBankDetails';
import LogoutConfirmation from './src/Screens/User/LogoutConfirmation';
import PopularServicesScreen from './src/Screens/User/PopularService';
import ServiceProvidersScreen from './src/Screens/User/ServiceProviderList';
import ServiceProviderDetailsScreen from './src/Screens/User/ServiceProviderDetails';
import ServiceProviderBookingScreen from './src/Screens/User/BookingAddress';
import BookingDateScreen from './src/Screens/User/BookingDate';
import ScheduledOrdersScreen from './src/Screens/orders/ScheduledOrder';
import SplashScreen from './src/Screens/SplashScreen';
import AddressScreen from './src/Screens/User/AddBankDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name='Splash'
        component={SplashScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
          name="Onboard"
          component={OnboardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PhoneVerification"
          component={PhoneVerificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OTPInput"
          component={OTPVerificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ServiceProviderDetails"
          component={ServiceProviderDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ServiceOffer"
          component={ServiceOfferScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="UserVerification"
          component={UserVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserOtp"
          component={UserOtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserHome"
          component={UserHomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationSettings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={AddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
        name='AddAddress'
        component={AddressScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
          name="LogoutConfirmation"
          component={LogoutConfirmation}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PopularService"
          component={PopularServicesScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ServiceProviderList"
          component={ServiceProvidersScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ServiceProviderBookDetails"
          component={ServiceProviderDetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookingAddress"
          component={ServiceProviderBookingScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BookingDate"
          component={BookingDateScreen}
          options={{headerShown: false}}
        />
      
        <Stack.Screen
        name="ScheduledOrder"
        component={ScheduledOrdersScreen}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
