import React, { createContext, useState, useContext } from "react";
const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, password, role) => {
    // In a real app, this would validate credentials with a backend API
    // Simulating a successful login for demo purposes
    if (email && password) {
      const newUser = {
        id: "123456",
        name: email.split("@")[0],
        email,
        role,
        studentId: role === "student" ? "ST12345" : undefined,
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
