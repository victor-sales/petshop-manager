import Link from "next/link"

export default function HeaderLink (props) {
    const { url, title } = props
    
    return (
        <li className="">
            <Link href={url} >
                <a className="text-gray-900 font-semibold hover:text-gray-700">{title}</a>
            </Link>
        </li>
    )
}