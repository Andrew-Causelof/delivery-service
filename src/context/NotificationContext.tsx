import { createContext, useContext, type ReactNode } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Подключаем стили

const notyf = new Notyf();

const NotificationContext = createContext(notyf);

export const useNotification = () => useContext(NotificationContext);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  return <NotificationContext.Provider value={notyf}>{children}</NotificationContext.Provider>;
};
