
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import ProfileScreen from './screens/ProfileScreen';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

// Компоненты иконок
const HomeIcon = ({color}: {color: string}) => (
  <Text style={[styles.iconText, {color}]}>🏠</Text>
);

const SearchIcon = ({color}: {color: string}) => (
  <Text style={[styles.iconText, {color}]}>🔍</Text>
);

const QRCodeIcon = ({color}: {color: string}) => (
  <Text style={[styles.iconText, {color}]}>📷</Text>
);

const ProfileIcon = ({color}: {color: string}) => (
  <Text style={[styles.iconText, {color}]}>👤</Text>
);



// Функции для tabBarIcon
const homeIcon = ({color}: {color: string}) => <HomeIcon color={color} />;
const searchIcon = ({color}: {color: string}) => <SearchIcon color={color} />;
const qrCodeIcon = ({color}: {color: string}) => <QRCodeIcon color={color} />;
const profileIcon = ({color}: {color: string}) => <ProfileIcon color={color} />;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconText: {
    fontSize: 24,
  },
});

export default function TabNavigator() {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top,
          paddingBottom: bottom,
        },
      ]}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            height: 60,
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#666666',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: homeIcon,
          }}
        />

        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: searchIcon,
          }}
        />

        <Tab.Screen
          name="QRCode"
          component={QRCodeScreen}
          options={{
            tabBarLabel: 'QR Code',
            tabBarIcon: qrCodeIcon,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: profileIcon,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
