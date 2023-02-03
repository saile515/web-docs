import { ArticleMetadata } from "../utils/article";
import SearchBar from "../components/SearchBar";
import { topics } from "../data/topics.json";
import { useState } from "react";

function Article(props: { data: ArticleMetadata }) {
	return (
		<div className="bg-gray-700 p-4 m-4 rounded-lg w-10/12 max-w-sm">
			<span className="font-bold font-title text-gray-50 text-xl">{props.data.title}</span>
			<div className="mt-2">
				{props.data.topic.map((topic) => (
					<span className="rounded-lg bg-gray-600 px-2 py-1 mr-1 text-gray-400">
						{topic}
					</span>
				))}
			</div>
		</div>
	);
}

export default function Search() {
	const [query, setQuery] = useState("");
	const [topic, setTopic] = useState<string[]>([]);
	const [searchTime, setSearchTime] = useState<number>();
	const [articles, setArticles] = useState<ArticleMetadata[]>();

	function handleSearch() {
		const startTime = performance.now();
		fetch(`/api/search?q=${query}&t=${topic.toString()}`)
			.then((res) => res.json())
			.then((res) => {
				setSearchTime(performance.now() - startTime);
				setArticles(res);
			});
	}

	return (
		<div className="bg-gray-900 min-h-screen p-8">
			<SearchBar
				big
				placeholder="Search for articles..."
				state={query}
				setState={setQuery}
				submit={handleSearch}
			/>
			<div className="flex m-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-rounded-full scrollbar-h-1 py-2">
				{topics.map((topic) => (
					<button
						key={topic.id}
						className="rounded bg-gray-600 px-2 py-1 mr-2 my-1 text-gray-200 border-l-4 flex-grow-0 whitespace-pre"
						style={{ borderColor: topic.color }}>
						{topic.name}
					</button>
				))}
			</div>
			{searchTime && (
				<p className="text-gray-500">
					Found {articles?.length} articles in {searchTime?.toFixed(2)} ms
				</p>
			)}
			<ul className="flex">
				{articles?.map((article) => (
					<Article data={article} key={article.title} />
				))}
			</ul>
		</div>
	);
}
