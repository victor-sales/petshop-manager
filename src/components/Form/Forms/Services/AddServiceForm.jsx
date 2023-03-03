import { useState } from "react";
import DatePicker from "../../FormInputs/DatePicker";
import Input from "../../FormInputs/Input";
import SelectBreed from "../../FormInputs/Select/SelectBreed";
import { v4 as uuid } from 'uuid';
import SelectUser from "../../FormInputs/Select/SelectUser";
import SelectService from "../../FormInputs/Select/SelectServices";
import SelectSpecie from "../../FormInputs/Select/SelectSpecie";
import { useEffect } from "react";
import useServicesContext from "../../../../hooks/useServicesContext";
import useAuthContext from "../../../../hooks/useAuthContext";
import { checkBreedValidity, checkDateValidity, checkServiceNameValidity, checkSimptomsValidity, checkSpecieValidity, checkTutorValidity } from "../../../../utils/Helpers";
import useUserScheduleContext from "../../../../hooks/useUserScheduleContext";
import { useRouter } from "next/router";
import { Services } from "../../../../utils/Enums";
import useUserAccountContext from "../../../../hooks/useUserAccountContext";

export default function AddServiceForm(params) {
    
    const serviceObject = { id: uuid(), service_name: "", tutor: { _id: "", name: "" }, vet: { _id: "", name: "" }, date: "", specie: { _id: "", name: "" }, breed: { _id: "", name: "" }, description: "",  simptoms: "", is_confirmed: false }
    const router = useRouter()
    const { token } = useAuthContext()
    const { userAccount } = useUserAccountContext()
    const { handleCreateService } = useServicesContext()
    const { handleCreateUserSchedule } = useUserScheduleContext()

    const [isUserSchedule, setIsUserSchedule] = useState(false)

    const [service, setService] = useState(serviceObject)

    const [date, setDate] = useState("");

    const [serviceNameError, setServiceNameError] = useState("")
    const [tutorError, setTutorError] = useState("")
    const [dateError, setDateError] = useState("")
    const [specieError, setSpecieError] = useState("")
    const [breedError, setBreedError] = useState("")
    const [simptomsError, setSimptomsError] = useState("")

    async function createService () {
        
        const nameIsValid = checkServiceNameValidity(service.service_name, setServiceNameError)
        const tutorIsValid = checkTutorValidity(service.tutor._id, setTutorError)
        const specieIsValid = checkSpecieValidity(service.specie._id, setSpecieError)
        const breedIsValid = checkBreedValidity(service.breed._id, setBreedError)
        const simptomsAreValid = service.service_name === Services.CONSULTA ? checkSimptomsValidity(service.simptoms, setSimptomsError) : true
        const dateIsValid = checkDateValidity(service.date, setDateError)

        const areValid = [nameIsValid, tutorIsValid, specieIsValid, breedIsValid, simptomsAreValid, dateIsValid].every(e => e)

        if (areValid) {

            if (isUserSchedule) {
                await handleCreateUserSchedule(token, service)
            } else {
                await handleCreateService(token, service)
            }

            setService(serviceObject)

        } else {
            return false
        } 
    }

    function onChangeTutor (e) {
        
        const user_id = e.target.value
        const user_name = e.target.selectedOptions[0].text

        setService({
            ...service, 
            tutor: { _id: user_id, name: user_name }
        })
    }

    function onChangeSpecie (e) {
        
        const specie_id = e.target.value
        const specie_name = e.target.selectedOptions[0].text

        setService({
            ...service, 
            specie: { _id: specie_id, name: specie_name }
        })
    }

    function onChangeBreed (e) {
        
        const breed_id = e.target.value
        const breed_name = e.target.selectedOptions[0].text

        setService({
            ...service, 
            breed: { _id: breed_id, name: breed_name }
        })
    }
    
    useEffect(() => {
        setService({...service, date: date})
        //eslint-disable-next-line
    }, [date])

    useEffect(() => {
        setIsUserSchedule(router.pathname === "/agendamento")
    }, [router.pathname])

    useEffect(() => {
        if (userAccount && isUserSchedule) setService({...service, tutor: {_id: userAccount.id, name: userAccount.user_name}})
        //eslint-disable-next-line
    }, [userAccount, isUserSchedule])

    useEffect(() => {
        const button = document.getElementById(isUserSchedule ? "confirm-schedule": "confirm-button")
        if (button) button.addEventListener("click", createService)

        return () => {
            const button = document.getElementById(isUserSchedule ? "confirm-schedule": "confirm-button")
            if (button) button.removeEventListener("click", createService)
        }
        //eslint-disable-next-line
    }, [token, service])

    return (
        <form>
            <div className="flex flex-col gap-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div>
                        <SelectService 
                            value={service.service_name}
                            onChange={(e) => setService({...service, service_name: e.target.value})}
                            error={serviceNameError}                
                        />
                    </div>
                    {isUserSchedule ? 
                        <></> :
                        <div>
                            <SelectUser 
                                value={service.tutor._id}
                                onChange={onChangeTutor}
                                error={tutorError}
                            />
                        </div>
                    }
                </div>
                <DatePicker id={"data-schedule"} date={date} setDate={setDate} error={dateError} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div>
                        <SelectSpecie 
                            value={service.specie._id}
                            onChange={onChangeSpecie}
                            error={specieError}
                        />
                    </div>
                    <div>
                        <SelectBreed 
                            specieId={service.specie._id}
                            value={service.breed._id}
                            onChange={onChangeBreed}
                            error={breedError}
                        />
                    </div>
                    
                </div>
                <Input 
                    labelText="Descrição" 
                    name="service-description" 
                    id="service-description"
                    value={service.description} 
                    onChange={(e) => setService({...service, description: e.target.value})}
                />
                {
                    service.service_name === Services.CONSULTA ?
                        <Input 
                            labelText="Sintomas*" 
                            name="service-simptoms" 
                            id="service-simptoms" 
                            value={service.simptoms} 
                            onChange={(e) => setService({...service, simptoms: e.target.value})}
                            error={simptomsError} 
                        /> : 
                        <></>
                }
            </div>
        </form>
    )
};
