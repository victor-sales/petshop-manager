export default function Container (props) {
    const { children } = props
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 px-2 md:px-0">
           <div className="md:col-span-4 md:col-start-2 lg:col-span-10 lg:col-start-2 bg-gray-100 border border-gray-100 rounded-md shadow-md w-full h-auto">
                { children}
           </div>
        </div>
    )
}