import Button from "@/src/components/Button";
import { api } from "@/src/services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function StartOrder() {
	const { table, order_id } = useLocalSearchParams<{
		table: string;
		order_id: string;
	}>();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	async function handleStartOrder() {
		if (!order_id) {
			Toast.show({
				type: "error",
				text1: "Pedido não encontrado.",
			});
			router.push("/(authenticated)/dashboard");
			return;
		}
		try {
			setLoading(true);
			await api.post(`/order/${order_id}/startOrder`);
			Toast.show({ type: "success", text1: "Pedido enviado com sucesso." });
			router.push("/(authenticated)/dashboard");
		} catch (error) {
			console.log(error);
			Toast.show({
				type: "error",
				text1: "Não foi possivel iniciar o pedido.",
			});
		} finally {
			setLoading(false);
		}
	}
	return (
		<SafeAreaView className="bg-[#1d1d2e] flex-1 ">
			<View className="flex-1 p-4">
				<View className="flex-row gap-4 items-center">
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons size={25} name="arrow-back" color={"#fff"} />
					</TouchableOpacity>
					<Text className="text-white font-bold text-xl">Enviando pedido</Text>
				</View>
				<View className="flex-1 justify-center gap-3.5  items-center ">
					<Text className="text-white font-bold text-2xl text-center">
						Você deseja enviar o pedido ?
					</Text>
					<Text className="text-white font-bold text-2xl text-center">
						Mesa - {table}
					</Text>
					<Button
						title="Enviar"
						onPress={handleStartOrder}
						disabled={loading}
						loading={loading}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
