import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>More</Text>
      <Text style={styles.subheading}>Quick links and event info.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Settings</Text>
        <Text style={styles.cardText}>Notifications, preferences, help.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Support</Text>
        <Text style={styles.cardText}>Get onsite help and FAQs.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>About Pulse</Text>
        <Text style={styles.cardText}>Conference schedule, venue map, and more.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 56
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary
  },
  subheading: {
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 16
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  cardTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 6
  },
  cardText: {
    color: colors.textSecondary
  }
});
