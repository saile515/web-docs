import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Nav() {
	return (
		<div className="h-12 bg-purple-600 w-full fixed top-0 z-10 flex items-center">
			<Link
				href="/"
				className="text-lg sm:text-xl ml-4 sm:ml-8 text-gray-50 font-title font-bold">
				web-docs
			</Link>
			<SearchBar className="ml-auto mr-4 sm:mr-8" />
		</div>
	);
}
