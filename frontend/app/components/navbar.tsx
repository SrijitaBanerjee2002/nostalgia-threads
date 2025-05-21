import { useState } from "react";
import { Link } from "react-router";
import { CreateMemoryModal } from "./CreateMemoryModal";
import { useMemoryContext } from "~/context/memoryContext";
import { useAuthContext } from "~/context/authContext";
import { SignInModal } from "./SignInModal";

export function Navbar() {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { fetchMemories } = useMemoryContext();
	const { username, signOut } = useAuthContext();

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<nav className="relative z-50 bg-[var(--bg-navbar)] shadow-lg">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<Link to="/" className="text-xl font-bold text-white">
						Nostalgia Threads
					</Link>

					{/* Desktop menu */}
					<div className="hidden md:flex items-center gap-4">
						{username ? (
							<>
								<span className="px-4 py-2 text-white">Welcome, {username}</span>
								<button
									onClick={() => setIsCreateModalOpen(true)}
									className=" text-white px-4 py-2 rounded-full flex items-center"
								>
									New Memory
								</button>
								<button
									onClick={signOut}
									className=" text-white px-4 py-2 rounded-full"
								>
									Sign Out
								</button>
							</>
						) : (
							<>
								<button
									onClick={() => setIsSignInModalOpen(true)}
									className=" text-white px-4 py-2 rounded-full"
								>
									Sign In
								</button>
							</>
						)}
					</div>

					{/* Mobile toggle */}
					<div className="md:hidden flex items-center gap-2 px-2">
						{username && (
							<button
								onClick={() => setIsCreateModalOpen(true)}
								className="text-white w-10 h-10 rounded-full text-xl flex items-center justify-center"
							>
								+
							</button>
						)}
						<button onClick={toggleMenu} className="ml-2 text-white">
							{isMenuOpen ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 8h16M4 16h16"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Slide-in mobile menu */}
			<div
				className={`md:hidden fixed top-16 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
					isMenuOpen ? "translate-x-0" : "-translate-x-full"
				} z-40`}
			>
				<div className="p-4 flex flex-col gap-4 ">
					{username && (
						<span className="text-gray-800 hover:bg-[var(--bg-tag-hover)] px-4 py-2 rounded">
							Welcome, {username}
						</span>
					)}
					{username ? (
						<button
							onClick={() => {
								signOut();
								toggleMenu();
							}}
							className="text-left text-gray-800 hover:bg-[var(--bg-tag-hover)] px-4 py-2 rounded"
						>
							Sign Out
						</button>
					) : (
						<button
							onClick={() => {
								setIsSignInModalOpen(true);
								toggleMenu();
							}}
							className="text-left text-gray-800 hover:bg-[var(--bg-tag-hover)] px-4 py-2 rounded"
						>
							Sign In
						</button>
					)}
				</div>
			</div>
			{/* Close overlay */}
			{isMenuOpen && (
				<div
					className="fixed inset-0 mt-16 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-30"
					onClick={() => setIsMenuOpen(false)}
				/>
			)}

			{isCreateModalOpen && ( 
				<CreateMemoryModal
					onClose={() => {
						setIsCreateModalOpen(false);
						fetchMemories();
					}}
				/>
			)}

			{isSignInModalOpen && (
				<SignInModal onClose={() => setIsSignInModalOpen(false)} />
			)}
		</nav>
	);
}
