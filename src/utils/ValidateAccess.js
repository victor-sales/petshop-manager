import { UserProfiles } from "./Enums"

export default function ValidateAccess (user_profile = UserProfiles.CLIENTE, required_profiles = [UserProfiles.ADMIN]) {
    
    const hasPermission = required_profiles.some(profiles => profiles.toLowerCase() === user_profile.toLowerCase())

    return hasPermission
}