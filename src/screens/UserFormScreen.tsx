import React from 'react';
import { UserForm } from '../components/UserForm';
import { useUserStore } from '../stores/userStore';

interface UserFormScreenProps {
  route: any;
  navigation: any;
}

const UserFormScreen: React.FC<UserFormScreenProps> = ({ route, navigation }) => {
  const { setSelectedUser } = useUserStore();
  const user = route.params?.user;

  const handleCancel = () => {
    setSelectedUser(null);
    navigation.goBack();
  };

  const handleSubmit = () => {
    setSelectedUser(null);
    navigation.goBack();
  };

  return (
    <UserForm
      user={user}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};

export default UserFormScreen;