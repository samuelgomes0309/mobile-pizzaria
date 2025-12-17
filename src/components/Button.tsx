import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
	title: string;
	loading?: boolean;
	disabled?: boolean;
}

export default function Button({
	disabled,
	title,
	loading = false,
	...rest
}: ButtonProps) {
	return (
		<TouchableOpacity
			className="w-4/5 h-14  flex justify-center items-center bg-[#3fffa3] rounded-lg "
			disabled={disabled}
			{...rest}
		>
			{loading ? (
				<ActivityIndicator color={"#101026"} />
			) : (
				<Text className="font-medium text-xl">{title}</Text>
			)}
		</TouchableOpacity>
	);
}
