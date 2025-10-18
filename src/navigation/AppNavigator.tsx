// src/navigation/AppNavigator.tsx - CORRIGIDO
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import UserFormScreen from '../screens/UserFormScreen';
import UserDetailScreen from '../screens/UserDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  UserForm: { user?: any };
  UserDetail: { user: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3B82F6',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'UserManager',
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="UserForm" 
          component={UserFormScreen}
          options={{ title: 'Novo Usuário' }}
        />
        <Stack.Screen 
          name="UserDetail" 
          component={UserDetailScreen}
          options={{ title: 'Detalhes do Usuário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};