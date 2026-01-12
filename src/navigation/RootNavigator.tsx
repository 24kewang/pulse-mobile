import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';

import AuthScreen from '../screens/AuthScreen';
import MoreScreen from '../screens/MoreScreen';
import ScanScreen from '../screens/ScanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import SessionDetailScreen from '../screens/SessionDetailScreen';
import { colors } from '../theme/colors';
import { RootStackParamList, RootTabParamList, ScheduleStackParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const ScheduleStack = createNativeStackNavigator<ScheduleStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function ScheduleStackNavigator() {
  return (
    <ScheduleStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: '700' }
      }}
    >
      <ScheduleStack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Text
              onPress={() => navigation.navigate('Profile')}
              style={{ fontSize: 18, color: colors.accentSoft }}
              accessibilityRole="button"
            >
              👤
            </Text>
          )
        })}
      />
      <ScheduleStack.Screen
        name="SessionDetail"
        component={SessionDetailScreen}
        options={{ title: 'Session Detail' }}
      />
      <ScheduleStack.Screen name="Profile" component={ProfileScreen} />
    </ScheduleStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.backgroundElevated, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary
      }}
    >
      <Tab.Screen
        name="ScheduleTab"
        component={ScheduleStackNavigator}
        options={{
          title: 'Schedule',
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🗓️</Text>
        }}
      />
      <Tab.Screen
        name="ScanTab"
        component={ScanScreen}
        options={{
          title: 'Scan',
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color }) => <Text style={{ color }}>📷</Text>
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreScreen}
        options={{
          title: 'More',
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => <Text style={{ color }}>⋯</Text>
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Auth">
        {({ navigation }) => <AuthScreen onContinue={() => navigation.replace('Main')} />}
      </RootStack.Screen>
      <RootStack.Screen name="Main" component={TabNavigator} />
    </RootStack.Navigator>
  );
}
