export default function NormalizedUser (user) {
    
    const { _id, user_name, email, phone_number, profile, role } = user

    return {
        id: _id,
        user_name: user_name,
        email: email,
        phone_number: phone_number,
        profile: profile,
        role: role,
    }
}