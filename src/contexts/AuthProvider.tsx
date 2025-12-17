import AsynStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useContext, useState } from "react";
import { api } from "../services/api";
import { AuthContext, UserProps } from "./AuthContext";

interface AuthProviderProps {
	children: ReactNode;
}

interface LoginResponse {
	id: string;
	email: string;
	token: string;
	name: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserProps | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	async function login(email: string, password: string) {
		try {
			const response = await api.post<LoginResponse>("/login", {
				email,
				password,
			});
			const { token, ...userData } = response.data;
			AsynStorage.setItem("@token:pizzaria", token);
			AsynStorage.setItem("@user:pizzaria", JSON.stringify(userData));
			setUser(userData);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}
	return (
		<AuthContext.Provider
			value={{ signed: !!user, user, login, loading, setLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
}

//Hook para chamar o contexto
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("Contexto não encontrado!");
	}
	return context;
}
