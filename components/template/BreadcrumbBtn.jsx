import Link from "next/link";

export default function BreadcrumbBtn({path, label, children}){
    return(
        <Link
            href={path}
            className="flex items-center gap-x-2 w-fit bg-white text-accent1 font-bold px-3 py-1 rounded-full transition-all hover:text-white hover:bg-accent1 border border-accent1"
        >
            {children}
            {label}
        </Link>
    )
}