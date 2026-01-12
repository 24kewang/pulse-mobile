export default ({ config }) => ({
  ...config,
  name: 'Pulse',
  slug: 'pulse-mobile',
  scheme: 'pulse',
  version: '0.1.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {},
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000'
  }
});
