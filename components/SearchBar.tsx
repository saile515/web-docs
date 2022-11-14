export default function SearchBar(props: { big?: boolean; placeholder?: string }) {
	return (
		<div
			className={`${
				props.big ? "w-9/12 max-w-xl h-14 m-24 grid-cols-[1fr_3.5rem]" : "w-32 h-8 grid-cols-[1fr_2rem]"
			} bg-gray-200 rounded-full shadow-inner shadow-gray-500 border-b border-gray-100 grid items-center`}>
			<input
				type="text"
				placeholder={props.placeholder}
				className="bg-transparent h-full text-lg font-title focus:outline-none placeholder:font-bold placeholder:text-gray-600 pl-8 pr-4"
			/>
			<i className="bg-[url('/icons/search.svg')] filter-gray-600 icon h-10 w-10"></i>
		</div>
	);
}
