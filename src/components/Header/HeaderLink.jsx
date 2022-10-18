import Link from "next/link"

export default function HeaderLink (props) {
    const { url, title } = props
    
    return (
        <li className="text-gray-900 font-semibold hover:text-gray-700">
            <Link href={url} >
                <a>{title}</a>
            </Link>
        </li>
    )
}