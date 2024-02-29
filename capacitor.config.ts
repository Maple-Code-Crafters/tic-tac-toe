import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tic-tac-toe',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
