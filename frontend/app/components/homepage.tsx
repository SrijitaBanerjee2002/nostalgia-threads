import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { MemoryCard } from "./MemoryCard";
import { SearchInput } from "./ui/SearchInput";
import {  useMemoryContext } from "../context/memoryContext";

interface Memory {
	id: number;
	author: string;
	region: string;
	memory: string;
	tags: string[];
	reactions: Record<string, number>;
}

const SAMPLE_DATA: { memories: Memory[]; top_homesick_posts: Memory[] } = {
	memories: [
		{
			id: 1,
			author: "John Doe",
			region: "United States",
			memory:
				"Missing the amazing food trucks back home. The variety and flavors were incredible!",
			tags: ["food", "homesick", "culture"],
			reactions: { "😊": 5, "😢": 2, "🥲": 3, "❤️": 8, "👍": 0, "🎉": 0 },
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
	top_homesick_posts: [
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

export function Homepage() {
	const {
		memories,
		topHomesickPosts,
		fetchMemories,
		handleReaction,
	} = useMemoryContext();

	useEffect(() => {
		fetchMemories();
	}, []);

	return (
		<div className="max-w-3xl mx-auto py-8 px-4">
			<div className="mb-8">
				<SearchInput />
			</div>

			{topHomesickPosts.length > 0 && (
				<div className="mb-8">
					<h2 className="text-xl font-bold mb-4">Top Homesick Posts</h2>
					{topHomesickPosts.map((memory) => (
						<MemoryCard
							key={memory.id}
							memory={memory}
							onReact={handleReaction}
						/>
					))}
				</div>
			)}

			<div>
				<h2 className="text-xl font-bold mb-4">Recent Memories</h2>
				{memories.map((memory) => (
					<MemoryCard
						key={memory.id}
						memory={memory}
						onReact={handleReaction}
					/>
				))}
			</div>
		</div>
	);
}
