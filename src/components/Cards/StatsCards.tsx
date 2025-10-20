import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";
import { User } from "../../types/user";
import { theme } from "../../styles/theme";
import { LinearGradient } from "expo-linear-gradient";

interface StatsCardsProps {
  users: User[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ users }) => {
  const { t } = useTranslation();

  const stats = {
    total: users.length,
    active: users.length,
    withEmail: users.filter((u) => u.email).length,
    withWebsite: users.filter((u) => u.website).length,
  };

  const cards = [
    {
      iconName: "users",
      label: t("totalUsers"),
      value: stats.total,
      gradient: ["#3b82f6", "#06b6d4"],
    },
    {
      iconName: "user-check",
      label: t("activeUsers"),
      value: stats.active,
      gradient: ["#10b981", "#059669"],
    },
    {
      iconName: "envelope",
      label: t("withEmail"),
      value: stats.withEmail,
      gradient: ["#8b5cf6", "#ec4899"],
    },
    {
      iconName: "globe",
      label: t("withWebsite"),
      value: stats.withWebsite,
      gradient: ["#f97316", "#ef4444"],
    },
  ];

  return (
    <View style={styles.gridContainer}>
      {cards.map((card, index) => (
        <View key={index} style={styles.gridCard}>
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text style={styles.label}>{card.label}</Text>
              <Text style={styles.value}>{card.value}</Text>
            </View>
            <LinearGradient
              colors={card.gradient}
              style={styles.iconContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <FontAwesome5 name={card.iconName} size={20} color="#fff" />
            </LinearGradient>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: theme.spacing.md,
  },
  gridCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
