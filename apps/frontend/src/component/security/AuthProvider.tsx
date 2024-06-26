import { ReactNode, createContext, useContext, useState } from "react";

type AuthContextType = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    effLoadingBag: boolean;
    setEffLoadingBag: React.Dispatch<React.SetStateAction<boolean>>;

};

const AuthContext = createContext<AuthContextType>({
    isLoading: false,
    setIsLoading: () => {},
    effLoadingBag: false,
    setEffLoadingBag: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [effLoadingBag, setEffLoadingBag] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoading, setIsLoading, effLoadingBag, setEffLoadingBag }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
