import Link from "next/link";

export default function Nav() {
	return (
		<div className="h-12 bg-purple-600 w-full fixed top-0 z-10 flex items-center">
			<Link href="/" className="text-xl ml-8 text-gray-50 font-title font-bold">
				web-docs
			</Link>
		</div>
	);
}
