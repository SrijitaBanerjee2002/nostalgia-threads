import { useState } from "react";
import { useAuthContext } from "~/context/authContext";

interface SignInModalProps {
	onClose: () => void;
}

export function SignInModal({ onClose }: SignInModalProps) {
	const { signInUser, signUpUser } = useAuthContext();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isSignUp) {
			await signUpUser(username, email, password);
		} else {
			await signInUser(username, password);
		}
		onClose();
	};

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed mt-16 inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
				<div
					className="bg-[var(--bg-card)] rounded-lg p-6 w-full max-w-lg shadow-xl pointer-events-auto"
					onClick={(e) => e.stopPropagation()}
				>
					<h2 className="text-2xl font-bold mb-4">
						{isSignUp ? "Sign Up" : "Sign In"}
					</h2>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Username
							</label>
							<input
								type="text"
								required
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						{isSignUp && (
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Email
								</label>
								<input
									type="email"
									required
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						)}

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								type="password"
								required
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<div className="flex justify-between items-center">
							<button
								type="button"
								onClick={() => setIsSignUp(!isSignUp)}
								className="text-blue-600 hover:underline"
							>
								{isSignUp
									? "Already have an account? Sign In"
									: "Don't have an account? Sign Up"}
							</button>
						</div>

						<div className="flex justify-end gap-4 mt-6">
							<button
								type="button"
								onClick={onClose}
								className="px-4 py-2 border  rounded-full  text-red-400"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-4 py-2 bg-[var(--bg-button)] hover:bg-[var(--bg-button-hover)] text-white rounded-full"
							>
								{isSignUp ? "Sign Up" : "Sign In"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default SignInModal;
