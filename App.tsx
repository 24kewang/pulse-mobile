import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.card,
    text: colors.textPrimary,
    primary: colors.accent,
    border: colors.border
  }
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="light" />
      <RootNavigator />
    </NavigationContainer>
  );
}
