import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import TopicBrowser from "../components/TopicBrowser";

export default function Home() {
	return (
		<div className="min-h-[200vh] gradient">
			<Nav />
			<header className="flex flex-col items-center h-screen relative">
				<h1 className="text-3xl sm:text-4xl text-white mt-32 w-9/12 max-w-xl font-title font-bold">
					Open Source Tutorials on Web Development and Related Topics
				</h1>
				<SearchBar big placeholder="Search for articles..." />
				<button
					className="font-title font-black text-gray-300 hover:text-gray-50 text-lg flex flex-col items-center absolute bottom-12 group transition-all hover:translate-y-1"
					onClick={() => {
						window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
					}}>
					...or browse by topic
					<i className="bg-[url('/icons/arrows_down.svg')] filter-gray-300 group-hover:filter-gray-50 icon w-8 h-8 transition-all"></i>
				</button>
			</header>
			<TopicBrowser />
		</div>
	);
}
