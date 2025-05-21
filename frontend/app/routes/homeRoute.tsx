import type { Route } from "./+types/homeRoute";
import { Navbar } from "~/components/navbar";
import { Homepage } from "~/components/homepage";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Nostalgia Threads" },
		{
			name: "description",
			content:
				"A real-time map of available study spaces on campus. Check in and out of study spots based on preferences like quiet, group-friendly, and proximity to food.",
		},
		{
			name: "keywords",
			content:
				"study spots, UIC, campus map, real-time, study spaces, libraries, lounges, classrooms, student app, priority queue",
		},
		{ name: "author", content: "Umar Khan, Srijita Oruganti, Uvaish Bakaliya" },
		{ name: "robots", content: "index, follow" },
	];
}
export default function HomeRoute() {
  return (
    <div>
      <Navbar />
      <Homepage />
    </div>
  )
}
