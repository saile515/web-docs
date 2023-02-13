import { useEffect, useState } from "react";

import { ArticleMetadata } from "../utils/article";
import Link from "next/link";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import topicsMeta from "../data/topics.json";
import { useRouter } from "next/router";

const topics = topicsMeta.topics;

function Article(props: { data: ArticleMetadata }) {
	return (
		<Link
			href={`/article/${props.data.slug}`}
			className="bg-gray-700 p-4 rounded-lg w-10/12 max-w-sm">
			<span className="font-bold font-title text-gray-50 text-xl">{props.data.title}</span>
			<div className="mt-2">
				{props.data.topic.map((topic) => (
					<span
						className="rounded-lg bg-gray-600 px-2 py-1 mr-1 text-gray-400"
						key={topic}>
						{topic}
					</span>
				))}
			</div>
		</Link>
	);
}

export default function Search() {
	const [query, setQuery] = useState<string>("");
	const [topic, setTopic] = useState<string[]>([]);
	const [searchTime, setSearchTime] = useState<number>();
	const [articles, setArticles] = useState<ArticleMetadata[]>();
	const router = useRouter();

	useEffect(() => {
		if (!router) return;

		if (!topic.length && router.query.t) {
			setTopic((router.query.t as string).split(","));
		}

		if (router.query.q && query == "") {
			setQuery(router.query.q as string);
		}
	}, [router]);

	useEffect(() => {
		handleSearch();
	}, [topic]);

	function handleSearch() {
		if (router) {
			router.query.q = query;
			router.query.t = topic.toString();
			router.push(router);
		}

		const startTime = performance.now();
		fetch(`/api/search?q=${query}&t=${topic.toString()}`)
			.then((res) => res.json())
			.then((res) => {
				setSearchTime(performance.now() - startTime);
				setArticles(res);
			});
	}

	return (
		<div className="bg-gray-900 min-h-screen">
			<Nav />
			<div className="pt-32 px-2 sm:px-8">
				<SearchBar
					big
					placeholder="Search for articles..."
					state={query}
					setState={setQuery}
					submit={handleSearch}
					className="w-full max-w-none"
				/>
				<div className="flex my-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-rounded-full scrollbar-h-1 py-2">
					{topic.map((id) => {
						const item = topics.find((topic) => topic.id == id);
						if (!item) return;

						return (
							<button
								key={item.id}
								className="rounded bg-gray-700 px-2 py-1 mr-2 my-1 text-gray-200 border-l-4 flex-grow-0 whitespace-pre"
								style={{ borderColor: item.color }}
								id={item.id}
								onClick={(event) =>
									setTopic((topic) => topic.filter((topic) => item.id != topic))
								}>
								{item.name}
							</button>
						);
					})}
					{topic.length > 0 && <span className="mr-2 border-r-2 border-gray-400"></span>}
					{topics.map((item) => {
						if (!topic.find((topic) => topic == item.id))
							return (
								<button
									key={item.id}
									className="rounded bg-gray-600 px-2 py-1 mr-2 my-1 text-gray-200 border-l-4 flex-grow-0 whitespace-pre"
									style={{ borderColor: item.color }}
									id={item.id}
									onClick={(event) =>
										setTopic((topic) => [
											...topic,
											(event.target as HTMLButtonElement).id,
										])
									}>
									{item.name}
								</button>
							);
					})}
				</div>
				{searchTime && (
					<p className="text-gray-500">
						Found {articles?.length} articles in {searchTime?.toFixed(2)} ms
					</p>
				)}
				<ul className="flex gap-4 my-2">
					{articles?.map((article) => (
						<Article data={article} key={article.title} />
					))}
				</ul>
			</div>
		</div>
	);
}
