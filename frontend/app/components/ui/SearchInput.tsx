import { useMemoryContext } from "~/context/memoryContext";

interface SearchInputProps {
	placeholder?: string;
}

export function SearchInput({
	placeholder = "Search memories tags...",
}: SearchInputProps) {
	const { searchValue,  handleSearch } = useMemoryContext();

	return (
		<input
			type="search"
			placeholder={placeholder}
			value={searchValue}
			onChange={(e) => handleSearch(e.target.value)}
			className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
		/>
	);
}
