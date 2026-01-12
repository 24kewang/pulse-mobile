import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { sessions } from '../data/schedule';
import { ScheduleStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

const tracks = ['All', 'Hardware', 'Software', 'Speaker', 'Networking'];
const rooms = ['All', 'Hall A', 'Hall B', 'Room 204', 'Room 110'];

type Props = NativeStackScreenProps<ScheduleStackParamList, 'Schedule'>;

export default function ScheduleScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState('All');
  const [roomFilter, setRoomFilter] = useState('All');

  const sections = useMemo(() => {
    const filtered = sessions.filter((session) => {
      const matchesQuery =
        session.title.toLowerCase().includes(query.toLowerCase()) ||
        session.speakers.join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesTrack = trackFilter === 'All' || session.track === trackFilter;
      const matchesRoom = roomFilter === 'All' || session.room === roomFilter;
      return matchesQuery && matchesTrack && matchesRoom;
    });

    const byDay = new Map<string, typeof filtered>();
    filtered.forEach((session) => {
      const list = byDay.get(session.day) || [];
      list.push(session);
      byDay.set(session.day, list);
    });

    return Array.from(byDay.entries()).map(([day, data]) => ({
      title: day,
      data: data.sort((a, b) => a.start.localeCompare(b.start))
    }));
  }, [query, trackFilter, roomFilter]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Schedule</Text>
      <Text style={styles.subheading}>Browse sessions by day and track.</Text>

      <TextInput
        style={styles.search}
        placeholder="Search sessions or speakers"
        placeholderTextColor={colors.textMuted}
        value={query}
        onChangeText={setQuery}
      />

      <View style={styles.filterRow}>
        {tracks.map((track) => (
          <FilterPill
            key={track}
            label={track}
            active={trackFilter === track}
            onPress={() => setTrackFilter(track)}
          />
        ))}
      </View>
      <View style={styles.filterRow}>
        {rooms.map((room) => (
          <FilterPill
            key={room}
            label={room}
            active={roomFilter === room}
            onPress={() => setRoomFilter(room)}
          />
        ))}
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SessionDetail', { sessionId: item.id })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.sessionTime}>
                {item.start} - {item.end}
              </Text>
              <Text style={styles.sessionTrack}>{item.track}</Text>
            </View>
            <Text style={styles.sessionTitle}>{item.title}</Text>
            <Text style={styles.sessionMeta}>
              {item.room} · {item.speakers.join(', ')}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No sessions match yet.</Text>}
      />
    </View>
  );
}

type FilterPillProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

function FilterPill({ label, active, onPress }: FilterPillProps) {
  return (
    <TouchableOpacity
      style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}
      onPress={onPress}
    >
      <Text style={active ? styles.pillTextActive : styles.pillTextInactive}>{label}</Text>
    </TouchableOpacity>
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
  search: {
    backgroundColor: colors.card,
    color: colors.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1
  },
  pillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent
  },
  pillInactive: {
    backgroundColor: 'transparent',
    borderColor: colors.border
  },
  pillTextActive: {
    color: colors.background,
    fontWeight: '600'
  },
  pillTextInactive: {
    color: colors.textSecondary
  },
  listContent: {
    paddingBottom: 120,
    paddingTop: 24
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 12,
    color: colors.accentSoft,
    fontWeight: '700',
    letterSpacing: 0.4
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  sessionTime: {
    color: colors.accentSoft,
    fontWeight: '600'
  },
  sessionTrack: {
    color: colors.textSecondary
  },
  sessionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6
  },
  sessionMeta: {
    color: colors.textSecondary
  },
  empty: {
    color: colors.textMuted,
    paddingTop: 24
  }
});
