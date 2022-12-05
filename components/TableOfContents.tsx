import Link from "next/link";
import { ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import { ArticleMetadata, TOCNode } from "../utils/article";

function TOCNode(props: { data: TOCNode; depth: number }) {
	const [content, setContent] = useState<ReactNode[]>([]);
	const [expanded, setExpanded] = useState<boolean>(false);

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
			<Link href={`#${props.data.toLocaleLowerCase().replace(/\s/g, "-").replaceAll(".", "")}`} className="text-gray-400 block">
				{props.data}
			</Link>
		);
	}

	return (
		<div>
			<Link
				href={`#${props.data.title.toLocaleLowerCase().replace(/\s/g, "-").replaceAll(".", "")}`}
				className="text-gray-400 flex items-center">
				{props.data.title}
			</Link>
			<ul className="ml-4 transition-all overflow-hidden duration-300">{content}</ul>
		</div>
	);
}

export default function TableOfContents(props: { data: ArticleMetadata }) {
	return (
		<div className="border-l-2 border-gray-200 px-6 py-2 my-2 h-min m-8 sticky top-24">
			<p className="text-gray-200 font-title font-bold mb-2 text-lg">In this article</p>
			<ul>
				{props.data.tableOfContents.map((node, index) => (
					<TOCNode key={index} data={node} depth={1} />
				))}
			</ul>
		</div>
	);
}
