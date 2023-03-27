import { getArticleContent, getArticleMetadata } from "../../utils/article";

import DOMPurify from "isomorphic-dompurify";
import { InferGetStaticPropsType } from "next";
import Nav from "../../components/Nav";
import TableOfContents from "../../components/TableOfContents";
import { marked } from "marked";
import { readdir } from "fs/promises";
import style from "../../styles/article.module.css";
import { useState } from "react";

export default function Article(props: InferGetStaticPropsType<typeof getStaticProps>) {
	const [content, setContent] = useState<string>(DOMPurify.sanitize(marked.parse(props.article)));

	return (
		<div className="bg-gray-800 min-h-screen">
			<Nav />
			<div className="grid sm:grid-cols-[1fr_2fr_1fr] mt-12 p-12 pt-24">
				<div></div>
				<article id={style.article} dangerouslySetInnerHTML={{ __html: content }}></article>
				<TableOfContents data={props.metadata} />
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	const articles = (await readdir("./data/articles", { withFileTypes: true }))
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => ({ params: { article: dirent.name } }));
	return { paths: articles, fallback: false };
}

export async function getStaticProps({ params }: { params: { article: string } }) {
	const metadata = await getArticleMetadata(params.article);
	const article = await getArticleContent(params.article, "EN");

	return {
		props: {
			metadata: metadata,
			article: article,
		},
	};
}
