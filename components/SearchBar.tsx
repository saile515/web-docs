import { Dispatch, SetStateAction } from "react";

export default function SearchBar(props: {
	big?: boolean;
	placeholder?: string;
	className?: string;
	state?: string;
	setState?: Dispatch<SetStateAction<string>>;
	submit?: () => void;
}) {
	return (
		<div
			className={`${
				props.big
					? "w-9/12 max-w-xl sm:h-14 grid-cols-[1fr_3.5rem]"
					: "w-32 h-8 grid-cols-[1fr_2rem]"
			} bg-gray-200 rounded-full shadow-inner shadow-gray-500 border-b border-gray-100 grid items-center ${
				props.className
			} `}>
			<input
				onKeyDown={(event) => {
					if (event.key == "Enter" && props.submit) {
						props.submit();
					}
				}}
				type="text"
				placeholder={props.placeholder}
				value={props.state}
				onChange={(event) => {
					if (props.setState) props.setState(event.target.value);
				}}
				className="bg-transparent h-full text-lg font-title focus:outline-none placeholder:font-bold placeholder:text-gray-600 pl-4 sm:pl-8 sm:pr-4"
			/>
			<button
				onClick={() => {
					if (props.submit) props.submit();
				}}>
				<i className="bg-[url('/icons/search.svg')] filter-gray-600 icon h-8 w-8 sm:h-10 sm:w-10 block"></i>
			</button>
		</div>
	);
}
