import { createContext, useEffect, useState } from "react";
import { AuthService } from "../services";

type AuthConfig = {
  fetched: boolean | null;
  isLoading: boolean | null;
  isLoggedIn: boolean | null;
  token: string | null;
  expiresIn: number | null;
  refreshToken: string | null;
  userId: string | null;
  emailId: string | null;
  metadata: string | null;
  setCredentials: () => void;
  logout: () => void;
  setSessionCredentials: (
    _token: string,
    _expiresIn: number,
    _refreshToken: string,
    _userId: string,
    _emailId: string,
    _name: string
  ) => void;
};

export const AuthContext = createContext<AuthConfig>({
  fetched: false,
  isLoading: false,
  isLoggedIn: false,
  token: null,
  expiresIn: null,
  refreshToken: null,
  userId: null,
  emailId: null,
  metadata: null,
  setCredentials: () => {},
  logout: () => {},
  setSessionCredentials: (
    _token,
    _expiresIn,
    _refreshToken,
    _userId,
    _emailId,
    _name
  ) => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const [fetched, setFetched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string>(null);
  const [expiresIn, setExpiresIn] = useState<number>(null);
  const [refreshToken, setRefreshToken] = useState<string>(null);
  const [userId, setUserId] = useState<string>(null);
  const [emailId, setEmailId] = useState<string>(null);
  const [metadata, setMetadata] = useState<string>(null);

  const setCredentials = async () => {
    setIsLoading(true);
    try {
      const _token = localStorage.getItem("token");
      if (_token ?? null) {
        const { data } = await AuthService.getSession();
        const { access_token, expires_in, refresh_token, user } = data?.session;
        console.log(data);
        setToken(access_token);
        setExpiresIn(expires_in);
        setRefreshToken(refresh_token);
        setUserId(user.id);
        setEmailId(user.email);
        setMetadata(user.user_metadata?.name ?? "");
        setIsLoggedIn(true);
        setIsLoading(false);
      }
      setFetched(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      setCredentials();
    }
  }, []);

  const setSessionCredentials = (
    _token: string,
    _expiresIn: number,
    _refreshToken: string,
    _userId: string,
    _emailId: string,
    _name: string
  ) => {
    localStorage.setItem("token", _token);
    setToken(_token);
    setExpiresIn(_expiresIn);
    setRefreshToken(_refreshToken);
    setUserId(_userId);
    setEmailId(_emailId);
    setMetadata(_name);
    setIsLoggedIn(true);
    setFetched(true);
    setIsLoading(false);
  };

  const logout = async () => {
    try {
      const response = await AuthService.logout();
      if (response ?? null) {
        localStorage.removeItem("token");
        setToken(null);
        setExpiresIn(null);
        setRefreshToken(null);
        setUserId(null);
        setEmailId(null);
        setMetadata(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        fetched,
        isLoading,
        isLoggedIn,
        token,
        expiresIn,
        refreshToken,
        userId,
        emailId,
        metadata,
        setCredentials,
        logout,
        setSessionCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
