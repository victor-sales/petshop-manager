export default function SpanError ({error}) {
    return (
        <>
            {error ? <span className="pt-0.5 text-xs text-red-500 font-semibold">{error}</span> : <></>}
        </>
    )
}