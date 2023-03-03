import { useEffect } from "react";
import Select from ".";
import { Roles } from "../../../../entities/Roles";
import useAuthContext from "../../../../hooks/useAuthContext";
import useUsersContext from "../../../../hooks/useUsersContext";
import { UserProfiles, UserRoles } from "../../../../utils/Enums";

export default function SelectVet ({value, onChange, error, ...props}) {

    const { token } = useAuthContext()
    const { handleGetUsers, users } = useUsersContext()
    
    useEffect(() => {
        if (!users.length) handleGetUsers(token)
        //eslint-disable-next-line
    }, [token])
    
    return (
        <Select 
            id='select-vet'
            value={value}
            onChange={onChange}
            labelText="Veterinário*"
            required
            error={error}
        >
            <option value={""} disabled>...</option>
            {users?.filter(e => e.profile.toUpperCase() === UserProfiles.FUNCIONARIO && e.role.toUpperCase() === UserRoles.VETERINARIO ).map((e, key) => (
                <option key={key} value={e.id}>{e.user_name}</option>
            ))}
        </Select>
    )
}