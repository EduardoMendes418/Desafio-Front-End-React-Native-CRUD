
import { create } from "zustand";
import { User, UserFormData } from "../types/user";
import { mockUsers } from "../data/mockUsers";


interface UserState {
  users: User[];
  filteredUsers: User[];
  searchTerm: string;
  language: string;
  selectedUser: User | null;
  isLoading: boolean;
  

  loadUsers: () => void;
  setSearchTerm: (term: string) => void;
  createUser: (userData: UserFormData) => void;
  updateUser: (id: number, userData: UserFormData) => void;
  deleteUser: (id: number) => void;
  resetToMockData: () => void;
  setLanguage: (lang: string) => void;
  setSelectedUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
}


export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  filteredUsers: [],
  searchTerm: "",
  language: "pt",
  selectedUser: null,
  isLoading: false,

  loadUsers: () => {
    set({ isLoading: true });
    
    setTimeout(() => {
      const state = get();
      if (state.users.length === 0) {
        set({ users: mockUsers, filteredUsers: mockUsers, isLoading: false });
      } else {
        set({ filteredUsers: state.users, isLoading: false });
      }
    }, 1000);
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
    const state = get();
    
    if (!term.trim()) {
      set({ filteredUsers: state.users });
      return;
    }

    const filtered = state.users.filter(
      (user: User) =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase()) ||
        user.phone.includes(term) ||
        user.website.toLowerCase().includes(term.toLowerCase())
    );

    set({ filteredUsers: filtered });
  },

  createUser: (userData: UserFormData) => {
    const state = get();
    const newUser: User = {
      ...userData,
      id: Math.max(...state.users.map((u: User) => u.id), 0) + 1,
    };

    const updatedUsers = [...state.users, newUser];
    set({
      users: updatedUsers,
      filteredUsers: updatedUsers,
    });
  },

  updateUser: (id: number, userData: UserFormData) => {
    const state = get();
    const updatedUsers = state.users.map((user: User) =>
      user.id === id ? { ...userData, id } : user
    );

    set({
      users: updatedUsers,
      filteredUsers: updatedUsers,
    });
  },

  deleteUser: (id: number) => {
    const state = get();
    const updatedUsers = state.users.filter((user: User) => user.id !== id);

    set({
      users: updatedUsers,
      filteredUsers: updatedUsers,
    });
  },

  resetToMockData: () => {
    set({
      users: mockUsers,
      filteredUsers: mockUsers,
      searchTerm: "",
    });
  },

  setLanguage: (lang: string) => {
    set({ language: lang });
  },

  setSelectedUser: (user: User | null) => {
    set({ selectedUser: user });
  },

  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));