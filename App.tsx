import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ToastProvider } from './src/components/Toast/ToastProvider';
import './src/locales/i18n'; 

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
      <ToastProvider />
    </>
  );
}