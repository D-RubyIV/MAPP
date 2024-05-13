import { ReactNode, createContext, useContext, useState } from "react";

// Define the type for the context value
type AuthContextType = {
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    roles: any; // Replace 'any' with the actual type if available
    setRoles: React.Dispatch<React.SetStateAction<any>>;
    me: any; // Replace 'any' with the actual type if available
    setMe: React.Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<any>>;
};

// Create the context with initial values
const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    setAuthenticated: () => {},
    roles: null,
    setRoles: () => {},
    me: null,
    setMe: () => {},
    isLoading: true,
    setIsLoading: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    // INIT VALUE
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [roles, setRoles] = useState<any>(null)
    const [me, setMe] = useState<any>(null)

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, roles, setRoles, me, setMe, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
