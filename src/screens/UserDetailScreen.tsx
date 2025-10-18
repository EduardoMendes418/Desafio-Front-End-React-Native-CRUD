// screens/UserDetailScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../stores/userStore';
import { theme } from '../styles/theme';

interface UserDetailScreenProps {
  route: any;
  navigation: any;
}

const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route, navigation }) => {
  const { t, i18n } = useTranslation() as ReturnType<typeof useTranslation>;
  const { deleteUser } = useUserStore();
  const { user } = route.params;

  const handleEdit = () => {
    navigation.navigate('UserForm', { user });
  };

  const handleDelete = () => {
    Alert.alert(
      t('deleteConfirm'),
      t('deleteConfirmMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('delete'), 
          style: 'destructive',
          onPress: () => {
            deleteUser(user.id);
            navigation.goBack();
          }
        },
      ]
    );
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${user.email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${user.phone}`);
  };

  const handleWebsitePress = () => {
    Linking.openURL(`http://${user.website}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.id}>ID: {user.id}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('contactInfo')}</Text>
          
          <TouchableOpacity style={styles.detailItem} onPress={handleEmailPress}>
            <Ionicons name="mail" size={24} color={theme.colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{user.email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.detailItem} onPress={handlePhonePress}>
            <Ionicons name="call" size={24} color={theme.colors.success} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Telefone</Text>
              <Text style={styles.detailValue}>{user.phone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.detailItem} onPress={handleWebsitePress}>
            <Ionicons name="globe" size={24} color={theme.colors.secondary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Website</Text>
              <Text style={styles.detailValue}>{user.website}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={handleEdit}>
          <Ionicons name="create" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>{t('edit')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
          <Ionicons name="trash" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>{t('delete')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.card,
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  id: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  details: {
    padding: theme.spacing.md,
  },
  section: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  detailContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  detailLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserDetailScreen;