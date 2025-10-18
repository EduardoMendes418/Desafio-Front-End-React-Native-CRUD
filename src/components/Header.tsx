// components/Header.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../stores/userStore";
import { theme } from "../styles/theme";

interface HeaderProps {
  navigation: any;
}

export const Header: React.FC<HeaderProps> = ({ navigation }) => {
  const { t, i18n } = useTranslation() as ReturnType<typeof useTranslation>;
  const { resetToMockData, setLanguage } = useUserStore();

  const handleCreateUser = () => {
    navigation.navigate("UserForm");
  };

  const handleResetData = () => {
    Alert.alert(String(t("resetConfirm")), String(t("resetConfirmMessage")), [
      { text: String(t("cancel")), style: "cancel" },
      {
        text: String(t("confirm")),
        style: "destructive",
        onPress: () => resetToMockData(),
      },
    ]);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <LinearGradient
          colors={["#2563eb", "#4f46e5", "#7c3aed"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.logo}
        >
          <Text style={styles.logoText}>👥</Text>
        </LinearGradient>
        <View>
          <Text style={styles.title}>{String(t("appName"))}</Text>
          <Text style={styles.subtitle}>{String(t("appDescription"))}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() =>
            handleLanguageChange(i18n.language === "pt" ? "en" : "pt")
          }
        >
          <Text style={styles.languageText}>
            {i18n.language === "pt" ? "🇧🇷" : "🇺🇸"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResetData} activeOpacity={0.8}>
          <LinearGradient
            colors={["#f97316", "#ef4444"]}
            style={styles.resetButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.resetButtonIcon}>💾</Text>
            <Text style={styles.resetButtonText}>{String(t("resetData"))}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCreateUser} activeOpacity={0.8}>
          <LinearGradient
            colors={["#2563eb", "#4f46e5", "#7c3aed"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.createButton}
          >
            <Text style={styles.buttonIcon}>✏️</Text>
            <Text style={styles.createButtonText}>{String(t("newUser"))}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(229, 231, 235, 0.6)",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  logo: {
    backgroundColor:
      "linear-gradient(90deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)",
    width: 40,
    height: 40,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  languageButton: {
    padding: theme.spacing.sm,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    minWidth: 40,
    alignItems: "center",
  },
  languageText: {
    fontSize: 16,
    color: "#374151",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    borderRadius: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    gap: theme.spacing.xs,
  },
  resetButtonIcon: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  createButton: {
    backgroundColor: "#2563eb",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 12,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: theme.spacing.xs,
  },
  buttonIcon: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});
