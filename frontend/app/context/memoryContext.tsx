import React, {
	createContext,
	useState,
	useEffect,
	type ReactNode,
	useContext,
} from "react";

import { useAuthContext } from "~/context/authContext";
interface formDataType {
	author: string;
	region: string;
	memory: string;
	tags: string[];
	reactions: Record<string, number>;
}
interface Memory {
	id: number;
	author: string;
	region: string;
	memory: string;
	tags: string[];
	reactions: Record<string, number>;
}

interface MemoryContextType {
	memories: Memory[];
	topHomesickPosts: Memory[];
	searchValue: string;
	fetchMemories: (tag?: string) => void;
	handleReaction: (memoryId: number, emoji: string) => Promise<void>;
	handleSearch: (value: string) => void;
	handleCreateMemory: (
		formData: formDataType,
		onClose: () => void
	) => Promise<void>;
	handleDeleteMemory: (memoryId: number) => Promise<void>;
	handleTagClick: (tag: string) => void;
}

const SAMPLE_DATA: { memories: Memory[]; topHomesickPosts: Memory[] } = {
	memories: [
		{
			id: 1,
			author: "John Doe",
			region: "United States",
			memory:
				"Missing the amazing food trucks back home. The variety and flavors were incredible!",
			tags: ["food", "homesick", "culture"],
			reactions: { "😊": 5, "🥲": 3, "❤️": 8 },
		},
		{
			id: 2,
			author: "Jane Smith",
			region: "Canada",
			memory:
				"The winter here is so different from home. I miss the snow and hot chocolate by the fireplace.",
			tags: ["weather", "winter", "cozy"],
			reactions: { "😊": 3, "😢": 0, "🥲": 4, "❤️": 6, "👍": 0, "🎉": 0 },
		},
	],
	topHomesickPosts: [
		{
			id: 3,
			author: "Alex Johnson",
			region: "UK",
			memory:
				"Sunday roasts with family - nothing comes close to mum's Yorkshire pudding!",
			tags: ["family", "food", "tradition", "homesick"],
			reactions: { "😊": 0, "😢": 10, "🥲": 15, "❤️": 12, "👍": 0, "🎉": 0 },
		},
	],
};

export const MemoryContext = createContext<MemoryContextType | null>(null);

export const MemoryContextProvider = ({
	children,
}: {
	children: ReactNode;
}): React.ReactElement => {
	const [memories, setMemories] = useState<Memory[]>(SAMPLE_DATA.memories);
	const [topHomesickPosts, setTopHomesickPosts] = useState<Memory[]>(SAMPLE_DATA.topHomesickPosts);
	const [searchValue, setSearchValue] = useState<string>("");	

	const { token } = useAuthContext();
	useEffect(() => {
		fetchMemories();
	}, []);

	const fetchMemories = async (tag?: string) => {
		console.log("Fetching memories with tag:", tag);
		try {
			const params = new URLSearchParams({
				tag: tag || "",
			});	

			const response = await fetch(`/api/memories?${params}`);
			if (!response.ok) {
				throw new Error("API request failed");
			}
			const data = await response.json();
			console.log("Fetched memories:", data);
			setMemories(data.memories);
			setTopHomesickPosts(data.top_homesick_posts);
		} catch (error) {
			// error = await error.json();
			setMemories(SAMPLE_DATA.memories);
			setTopHomesickPosts(SAMPLE_DATA.topHomesickPosts);
		}
	};

	const handleReaction = async (memoryId: number, emoji: string) => {
		try {
			const response = await fetch(`/api/memories/${memoryId}/react`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({ reaction: emoji }),
			});

			if (!response.ok) {
				throw new Error("Failed to update reaction");
			}

			// Refresh memories after reaction
			fetchMemories();
		} catch (error) {
			console.error("Error updating reaction:", error);
			// If the API fails, update the reaction in the local state
			const updateMemories = (list: Memory[]) =>
				list.map((memory) =>
					memory.id === memoryId
						? {
								...memory,
								reactions: {
									...memory.reactions,
									[emoji]: (memory.reactions[emoji] || 0) + 1,
								},
						  }
						: memory
				);

			setMemories((prev) => updateMemories(prev));
			setTopHomesickPosts((prev) => updateMemories(prev));
		}
	};

	const handleCreateMemory = async (
		formData: formDataType,
		onClose: () => void
	) => {
		try {
			const response = await fetch("/api/memories/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
					...formData,
				}),
			});

			if (response.ok) {
				onClose();
			} else {
				const errorData = await response.json();
				console.error("Error creating memory:", errorData.message);
			}
		} catch (error) {
			console.error("Error creating memory:", error);
		}
	};

	const handleDeleteMemory = async (memoryId: number) => {
		try {
			const response = await fetch(`/api/memories/delete/${memoryId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,	
				},
			});	

			// Refresh memories after deletion
			fetchMemories();
		} catch (error) {
			console.error("Error deleting memory:", error);
		}
	};

const handleSearch = (value: string) => {
	const tag = value.toLowerCase().trim();
	setSearchValue(tag);
	fetchMemories(tag);
};

	const handleTagClick = (tag: string) => {
		tag = tag.toLowerCase().trim();
		setSearchValue(tag);
		fetchMemories(tag);
	}

	return (
		<MemoryContext.Provider
			value={{
				memories,
				topHomesickPosts,
				searchValue,
				fetchMemories,
				handleReaction,
				handleCreateMemory,
				handleDeleteMemory,
				handleSearch,
				handleTagClick,
			}}
		>
			{children}
		</MemoryContext.Provider>
	);
};

export const useMemoryContext = () => {
	const context = useContext(MemoryContext);
	if (!context) {
		throw new Error(
			"useMemoryContext must be used within an MemoryContextProvider"
		);
	}
	return context;
};
