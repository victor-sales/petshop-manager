import { useEffect, useState } from "react";
import { Profiles } from "../../../../entities/Profiles";
import { Roles } from "../../../../entities/Roles";
import { capitalizeFirst, checkProfileValidity, checkRoleValidity, checkUsernameValidity } from "../../../../utils/Helpers";
import Input from "../../FormInputs/Input";
import InputPhoneNumber from "../../FormInputs/InputPhoneNumber";
import Select from "../../FormInputs/Select";
import useAuthContext from "../../../../hooks/useAuthContext";
import useUsersContext from "../../../../hooks/useUsersContext";

export default function EditUserForm({users, setUsers, user, setUser}) {

    const { token } = useAuthContext()
    const { handleUpdateUser } = useUsersContext()

    const [phone, setPhone] = useState("")

    const [usernameError, setUsernameError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [profileError, setProfileError] = useState("")
    const [roleError, setRoleError] = useState("")

    async function updateUser () {

        const usernameIsValid = checkUsernameValidity(user.user_name, setUsernameError)
        const profileIsValid = checkProfileValidity(user.profile, setProfileError)
        const roleIsValid = checkRoleValidity(user.role, setRoleError)

        const areValid = [usernameIsValid, profileIsValid, roleIsValid].every(e => e)

        if (areValid) {
            const response = await handleUpdateUser(token, user)

            if (response) {
                const arr = users
                const idx = arr.map(e => e.email).indexOf(response.data.email)

                arr[idx] = response.data
                setUsers(arr)
            } 

        } else {
            return false
        }
        
    }

    useEffect(() => {
        setUser({...user, phone_number: phone})
        //eslint-disable-next-line
    }, [phone])

    useEffect(() => {
        setPhone(user.phone_number ?? "")
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", updateUser)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", updateUser)
        }
        //eslint-disable-next-line
    }, [token, user])

    return (
        <div className="flex flex-col gap-1">
            <Input 
                key={"username"}
                required
                type={"text"}
                labelText={"Nome*"}
                id={"username"}
                value={user.user_name}
                onChange={(e) => setUser({...user, user_name: e.target.value})}
                error={usernameError} 
            />
            <Input 
                labelText="E-mail*"
                id="email"
                value={user.email}
                type={"email"}
                readOnly={true}
                disabled={true}
                />
            <InputPhoneNumber 
                labelText="Telefone"
                id="phone-number"
                value={phone}
                setValue={setPhone}
                error={phoneError}
                />
            <Select 
                labelText="Perfil"
                id="Perfil"
                value={user.profile}
                onChange={(e) => setUser({...user, profile: e.target.value})}
                error={profileError}
            >
                <option value={""} disabled>...</option>
                { Profiles.map((e, key) => <option key={e.id} value={e.name}>{capitalizeFirst(e.name)}</option>) }
            </Select>
            <Select 
                labelText="Função"
                id="Funcao"
                value={user.role}
                onChange={(e) => setUser({...user, role: e.target.value})}
                error={roleError}
            >   
                <option value={""} disabled>...</option>
                { Roles.map((e, key) => <option key={e.id} value={e.name}>{capitalizeFirst(e.name)}</option>) }
            </Select>
        </div>
    )
};
