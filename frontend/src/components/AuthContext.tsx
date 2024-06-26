import { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  name: string;
  setName: (name: string) => void;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  //const [token, setToken] = useState(localStorage.getItem("token") || "");

  const updateName = (newName: string) => {
    setName(newName);
    localStorage.setItem("name", newName);
  };

  const updateToken = (newToken: string) => {
    //setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  return (
    <AuthContext.Provider value={{ name, setName: updateName, setToken: updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
