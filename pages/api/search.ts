import type { NextApiRequest, NextApiResponse } from "next";
import { readFileSync, readdirSync } from "fs";

import { ArticleMetadata } from "../../utils/article";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// Transform query into manageable data.
	const query = req.query.q ? (req.query.q as string).split(" ") : undefined;
	query?.forEach((word: string) => word.toLowerCase());

	const topic = req.query.topic ? (req.query.topic as string).split(",") : undefined;
	topic?.forEach((word: string) => word.toLowerCase());

	// Read all article names.
	const dataDir = path.join(process.cwd(), "data");
	const articleNames = readdirSync(`${dataDir}/articles`, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	// Get article metadata from file names.
	const articleData: ArticleMetadata[] = articleNames.map((article) => {
		return JSON.parse(readFileSync(`${dataDir}/articles/${article}/metadata.json`).toString());
	});

	// Filter articles that doesn't match topic.
	if (topic) {
		articleData.forEach((article, index) => {
			for (let i = 0; i < topic?.length; i++) {
				if (!article.topic.includes(topic[i])) {
					articleData.splice(index, 1);
				}
			}
		});
	}

	// Give score to each article based on keywords and title.
	articleData.forEach((article) => {
		article.score = 0;
		const titleArr = article.title.split(" ");
		titleArr.forEach((word) => word.toLowerCase());

		article.keywords.forEach((word) => word.toLowerCase());

		if (query) {
			// Filter through title.
			for (let i = 0; i < query.length; i++) {
				if (titleArr.includes(query[i])) {
					article.score++;
				}
			}

			// Filter through keywords.
			for (let i = 0; i < query.length; i++) {
				if (article.keywords.includes(query[i])) {
					article.score++;
				}
			}
		}
	});

	res.status(200).end();
}
