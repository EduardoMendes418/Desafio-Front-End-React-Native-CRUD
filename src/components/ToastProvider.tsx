
import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { theme } from '../styles/theme';

export const ToastProvider: React.FC = () => {
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: theme.colors.success }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600'
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: theme.colors.error }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600'
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),
  };

  return <Toast config={toastConfig} />;
};