import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import MapScreen from './screens/MapScreen';
import TrendsScreen from './screens/TrendsScreen';
import DecisionScreen from './screens/DecisionScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1976D2" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Dashboard') iconName = focused ? 'analytics' : 'analytics-outline';
            else if (route.name === 'Map') iconName = focused ? 'map' : 'map-outline';
            else if (route.name === 'Trends') iconName = focused ? 'trending-up' : 'trending-up-outline';
            else if (route.name === 'Decision') iconName = focused ? 'bulb' : 'bulb-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1976D2',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#1976D2' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'DWLR Monitor' }} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Real-time Data' }} />
        <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Station Map' }} />
        <Tab.Screen name="Trends" component={TrendsScreen} options={{ title: 'Trends Analysis' }} />
        <Tab.Screen name="Decision" component={DecisionScreen} options={{ title: 'Decision Support' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
