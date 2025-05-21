import { useAuthContext } from "~/context/authContext";
import { useMemoryContext } from "~/context/memoryContext";

interface Memory {
	id: number;
	author: string;
	region: string;
	memory: string;
	tags: string[];
	reactions: Record<string, number>;
}

interface MemoryCardProps {
	memory: Memory;
	onReact: (memoryId: number, emoji: string) => Promise<void>;
}

type Reactions = {
	"😊": number;
	"🥲": number;
	"❤️": number;
};

const DEFAULT_REACTIONS: Reactions = {
	"😊": 0,
	"🥲": 0,
	"❤️": 0,
};

export function MemoryCard({ memory, onReact }: MemoryCardProps) {
	const mergedReactions: Reactions = {
		...DEFAULT_REACTIONS,
		...memory.reactions,
	};

	const { handleDeleteMemory, handleTagClick } = useMemoryContext();
	const { username } = useAuthContext();
	const isAuthor = memory.author === username;

	return (
		<div className="bg-[var(--bg-card)] rounded-lg shadow-md p-6 mb-4">
			<div>
				<div className="flex justify-between items-start mb-4">
					<div>
						<h3 className="text-lg font-semibold">{memory.author}</h3>
						<p className="text-sm text-gray-500">{memory.region}</p>
					</div>

					{/* Delete Button */}
					{isAuthor && (
						<button
							onClick={() => handleDeleteMemory(memory.id)} // Replace with your delete logic
							className="text-red-500 hover:text-red-700 transition"
							aria-label="Delete Memory"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					)}
				</div>
			</div>

			<p className="text-gray-700 mb-4">{memory.memory}</p>

			<div className="flex flex-wrap gap-2 mb-4">
				{memory.tags.map((tag) => (
					<button
						onClick={() => handleTagClick(tag)}
						key={tag}
						className="bg-[var(--bg-tag)] text-blue-800 text-sm px-2 py-1 rounded-full border border-blue-300 hover:bg-[var(--bg-tag-hover)]"
					>
						{tag}
					</button>
				))}
			</div>

			<div className="flex gap-2">
				{Object.entries(mergedReactions).map(([emoji, count]) => (
					<button
						key={emoji}
						onClick={() => onReact(memory.id, emoji)}
						className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--bg-tag)] hover:bg-[var(--bg-tag-hover)] border border-blue-300"
					>
						<span>{emoji}</span>
						<span className="text-sm text-gray-600">{count}</span>
					</button>
				))}
			</div>
		</div>
	);
}
