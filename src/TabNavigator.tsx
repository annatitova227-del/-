// src/TabNavigator.tsx
import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserProfileScreen from './UserProfileScreen'; // Просто импортируем, но не добавляем в навигацию

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
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
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: 24, color }}>🏠</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: 24, color }}>🔍</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="QRCode"
                component={QRCodeScreen}
                options={{
                    tabBarLabel: 'QR Code',
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: 24, color }}>📷</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: 24, color }}>👤</Text>
                    ),
                }}
            />
            {/* UserProfileScreen просто импортирован в файле, но НЕ добавлен в навигацию */}
        </Tab.Navigator>
    );
}