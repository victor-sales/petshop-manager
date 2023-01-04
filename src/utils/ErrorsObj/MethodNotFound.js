export default function MethodNotFound (method) {
    return {
        status: 405, 
        message: `Method ${method} not found`
    }
}