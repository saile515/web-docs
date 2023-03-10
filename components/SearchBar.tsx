import { useEffect, useState } from "react";

import { useRouter } from "next/router";

export default function SearchBar(props: {
	big?: boolean;
	placeholder?: string;
	className?: string;
	submit?: (text: string) => void;
}) {
	const [text, setText] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (router.query.q && text == "") {
			if (!router) return;
			setText(router.query.q as string);
		}
	}, [router]);

	function handleSubmit() {
		if (props.submit) {
			props.submit(text);
			return;
		}

		router.push(`/search?q=${text}`);
	}

	return (
		<div
			className={`${
				props.big
					? "w-9/12 max-w-xl sm:h-14 grid-cols-[1fr_3.5rem]"
					: "h-8 grid-cols-[1fr_2rem] w-6/12 max-w-sm"
			} bg-gray-200 rounded-full shadow-inner shadow-gray-500 border-b border-gray-100 grid items-center ${
				props.className
			} `}>
			<input
				onKeyDown={(event) => {
					if (event.key == "Enter") {
						handleSubmit();
					}
				}}
				type="text"
				placeholder={props.placeholder}
				value={text}
				onChange={(event) => {
					setText(event.target.value);
				}}
				className={`${
					props.big ? "pl-4 sm:pl-8" : "pl-4"
				} bg-transparent h-full text-lg font-title focus:outline-none placeholder:font-bold placeholder:text-gray-600 sm:pr-4 w-full`}
			/>
			<button onClick={handleSubmit}>
				<i
					className={`${
						props.big ? "h-8 w-8 sm:h-10 sm:w-10" : "h-6 w-6"
					} bg-[url('/icons/search.svg')] filter-gray-600 icon block`}></i>
			</button>
		</div>
	);
}
