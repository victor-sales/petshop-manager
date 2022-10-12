import Header from "../Header"

export default function Layout (props) {
    const { children } = props
    return (
        <div className="bg-gray-300 min-w-full min-h-screen">
            <Header />
            <div className="flex items-center mt-2 justify-center">
                {children}
            </div>
        </div>
    )
}