import { OrderProps } from "@/src/@types";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useAuth } from "@/src/contexts/AuthProvider";
import { api } from "@/src/services/api";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function Dashboard() {
	const router = useRouter();
	const { logOut } = useAuth();
	const [tableNumber, setTableNumber] = useState("");
	const [loading, setLoading] = useState(false);
	async function handleOpenOrder() {
		if (!tableNumber.trim()) {
			Alert.alert("Atenção!", "Necessario preencher o numero da mesa");
			return;
		}
		const table = parseInt(tableNumber);
		if (isNaN(table) || table <= 0) {
			Alert.alert("Atenção!", "Necessario preencher o numero valido");
			return;
		}
		try {
			setLoading(true);
			const response = await api.post<OrderProps>("/add/order", {
				table: table,
			});
			router.push({
				pathname: "/(authenticated)/order",
				params: {
					table: response.data.table.toString(),
					order_id: response.data.id,
				},
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}
	return (
		<KeyboardAvoidingView className="bg-[#1d1d2e]  flex-1  " behavior="padding">
			<ScrollView
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
					paddingHorizontal: 8,
					gap: 16,
				}}
			>
				<View className="bg-[#1d1d2e] flex-1 justify-center px-2 gap-4 items-center flex  w-full">
					<View className="absolute z-20 top-20 right-4">
						<TouchableOpacity
							className="bg-red-600 w-16 h-10 flex justify-center items-center rounded-lg"
							onPress={logOut}
						>
							<Text className="text-white">Sair</Text>
						</TouchableOpacity>
					</View>
					<Text className="text-4xl flex italic font-bold  text-center w-4/5  text-white mb-10 ">
						Pizzaria <Text className="text-red-600">Gomes</Text>
					</Text>
					<Text className="text-2xl flex italic font-bold  text-center w-4/5  text-white  ">
						Novo pedido
					</Text>
					<Input
						placeholder="Numero da mesa"
						keyboardType="numeric"
						value={tableNumber}
						onChangeText={setTableNumber}
					/>
					<Button
						title="Abrir mesa"
						onPress={handleOpenOrder}
						disabled={loading}
						loading={loading}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
