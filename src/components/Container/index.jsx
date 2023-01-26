export default function Container (props) {
    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 px-2">
           <div className="lg:col-span-10 lg:col-start-2 bg-gray-100 border border-gray-100 rounded-sm shadow-md w-full h-auto">
                { props.children }
           </div>
        </div>
    )
}