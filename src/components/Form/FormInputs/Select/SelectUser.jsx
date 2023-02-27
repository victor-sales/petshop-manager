import { useEffect } from "react";
import Select from ".";
import useAuthContext from "../../../../hooks/useAuthContext";
import useUsersContext from "../../../../hooks/useUsersContext";
import { UserProfiles } from "../../../../utils/Enums";

export default function SelectUser ({value, onChange, error, ...props}) {

    const { token } = useAuthContext()
    const { handleGetUsers, users } = useUsersContext()
    
    
    useEffect(() => {
        async function list () {
            if (!users.length) await handleGetUsers(token) 
        }
        
        if (token) list()
        //eslint-disable-next-line
    }, [token])
    
    return (
        <Select 
            id='select-user'
            value={value}
            onChange={onChange}
            labelText="Usuário/Tutor*"
            required
            error={error}
        >
            <option value={""} disabled>...</option>
            {users?.filter(e => e.profile.toUpperCase() === UserProfiles.CLIENTE).map((e, key) => (
                <option key={key} value={e.id}>{e.user_name}</option>
            ))}
        </Select>
    )
}