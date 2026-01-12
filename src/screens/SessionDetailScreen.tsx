import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { sessions } from '../data/schedule';
import { ScheduleStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type RouteProps = RouteProp<ScheduleStackParamList, 'SessionDetail'>;

export default function SessionDetailScreen() {
  const route = useRoute<RouteProps>();
  const session = sessions.find((item) => item.id === route.params.sessionId);

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Session not found</Text>
        <Text style={styles.text}>Please head back and try another session.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.meta}>
        {session.day} · {session.start} - {session.end} · {session.room}
      </Text>
      <Text style={styles.badge}>{session.track}</Text>
      <Text style={styles.sectionTitle}>Speakers</Text>
      <Text style={styles.text}>{session.speakers.join(', ')}</Text>
      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.text}>{session.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8
  },
  meta: {
    color: colors.textSecondary,
    marginBottom: 12
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.accentSoft,
    fontWeight: '600',
    marginBottom: 20
  },
  sectionTitle: {
    color: colors.accentSoft,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 6
  },
  text: {
    color: colors.textSecondary,
    lineHeight: 20
  }
});
