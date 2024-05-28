import { ReactNode, createContext, useContext, useState } from "react";

// Define the type for the context value
type AuthContextType = {
    user: any; // Replace 'any' with the actual type if available
    setUser: React.Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<any>>;
};

// Create the context with initial values
const AuthContext = createContext<AuthContextType>({
    user: false,
    setUser: () => {},
    isLoading: false,
    setIsLoading: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
export default AuthProvider;
