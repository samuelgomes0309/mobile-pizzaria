import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function Login() {
	return (
		<KeyboardAvoidingView
			className="bg-[#1d1d2e]  flex-1  "
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
					paddingHorizontal: 8,
					gap: 16,
				}}
			>
				<View className="justify-center px-2 gap-4 items-center flex flex-1 w-full">
					<Text className="text-4xl flex italic font-bold  text-center w-4/5  text-white  ">
						Pizzaria <Text className="text-red-600">Gomes</Text>
					</Text>
					<TextInput
						className="bg-[#101026] w-4/5 px-5  border-gray-400 border text-white  rounded-lg h-14"
						placeholderTextColor={"#e8e8e8"}
						placeholder="Digite seu email"
					/>
					<TextInput
						secureTextEntry
						className="bg-[#101026] w-4/5 px-5  border-gray-400 border text-white  rounded-lg h-14"
						placeholderTextColor={"#e8e8e8"}
						placeholder="Digite seu senha"
					/>
					<TouchableOpacity className="w-4/5 h-14  flex justify-center items-center bg-[#3fffa3] rounded-lg ">
						<Text className="font-medium text-xl">Acessar</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
