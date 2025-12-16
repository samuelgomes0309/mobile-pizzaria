import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthenticatedLayout() {
	return (
		<>
			<StatusBar style="light" />
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="dashboard" />
			</Stack>
		</>
	);
}
