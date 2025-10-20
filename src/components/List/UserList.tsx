import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../types/user';
import { UserCard } from '../../components/Cards/UserCard';
import { useTranslation } from 'react-i18next';
import { theme } from '../../styles/theme';

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
  onViewUser?: (user: User) => void;
  isLoading?: boolean;
}

export const UserList: React.FC<UserListProps> = ({ 
  users, 
  onEditUser, 
  onDeleteUser, 
  onViewUser,
  isLoading = false 
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>{t('loadingUsers')}</Text>
        <Text style={styles.loadingSubtext}>{t('pleaseWait')}</Text>
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Ionicons name="people" size={48} color={theme.colors.textSecondary} />
        </View>
        <Text style={styles.emptyTitle}>{t('noUsersFound')}</Text>
        <Text style={styles.emptyText}>
          {t('startAdding')}
        </Text>
        <View style={styles.emptyDivider} />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <UserCard
          user={item}
          onEdit={onEditUser}
          onDelete={onDeleteUser}
          onPress={onViewUser}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  loadingSubtext: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  emptyDivider: {
    width: 80,
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
});