export default function NotAuthorized () {
    return {
        status: 401,
        message: "Not authorized",
        detail: ""
    }
}