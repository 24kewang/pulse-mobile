import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.subheading}>Attendee details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>Yash Jagtap</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>yash@pulseconf.com</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Points</Text>
        <Text style={styles.value}>245</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 24
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
  label: {
    color: colors.textSecondary,
    marginBottom: 6
  },
  value: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700'
  }
});
