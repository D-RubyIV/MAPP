import { ReactNode, createContext, useContext, useState } from "react";

type AppContextType = {
    isDarkMode: boolean,
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    effLoadingBag: boolean;
    setEffLoadingBag: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({
    isDarkMode: false,
    setIsDarkMode: () => { },
    isLoading: false,
    setIsLoading: () => { },
    effLoadingBag: false,
    setEffLoadingBag: () => { },
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [effLoadingBag, setEffLoadingBag] = useState(false);

    return (
        <AppContext.Provider value={{ isDarkMode, setIsDarkMode, isLoading, setIsLoading, effLoadingBag, setEffLoadingBag }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AuthProvider;
