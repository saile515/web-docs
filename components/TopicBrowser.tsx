import topics from "../data/topics.json";

export interface Topic {
	name: string;
	id: string;
	color: string;
	description: string;
}

function TopicContainer(props: { data: Topic }) {
	return (
		<a
			href={`/search?t=${props.data.id}`}
			style={{ borderTop: `5px solid ${props.data.color}` }}
			className="bg-gray-700 rounded-2xl h-72 p-8 shadow-xl">
			<h2 className="font-title text-gray-50 font-bold text-2xl">{props.data.name}</h2>
			<p className="text-white mt-4">{props.data.description}</p>
		</a>
	);
}

export default function TopicBrowser() {
	return (
		<div className="flex w-full justify-center py-48">
			<div className="w-10/12 max-w-5xl min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
				{topics.topics.map((topic) => (
					<TopicContainer key={topic.id} data={topic} />
				))}
			</div>
		</div>
	);
}
