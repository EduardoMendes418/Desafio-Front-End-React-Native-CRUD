import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User, UserFormData } from '../../types/user';
import { useUserStore } from '../../stores/userStore';
import { useTranslation } from 'react-i18next';
import { theme } from '../../styles/theme';

interface UserFormProps {
  user?: User | null;
  onCancel: () => void;
  onSubmit?: () => void;
}

const initialFormData: UserFormData = {
  name: '',
  email: '',
  phone: '',
  website: '',
};

export const UserForm: React.FC<UserFormProps> = ({ user, onCancel, onSubmit }) => {
  const { t, i18n } = useTranslation() as ReturnType<typeof useTranslation>;
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const { createUser, updateUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [user]);

  const handleChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.website) {
      Alert.alert(t('error'), t('userForm.requiredField'));
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (user) {
        updateUser(user.id, formData);
      } else {
        createUser(formData);
      }
      
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      Alert.alert(t('error'), t('toast.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.website;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons 
              name={user ? "create" : "person-add"} 
              size={32} 
              color="#FFFFFF" 
            />
          </View>
          <Text style={styles.title}>
            {user ? t('userForm.editUser') : t('userForm.newUser')}
          </Text>
          <Text style={styles.subtitle}>
            {user ? t('userForm.editUser') : t('userForm.newUser')}
          </Text>
        </View>

        <View style={styles.fields}>
          <View style={styles.field}>
            <Text style={styles.label}>{t('userForm.name')} *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => handleChange('name', value)}
                placeholder={t('userForm.namePlaceholder')}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{t('userForm.email')} *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                placeholder={t('userForm.emailPlaceholder')}
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{t('userForm.phone')} *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(value) => handleChange('phone', value)}
                placeholder={t('userForm.phonePlaceholder')}
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{t('userForm.website')} *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="globe" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.website}
                onChangeText={(value) => handleChange('website', value)}
                placeholder={t('userForm.websitePlaceholder')}
                placeholderTextColor={theme.colors.textSecondary}
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton, (!isFormValid || isLoading) && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Ionicons name="refresh" size={20} color="#FFFFFF" style={styles.loadingIcon} />
                <Text style={styles.buttonText}>
                  {user ? t('userForm.updating') : t('userForm.creating')}
                </Text>
              </View>
            ) : (
              <>
                <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>
                  {user ? t('update') : t('create')}
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Ionicons name="close" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>{t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  form: {
    padding: theme.spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  fields: {
    marginBottom: theme.spacing.xl,
  },
  field: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  actions: {
    gap: theme.spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  submitButton: {
    backgroundColor: theme.colors.success,
  },
  cancelButton: {
    backgroundColor: theme.colors.textSecondary,
  },
  disabledButton: {
    backgroundColor: theme.colors.border,
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingIcon: {
    transform: [{ rotate: '0deg' }],
  },
});