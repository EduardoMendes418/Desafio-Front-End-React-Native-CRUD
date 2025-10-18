import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../types/user';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';

interface StatsCardsProps {
  users: User[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ users }) => {
  const { t } = useTranslation();

  const stats = {
    total: users.length,
    active: users.length, 
    withEmail: users.filter(u => u.email).length,
    withWebsite: users.filter(u => u.website).length,
  };

  const cards = [
    {
      icon: 'people' as const,
      label: t('totalUsers'),
      value: stats.total,
      color: '#2563eb',
    },
    {
      icon: 'person-check' as const, 
      label: t('activeUsers'),
      value: stats.active,
      color: '#10b981',
    },
    {
      icon: 'mail' as const,
      label: t('withEmail'),
      value: stats.withEmail,
      color: '#8b5cf6',
    },
    {
      icon: 'globe' as const,
      label: t('withWebsite'),
      value: stats.withWebsite,
      color: '#f59e0b',
    },
  ];

  return (
    <View style={styles.gridContainer}>
      <View style={styles.gridRow}>
        {cards.slice(0, 2).map((card, index) => (
          <View key={index} style={styles.gridCard}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.value}>{card.value}</Text>
                <Text style={styles.label}>{card.label}</Text>
              </View>
              <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
                <Ionicons name={card.icon} size={20} color="#FFFFFF" />
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.gridRow}>
        {cards.slice(2, 4).map((card, index) => (
          <View key={index + 2} style={styles.gridCard}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.value}>{card.value}</Text>
                <Text style={styles.label}>{card.label}</Text>
              </View>
              <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
                <Ionicons name={card.icon} size={20} color="#FFFFFF" />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    backgroundColor: '#f8fafc',
    padding: theme.spacing.md,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: theme.spacing.lg,
    flex: 1,
    marginHorizontal: theme.spacing.sm,
    height: 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});