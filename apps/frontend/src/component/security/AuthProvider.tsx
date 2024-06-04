import { ReactNode, createContext, useContext, useState } from "react";


type ME = {
    id: number,
    email: string, 
    phone: string,
    role: "User"| "Admin" |"Moderator",
    provider: string,
    image: string,
    enabled: boolean,
    username: string
}

// Define the type for the context value
type AuthContextType = {
    me: any; // Replace 'any' with the actual type if available
    setMe: React.Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<any>>;
};

// Create the context with initial values
const AuthContext = createContext<AuthContextType>({
    me: false,
    setMe: () => {},
    isLoading: false,
    setIsLoading: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [me, setMe] = useState<ME>()
    const [isLoading, setIsLoading] = useState(true)

    return (
        <AuthContext.Provider value={{ me, setMe, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
export default AuthProvider;
