import {
	CategoryProps,
	DetailOrderProps,
	ItemProps,
	ProductProps,
} from "@/src/@types";
import Button from "@/src/components/Button";
import CardItem from "@/src/components/CardItem";
import CardModal from "@/src/components/CardModal";
import Input from "@/src/components/Input";
import { api } from "@/src/services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Modal,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Order() {
	const { table, order_id } = useLocalSearchParams<{
		table: string;
		order_id: string;
	}>();
	const router = useRouter();
	const [amount, setAmount] = useState("");
	const [detailOrder, setDetailOrder] = useState<DetailOrderProps>();
	const [categories, setCategories] = useState<CategoryProps[]>([]);
	const [products, setProducts] = useState<ProductProps[]>([]);
	const [productSelected, setProductSelected] = useState<ProductProps>();
	const [categorySelected, setCategorySelected] = useState<CategoryProps>();
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [loadingModal, setLoadingModal] = useState<boolean>(false);
	const [modalSelect, setModalSelect] = useState<
		CategoryProps[] | ProductProps[]
	>([]);
	const [loadingOrder, setLoadingOrder] = useState<boolean>(true);
	const [typeModal, setTypeModal] = useState<"category" | "product">(
		"category"
	);
	useEffect(() => {
		const loadInitial = async () => {
			await loadCategories();
			setLoadingOrder(false);
		};
		loadInitial();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	async function handleOpenOrder() {
		if (!detailOrder || detailOrder?.items.length === 0) {
			return;
		}
		router.push({
			pathname: "/(authenticated)/startOrder",
			params: {
				order_id,
				table,
			},
		});
	}
	async function loadCategories(selected_id?: string) {
		try {
			const response = await api.get<CategoryProps[]>("/categories");
			if (response.data.length === 0) return;
			setCategories(response.data);
			if (!selected_id) {
				setCategorySelected(response.data[0]);
				await loadProducts(response.data[0].id);
				return;
			}
			const itemIndex = response.data.findIndex(
				(item) => item.id === selected_id
			);
			const selectedCategory =
				itemIndex !== -1 ? response.data[itemIndex] : response.data[0];
			setCategorySelected(selectedCategory);
			await loadProducts(selectedCategory.id);
		} catch (error) {
			console.log(error);
		}
	}
	async function loadProducts(category_id: string) {
		try {
			const response = await api.get<ProductProps[]>("/products/category", {
				params: {
					category_id,
				},
			});
			setProducts(response.data);
			if (response.data.length > 0) {
				setProductSelected(response.data[0]);
			}
		} catch (error) {
			console.log(error);
		}
	}
	function handleOpenModal(select: "category" | "product") {
		if (select === "category") {
			setModalSelect(categories);
			setModalVisible(true);
			setTypeModal("category");
		} else {
			setModalSelect(products);
			setModalVisible(true);
			setTypeModal("product");
		}
	}
	function handleCloseModal() {
		setModalVisible(false);
	}
	async function handleSelectItem(
		item: ProductProps | CategoryProps,
		type: "category" | "product"
	) {
		if (type === "category") {
			setLoadingModal(true);
			await loadCategories(item.id);
			setLoadingModal(false);
		} else {
			setProductSelected(item as ProductProps);
		}
		setModalVisible(false);
	}
	async function handleDeleteOrder() {
		if (detailOrder && detailOrder?.items.length > 0) {
			Toast.show({
				type: "error",
				text1: "Atenção!",
				text1Style: { fontSize: 16, color: "#000" },
				text2: "É necessário excluir os itens antes de remover o pedido.",
				text2Style: { fontSize: 14, color: "#000" },
			});
			return;
		}
		try {
			await api.delete("/remove/order", {
				params: {
					order_id: order_id,
				},
			});
			router.push("/(authenticated)/dashboard");
		} catch (error) {
			console.log(error);
		}
	}
	async function handleAddItens() {
		if (!productSelected || !amount) {
			return;
		}
		try {
			const amountNumber = parseInt(amount);
			if (isNaN(amountNumber) || amountNumber <= 0) {
				return;
			}
			await api.post<ItemProps>("/order/add/item", {
				order_id: order_id,
				amount: amountNumber,
				product_id: productSelected.id,
			});
			Toast.show({ type: "success", text1: "Produto adicionado com sucesso." });
			setAmount("");
			await handleDetailOrder();
		} catch (error) {
			console.log(error);
			Toast.show({
				type: "error",
				text1: "Não foi possivel adicionar o produto.",
			});
		}
	}
	// detailOrder só é carregado após adicionar/remover itens
	async function handleDetailOrder() {
		try {
			const response = await api.get<DetailOrderProps>("/order/detail", {
				params: {
					order_id: order_id,
				},
			});
			setDetailOrder(response.data);
		} catch (error) {
			console.log(error);
		}
	}
	async function handleDeleteItem(product_id: string) {
		try {
			await api.delete("/order/remove/item", {
				data: {
					product_id: product_id,
					order_id: order_id,
				},
			});
			await handleDetailOrder();
			Toast.show({ type: "success", text1: "Produto excluido com sucesso." });
		} catch (error) {
			console.log(error);
			Toast.show({
				type: "error",
				text1: "Não foi possivel excluir o produto.",
			});
		}
	}
	if (loadingOrder) {
		return (
			<View className="bg-[#1d1d2e] flex-1 p-4 justify-center items-center">
				<ActivityIndicator size={"large"} color={"#fff"} />
			</View>
		);
	}
	return (
		<SafeAreaView className="bg-[#1d1d2e] flex-1 p-4">
			<View className="flex flex-row gap-6 items-center mt-10">
				<Text className="text-white text-2xl font-bold">Mesa - {table}</Text>
				<TouchableOpacity onPress={handleDeleteOrder}>
					<Ionicons name="trash" size={25} color={"#F00000"} />
				</TouchableOpacity>
			</View>
			<View className="mt-4">
				<TouchableOpacity
					onPress={() => handleOpenModal("category")}
					className="bg-[#101026]  rounded-lg h-14 justify-between  items-center   flex flex-row px-4"
				>
					<Text className="text-[#f0f0f0]">{categorySelected?.name}</Text>
					<Ionicons name="arrow-down" size={25} color={"#f0f0f0"} />
				</TouchableOpacity>
			</View>
			<View className="mt-4">
				<TouchableOpacity
					onPress={() => handleOpenModal("product")}
					className="bg-[#101026]  rounded-lg h-14 justify-between  items-center   flex flex-row px-4"
				>
					<Text className="text-[#f0f0f0]">{productSelected?.name}</Text>
					<Ionicons name="arrow-down" size={25} color={"#f0f0f0"} />
				</TouchableOpacity>
			</View>
			<View className="mt-4 flex flex-row justify-center  w-full items-center h-14">
				<Text className="flex-1 text-xl font-bold text-white ">Quantidade</Text>
				<View className="flex-1 items-end">
					<Input
						value={amount}
						onChangeText={setAmount}
						placeholder="Ex: 1"
						keyboardType="numeric"
					/>
				</View>
			</View>
			<View className="mt-4 flex flex-row justify-between gap-2 w-full items-center h-14">
				<TouchableOpacity
					onPress={handleAddItens}
					disabled={!amount}
					className="flex w-20 rounded-lg h-14 justify-center items-center bg-sky-600 disabled:opacity-40 "
				>
					<Ionicons name="add" size={30} color={"#Ffff"} />
				</TouchableOpacity>
				<View className="flex-1">
					<Button
						onPress={handleOpenOrder}
						title="Avançar"
						disabled={!detailOrder || detailOrder.items.length === 0}
					/>
				</View>
			</View>
			{detailOrder?.items && detailOrder.items.length > 0 && (
				<FlatList
					className="flex-1 mt-4"
					keyExtractor={(item) => item.id}
					data={detailOrder?.items}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<CardItem item={item} deleteItem={handleDeleteItem} key={item.id} />
					)}
					contentContainerStyle={{ paddingBottom: 16 }}
				/>
			)}
			<Modal animationType="fade" visible={modalVisible} transparent={true}>
				{modalVisible && (
					<CardModal
						data={modalSelect}
						loading={loadingModal}
						selected={
							typeModal === "category" ? categorySelected : productSelected
						}
						type={typeModal}
						onSelect={handleSelectItem}
						onClose={handleCloseModal}
					/>
				)}
			</Modal>
		</SafeAreaView>
	);
}
