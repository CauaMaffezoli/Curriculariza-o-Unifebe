import React, {createContext, useContext, useState} from 'react';

interface User {
  name: string;
  age: string;
  email: string;
  lifePhase: string;
}

interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  reminders: Reminder[];
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  addReminder: (reminder: Reminder) => void;
  deleteReminder: (id: string) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const addReminder = (reminder: Reminder) => {
    setReminders(prev => [...prev, reminder]);
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        reminders,
        login,
        logout,
        updateUser,
        addReminder,
        deleteReminder,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
