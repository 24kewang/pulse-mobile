import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../theme/colors';

type Props = {
  onContinue: () => void;
};

export default function AuthScreen({ onContinue }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={require('../../pulse-logo-image.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Pulse Illuminate</Text>
        <Text style={styles.subtitle}>Lighting the way for attendees.</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={onContinue}>
          <Text style={styles.primaryText}>Continue as guest</Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>Sign in will be added after API hookup.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between'
  },
  hero: {
    alignItems: 'center'
  },
  logo: {
    width: 220,
    height: 180,
    marginBottom: 24
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700'
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 8
  },
  actions: {
    width: '100%'
  },
  primaryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center'
  },
  primaryText: {
    color: colors.background,
    fontWeight: '700',
    fontSize: 16
  },
  helperText: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 14
  }
});
