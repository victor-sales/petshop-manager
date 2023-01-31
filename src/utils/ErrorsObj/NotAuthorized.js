export default function NotAuthorized () {
    return {
        status: 401,
        message: "Not authorized",
        details: "You don't have permision to access this resource"
    }
}