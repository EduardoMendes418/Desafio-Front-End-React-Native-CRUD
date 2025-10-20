import React, { useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Header } from "../components/header/Header";
import { UserList } from "../components/list/UserList";
import { SearchBar } from "../components/search/SearchBar";
import { StatsCards } from "../components/cards/StatsCards";
import { useUserStore } from "../stores/userStore";
import { useTranslation } from "react-i18next";
import { theme } from "../styles/theme";

const HomeScreen: React.FC = ({ navigation }: any) => {
  const { t, i18n } = useTranslation() as ReturnType<typeof useTranslation>;
  const {
    users,
    filteredUsers,
    loadUsers,
    deleteUser,
    setSelectedUser,
    isLoading,
  } = useUserStore();

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    navigation.navigate("UserForm", { user });
  };

  const handleViewUser = (user: any) => {
    navigation.navigate("UserDetail", { user });
  };

  const handleDeleteUser = (id: number) => {
    Alert.alert(
      String(t("deleteConfirm")), 
      String(t("deleteConfirmMessage")), 
      [
        { text: String(t("cancel")), style: "cancel" }, 
        {
          text: String(t("delete")), 
          style: "destructive",
          onPress: () => deleteUser(id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <StatsCards users={users} />

      <SearchBar />

      <UserList
        users={filteredUsers}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onViewUser={handleViewUser}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default HomeScreen;
