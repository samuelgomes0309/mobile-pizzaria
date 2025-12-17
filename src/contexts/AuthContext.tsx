import { createContext } from "react";

interface ContextProps {
	signed: boolean;
	user: UserProps | null;
	login: (email: string, password: string) => void;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserProps {
	email: string;
	id: string;
	name: string;
}

export const AuthContext = createContext({} as ContextProps);
