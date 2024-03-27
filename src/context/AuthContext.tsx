import React, { createContext, useState, ReactNode } from "react";
import { mergeStorage, removeStoragePropFromObject, getToken } from '../utils/Utils.ts';

interface AuthContextType {
    login: () => Promise<void>;
    logout: () => Promise<void>;
    userToken: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [userToken, setUserToken] = useState<string | null>(null);

    const login = async () => {
        const token = await getToken('configuration');
        setUserToken(token.encodetoken);
    }

    const logout = async () => {
        await removeStoragePropFromObject('configuration', 'encodetoken');
        setUserToken(null);
    }

    return (
        <AuthContext.Provider value={{ login, logout, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}
