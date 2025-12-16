import { Text, View } from "react-native";

export default function Dashboard() {
	return (
		<View className="bg-[#1d1d2e] flex-1 justify-center px-2 gap-4 items-center flex ">
			<Text className="text-4xl flex italic font-bold  text-center w-4/5  text-white  ">
				Pizzaria <Text className="text-red-600">Gomes</Text>
			</Text>
		</View>
	);
}
