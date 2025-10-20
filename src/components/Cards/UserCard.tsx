import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { User } from "../../types/user";
import { theme } from "../../styles/theme";
import { LinearGradient } from "expo-linear-gradient";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onPress?: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  onPress,
}) => {
  const handleWebsitePress = () => {
    Linking.openURL(`http://${user.website}`);
  };

  const handleCardPress = () => {
    if (onPress) {
      onPress(user);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <LinearGradient colors={["#8b5cf6", "#3b82f6"]} style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </LinearGradient>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.id}>ID: {user.id}</Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.textSecondary}
        />
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="mail" size={16} color={theme.colors.primary} />
          <Text style={styles.detailText}>{user.email}</Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="call" size={16} color={theme.colors.success} />
          <Text style={styles.detailText}>{user.phone}</Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="globe" size={16} color={theme.colors.secondary} />
          <TouchableOpacity onPress={handleWebsitePress}>
            <Text style={[styles.detailText, styles.website]}>
              {user.website}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => onEdit(user)}
          style={{ flex: 1, marginRight: 8 }}
        >
          <LinearGradient
            colors={["#3b82f6", "#06b6d4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Ionicons name="create" size={16} color="#FFFFFF" />
            <Text style={styles.buttonText}>Editar</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(user.id)}
          style={{ flex: 1, marginLeft: 8 }}
        >
          <LinearGradient
            colors={["#ef4444", "#ec4899"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Ionicons name="trash" size={16} color="#FFFFFF" />
            <Text style={styles.buttonText}>Excluir</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  id: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  details: {
    marginBottom: theme.spacing.md,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  detailText: {
    marginLeft: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: 14,
  },
  website: {
    color: theme.colors.primary,
    textDecorationLine: "underline",
  },
  actions: {
    flexDirection: "row",
    marginTop: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});
