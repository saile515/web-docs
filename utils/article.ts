import { readFile } from "fs/promises";

export type TOCNode = string | { title: string; content: TOCNode[] };

export interface ArticleMetadata {
	title: string;
	topic: string[];
	tableOfContents: TOCNode[];
	keywords: string[];
	score?: number;
}

export async function getArticleMetadata(article: string) {
	const data = JSON.parse(
		(await readFile(`./data/articles/${article}/metadata.json`)).toString()
	);
	return data as ArticleMetadata;
}

export async function getArticleContent(article: string, lang: string) {
	const data = (await readFile(`./data/articles/${article}/${lang}.md`)).toString();
	return data;
}
