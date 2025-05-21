import { useState } from "react";
import { useAuthContext } from "~/context/authContext";
import { useMemoryContext } from "~/context/memoryContext";
const EMOJI_OPTIONS = ["😊","🥲","❤️"];

interface CreateMemoryModalProps {
	onClose: () => void;
}

interface formDataType {
	author: string;
	region: string;
	memory: string;
	tags: string[];
	reactions: Record<string, number>;
}


export function CreateMemoryModal({ onClose }: CreateMemoryModalProps) {
	const { username } = useAuthContext();
	const [formData, setFormData] = useState<formDataType>({
		author: username ? username : "Anonymous",
		region: "",
		memory: "",
		tags: [] as string[],
		reactions: {} as Record<string, number>,
	});
	const [tagInput, setTagInput] = useState("");
	const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);

	const { handleCreateMemory } = useMemoryContext();


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const reactions = selectedEmojis.reduce((acc, emoji) => {
			acc[emoji] = 0;
			return acc;
		}, {} as Record<string, number>);

		setFormData((prev) => ({ ...prev, reactions })); // Update formData with reactions
		handleCreateMemory(formData, onClose); // Call the context function to create memory



	};

	const handleAddTag = () => {
		if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
			setFormData((prev) => ({
				...prev,
				tags: [...prev.tags, tagInput.trim()],
			}));
			setTagInput("");
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		setFormData((prev) => ({
			...prev,
			tags: prev.tags.filter((tag) => tag !== tagToRemove),
		}));
	};

	const toggleEmoji = (emoji: string) => {
		setSelectedEmojis((prev) =>
			prev.includes(emoji) ? prev.filter((e) => e !== emoji) : [...prev, emoji]
		);
	};

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
				<div
					className="bg-[var(--bg-card)] rounded-lg p-6 w-full max-w-lg shadow-xl pointer-events-auto"
					onClick={(e) => e.stopPropagation()}
				>
					<h2 className="text-2xl font-bold mb-4">Create New Memory</h2>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Author
							</label>
							<input
								type="text"
								disabled
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
								value={formData.author}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, author: e.target.value }))
								}
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Region
							</label>
							<input
								type="text"
								required
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
								value={formData.region}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, region: e.target.value }))
								}
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Memory
							</label>
							<textarea
								required
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
								rows={4}
								value={formData.memory}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, memory: e.target.value }))
								}
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Tags
							</label>
							<div className="flex gap-2 max-h-32">
								<input
									type="text"
									className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
									value={tagInput}
									onChange={(e) => setTagInput(e.target.value)}
									onKeyPress={(e) =>
										e.key === "Enter" && (e.preventDefault(), handleAddTag())
									}
								/>
								<button
									type="button"
									onClick={handleAddTag}
									className="px-4 py-2 bg-[var(--bg-button)] hover:bg-[var(--bg-button-hover)] text-white rounded-full"
								>
									Add Tag
								</button>
							</div>
							<div className="flex flex-wrap gap-2 mt-4">
								{formData.tags.map((tag) => (
									<span
										key={tag}
										className="bg-[var(--bg-tag)] text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
									>
										{tag}
										<button
											type="button"
											onClick={() => handleRemoveTag(tag)}
											className="text-blue-600 hover:text-blue-800"
										>
											×
										</button>
									</span>
								))}
							</div>
						</div>

						<div className="flex justify-end gap-4 mt-6">
							<button
								type="button"
								onClick={onClose}
								className="px-4 py-2  border rounded-full  text-red-400"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-4 py-2 bg-[var(--bg-button)] hover:bg-[var(--bg-button-hover)] text-white rounded-full"
							>
								Create Memory
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
