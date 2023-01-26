export default function CancelButton ({onClick, ...props}) {
    return (
        <button 
            id="cancel-button"
            className=""
            onClick={onClick}>
                Cancelar
        </button>
    )
}