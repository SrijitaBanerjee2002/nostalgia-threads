import { Link } from "react-router";
import type { Route } from "./+types/aboutRoute";
import { Navbar } from "~/components/navbar";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "About - Nostalgia Threads" },
		{
			name: "description",
			content:
				"Learn about how Nostalgia Threads works - our features, data structures, and functionality",
		},
		{ name: "robots", content: "index, follow" },
	];
}

export default function AboutRoute() {
	return (
		<div>
			<Navbar />
			<section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6 text-center">
				<h1 className="text-5xl font-bold text-blue-800 mb-4">
					Welcome to Nostalgia Threads
				</h1>
				<p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
					Rediscover memories from your region and share your own. Powered by
					smart tagging, personalized reactions, and real-time memory feeds.
				</p>
				<Link
					to="/feed"
					className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
				>
					Explore Memories
				</Link>
			</section>

			<section className="max-w-5xl mx-auto px-4 py-16">
				<h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
				<div className="grid gap-8 md:grid-cols-3">
					<div className="bg-[var(--bg-card)] p-6 rounded-xl shadow-md">
						<h3 className="text-xl font-semibold mb-3">Create Memories</h3>
						<p className="text-gray-600">
							Fill out a form with text, optional author name, region, and tags
							with smart auto-complete. Max 500 characters.
						</p>
					</div>
					<div className="bg-[var(--bg-card)] p-6 rounded-xl shadow-md">
						<h3 className="text-xl font-semibold mb-3">Smart Tag Search</h3>
						<p className="text-gray-600">
							Tags are powered by a Trie data structure. Type to see
							suggestions. Click to filter memories.
						</p>
					</div>
					
					<div className="bg-[var(--bg-card)] p-6 rounded-xl shadow-md">
						<h3 className="text-xl font-semibold mb-3">React & Share</h3>
						<p className="text-gray-600">
							React with emojis. 🥲 reactions push posts to the Trending section
							powered by a Priority Queue.
						</p>
					</div>
				</div>
			</section>

			<section className="bg-gray-50 py-16 px-4">
				<h2 className="text-3xl font-bold text-center mb-10">
					API Quick Guide
				</h2>
				<div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
					{[
						["GET /api/memories", "Retrieve all or filtered memories"],
						["POST /api/memories", "Submit a new memory"],
						["PATCH /api/memories/:id/react", "React to a memory"],
						["DELETE /api/memories/delete/:id", "Delete a memory"],
						["GET /api/auth/login", "User login"],
						["GET /api/auth/signup", "Register a new user"],
						["POST /api/token/refresh/", "Refresh token"],
					].map(([endpoint, desc]) => (
						<div
							key={endpoint}
							className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
						>
							<p className="font-mono text-blue-700 mb-1">{endpoint}</p>
							<p className="text-sm text-gray-600">{desc}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}


// export default function AboutRoute() {
// 	return (
// 		<div>
// 			<Navbar />
// 			<div className="max-w-4xl mx-auto py-8 px-4">
// 				<h1 className="text-3xl font-bold mb-8">About Nostalgia Threads</h1>

// 				<section className="mb-12">
// 					<h2 className="text-2xl font-semibold mb-4">Creating New Memories</h2>
// 					<div className="bg-[var(--bg-card)] rounded-lg shadow-md p-6 mb-6">
// 						<h3 className="text-xl font-medium mb-3">Form Fields:</h3>
// 						<ul className="list-disc pl-6 space-y-2">
// 							<li>Author name (optional - can be anonymous)</li>
// 							<li>Region selection</li>
// 							<li>Memory text (limited to 500 characters)</li>
// 							<li>Tags with auto-complete suggestions</li>
// 							<li>Reaction options</li>
// 						</ul>
// 					</div>
// 				</section>

// 				<section className="mb-12">
// 					<h2 className="text-2xl font-semibold mb-4">Key Features</h2>
// 					<div className="grid gap-6 md:grid-cols-2">
// 						<div className="bg-[var(--bg-card)] rounded-lg shadow-md p-6">
// 							<h3 className="text-xl font-medium mb-3">Tag Search</h3>
// 							<p className="text-gray-600">
// 								Our tag system uses a Trie data structure for efficient
// 								auto-complete suggestions. As you type, matching tags are
// 								suggested. Click any tag to filter the memory feed.
// 							</p>
// 						</div>
// 						<div className="bg-[var(--bg-card)] rounded-lg shadow-md p-6">
// 							<h3 className="text-xl font-medium mb-3">Trending Section</h3>
// 							<p className="text-gray-600">
// 								Using a Priority Queue, we track and display the top 3 posts
// 								with the highest "Homesick" (🥲) reactions, helping you find
// 								relatable content.
// 							</p>
// 						</div>
// 					</div>
// 				</section>

// 				<section className="mb-12">
// 					<h2 className="text-2xl font-semibold mb-4">How It Works</h2>
// 					<div className="space-y-6">
// 						<div className="bg-[var(--bg-card)] rounded-lg shadow-md p-6">
// 							<h3 className="text-xl font-medium mb-3">Posting a Memory</h3>
// 							<ol className="list-decimal pl-6 space-y-2">
// 								<li>Fill out the memory form</li>
// 								<li>Backend stores your memory</li>
// 								<li>Updates tag suggestions</li>
// 								<li>Appears instantly in the feed</li>
// 							</ol>
// 						</div>

// 						<div className="bg-[var(--bg-card)] rounded-lg shadow-md p-6">
// 							<h3 className="text-xl font-medium mb-3">Memory Feed</h3>
// 							<ul className="list-disc pl-6 space-y-2">
// 								<li>View all memories sorted by date</li>
// 								<li>Filter memories by tags</li>
// 								<li>See trending "homesick" posts</li>
// 								<li>React to memories with emojis</li>
// 							</ul>
// 						</div>

// 						<div className="bg-[var(--bg-card)] rounded-lg shadow-md p-6">
// 							<h3 className="text-xl font-medium mb-3">
// 								Reactions & Interactions
// 							</h3>
// 							<ul className="list-disc pl-6 space-y-2">
// 								<li>React with emojis (🥲/💖/👀)</li>
// 								<li>Homesick reactions (🥲) influence trending posts</li>
// 								<li>Filter feed by clicking on tags</li>
// 								<li>Search memories using tag suggestions</li>
// 							</ul>
// 						</div>
// 					</div>
// 				</section>

// 				<section>
// 					<h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
// 					<div className="bg-[var(--bg-card)] rounded-lg shadow-md p-6">
// 						<ul className="space-y-4">
// 							<li>
// 								<span className="font-mono bg-gray-100 px-2 py-1 rounded">
// 									GET /api/memories
// 								</span>
// 								<p className="mt-1 text-gray-600">
// 									Retrieve all memories or filter by tag
// 								</p>
// 							</li>
// 							<li>
// 								<span className="font-mono bg-gray-100 px-2 py-1 rounded">
// 									GET /api/memories?tag=:tag
// 								</span>
// 								<p className="mt-1 text-gray-600">
// 									Retrieve all memories by filtering tag
// 								</p>
// 							</li>
// 							<li>
// 								<span className="font-mono bg-gray-100 px-2 py-1 rounded">
// 									POST /api/memories
// 								</span>
// 								<p className="mt-1 text-gray-600">Create a new memory</p>
// 							</li>
// 							<li>
// 								<span className="font-mono bg-gray-100 px-2 py-1 rounded">
// 									PATCH /api/memories/:id/react
// 								</span>
// 								<p className="mt-1 text-gray-600">Add a reaction to a memory</p>
// 							</li>
// 							<li>
// 								<span className="font-mono bg-gray-100 px-2 py-1 rounded">
// 									Delete /api/memories/delete/:id
// 								</span>
// 								<p className="mt-1 text-gray-600">Delete a memory</p>
// 							</li>
// 							<li>
// 								<span className="font-mono bg-gray-100 px-2 py-1 rounded">
// 									GET /api/auth/login
// 								</span>
// 								<p className="mt-1 text-gray-600">
// 									Authenticate user and retrieve token
// 								</p>
// 							</li>
// 							<li>
// 								<span className="font-mono bg-gray-100 px-2 py-1 rounded">
// 									GET /api/auth/signup
// 								</span>
// 								<p className="mt-1 text-gray-600">
// 									Register a new user and retrieve token
// 								</p>
// 							</li>
// 							<li>
// 								<span className="font-mono bg-gray-100 px-2 py-1 rounded">
// 									POST /api/token/refresh/
// 								</span>
// 								<p className="mt-1 text-gray-600">
// 									Refresh the authentication token
// 								</p>
// 							</li>
// 						</ul>
// 					</div>
// 				</section>
// 			</div>
// 		</div>
// 	);
// }
