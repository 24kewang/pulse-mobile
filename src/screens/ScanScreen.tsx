import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { colors } from '../theme/colors';

type ScanResult = {
  id: string;
  status: 'success' | 'invalid' | 'duplicate';
  payload: string;
  timestamp: string;
};

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [results, setResults] = useState<ScanResult[]>([]);
  const lastPayloadRef = useRef<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
      setHasPermission(status === 'granted');
    });
  }, []);

  const parsed = useMemo(() => results.slice(0, 5), [results]);

  const handleScan = useCallback(
    ({ data }: { data: string }) => {
      if (!isScanning) {
        return;
      }

      if (lastPayloadRef.current === data) {
        setResults((prev) => [createResult(data, 'duplicate'), ...prev]);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        return;
      }

      lastPayloadRef.current = data;
      setIsScanning(false);

      const { isValid } = validatePayload(data);
      setResults((prev) => [createResult(data, isValid ? 'success' : 'invalid'), ...prev]);
      Haptics.notificationAsync(
        isValid ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error
      );

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        setIsScanning(true);
      }, 1200);
    },
    [isScanning]
  );

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.accent} />
        <Text style={styles.text}>Requesting camera permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Camera access needed</Text>
        <Text style={styles.text}>Enable camera permissions to scan attendee QR codes.</Text>
        <TouchableOpacity
          style={styles.action}
          onPress={() => Alert.alert('Permissions', 'Enable camera access in settings.')}
        >
          <Text style={styles.actionText}>Open settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Scan QR</Text>
      <Text style={styles.subheading}>Point the camera at an attendee badge.</Text>

      <View style={styles.scannerWrap}>
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={handleScan}
        />
        <View style={styles.scanFrame} />
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.status}>{isScanning ? 'Ready to scan' : 'Hold steady...'}</Text>
        <TouchableOpacity style={styles.actionSmall} onPress={() => setIsScanning(true)}>
          <Text style={styles.actionText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.results}>
        <Text style={styles.sectionTitle}>Recent scans</Text>
        {parsed.length === 0 ? (
          <Text style={styles.text}>No scans yet.</Text>
        ) : (
          parsed.map((item) => (
            <View key={item.id} style={styles.resultCard}>
              <Text style={styles.resultMeta}>
                {item.status.toUpperCase()} · {item.timestamp}
              </Text>
              <Text style={styles.resultPayload} numberOfLines={1}>
                {item.payload}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

function validatePayload(payload: string) {
  try {
    if (payload.startsWith('{')) {
      const parsed = JSON.parse(payload);
      return { isValid: Boolean(parsed.attendeeId) };
    }

    if (payload.startsWith('pulse://')) {
      const url = new URL(payload);
      return { isValid: Boolean(url.searchParams.get('attendeeId')) };
    }

    return { isValid: false };
  } catch (error) {
    return { isValid: false };
  }
}

function createResult(payload: string, status: ScanResult['status']): ScanResult {
  return {
    id: `${Date.now()}-${Math.random()}`,
    status,
    payload,
    timestamp: new Date().toLocaleTimeString()
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 24
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 20
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
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8
  },
  text: {
    color: colors.textSecondary,
    marginTop: 8
  },
  scannerWrap: {
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16
  },
  scanFrame: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.accent,
    margin: 26,
    borderRadius: 16
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  status: {
    color: colors.textSecondary
  },
  action: {
    marginTop: 16,
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10
  },
  actionSmall: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  actionText: {
    color: colors.background,
    fontWeight: '700'
  },
  results: {
    flex: 1
  },
  sectionTitle: {
    color: colors.accentSoft,
    fontWeight: '700',
    marginBottom: 8
  },
  resultCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border
  },
  resultMeta: {
    color: colors.accentSoft,
    fontSize: 12,
    marginBottom: 4
  },
  resultPayload: {
    color: colors.textSecondary
  }
});
