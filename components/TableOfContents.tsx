import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { ArticleMetadata, TOCNode } from "../utils/article";

function TOCNode(props: { data: TOCNode; depth: number }) {
	const [content, setContent] = useState<ReactNode[]>([]);

	useEffect(() => {
		if (props.depth > 1) return;
		const nodes: ReactNode[] = [];

		if (typeof props.data != "string") {
			props.data.content.forEach((node, index) => {
				nodes.push(<TOCNode key={index} data={node} depth={props.depth + 1} />);
			});
		}

		setContent(nodes);
	}, [props.data]);

	if (typeof props.data == "string") {
		return (
			<Link
				href={`#${props.data.toLocaleLowerCase().replace(/\s/g, "-").replaceAll(".", "")}`}
				className="text-gray-400 block">
				{props.data}
			</Link>
		);
	}

	return (
		<div>
			<Link
				href={`#${props.data.title
					.toLocaleLowerCase()
					.replace(/\s/g, "-")
					.replaceAll(".", "")}`}
				className="text-gray-400 flex items-center">
				{props.data.title}
			</Link>
			<ul className="ml-4 transition-all overflow-hidden duration-300">{content}</ul>
		</div>
	);
}

export default function TableOfContents(props: { data: ArticleMetadata }) {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<button
				className={`sm:hidden fixed top-16 right-2 text-white text-2xl transition-transform ${
					visible ? "-rotate-90" : "rotate-90"
				}`}
				onClick={() => setVisible(!visible)}>
				<i className="bg-[url('/icons/arrow_down.svg')] w-6 h-6 block filter-gray-50"></i>
			</button>
			<div
				className={`border-l-2 border-gray-200 bg-gray-900 sm:bg-transparent px-6 py-2 my-2 h-min w-full sm:w-auto m-8 fixed sm:sticky top-24 transition-transform ${
					visible ? "translate-x-0" : "translate-x-full sm:translate-x-0"
				}`}>
				<p className="text-gray-200 font-title font-bold mb-2 text-lg">In this article</p>
				<ul>
					{props.data.tableOfContents.map((node, index) => (
						<TOCNode key={index} data={node} depth={1} />
					))}
				</ul>
			</div>
		</>
	);
}
