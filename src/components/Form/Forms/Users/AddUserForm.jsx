import { useState, useEffect } from "react";
import Input from "../../FormInputs/Input";
import Select from "../../FormInputs/Select";
import { Profiles } from "../../../../entities/Profiles"
import { Roles } from "../../../../entities/Roles";
import InputPhoneNumber from "../../FormInputs/InputPhoneNumber";
import { capitalizeFirst, checkEmailValidity, checkProfileValidity, checkRoleValidity, checkUsernameValidity } from "../../../../utils/Helpers";
import useUsersContext from "../../../../hooks/useUsersContext";
import useAuthContext from "../../../../hooks/useAuthContext";
import { RequestActionType } from "../../../../utils/Enums";

export default function AddUserForm({users, setUsers, ...props}) {

    const userObject = {username: "", email: "", phoneNumber: "", profile: "", role: ""}
    const { handleCreateUser } = useUsersContext()
    const { token } = useAuthContext()

    const [phone, setPhone] = useState("")

    const [user, setUser] = useState(userObject)

    const [usernameError, setUsernameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [profileError, setProfileError] = useState("")
    const [roleError, setRoleError] = useState("")
    
    async function createUser () {

        const { username, email, phoneNumber, profile, role } = user

        const usernameIsValid = checkUsernameValidity(username, setUsernameError)
        const emailIsValid = checkEmailValidity(email, setEmailError)
        const profileIsValid = checkProfileValidity(profile, setProfileError)
        const roleIsValid = checkRoleValidity(role, setRoleError)

        const areValid = [usernameIsValid, emailIsValid, profileIsValid, roleIsValid].every(e => e)

        if (areValid) {
            const password = null
            const isProvider = false
            const uid = null
    
            const user = await handleCreateUser(token, RequestActionType.CREATE_USER, uid, username, email, password, phoneNumber, profile, role, isProvider)

            if (user) {
                setUsers([...users, user.data])
                setUser(userObject)
                setPhone("")
            } 

        } else {
            return false
        }
        
    }

    useEffect(() => {
        setUser({...user, phoneNumber: phone})
        //eslint-disable-next-line
    }, [phone])

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", createUser)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", createUser)
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
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    error={usernameError} 
                />
                <Input 
                    labelText="E-mail*"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    error={emailError}
                    type={"email"}
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
