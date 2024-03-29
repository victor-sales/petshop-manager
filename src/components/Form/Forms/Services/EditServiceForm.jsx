import { useState } from "react";
import DatePicker from "../../FormInputs/DatePicker";
import Input from "../../FormInputs/Input";
import SelectBreed from "../../FormInputs/Select/SelectBreed";
import SelectUser from "../../FormInputs/Select/SelectUser";
import SelectService from "../../FormInputs/Select/SelectServices";
import SelectSpecie from "../../FormInputs/Select/SelectSpecie";
import { useEffect } from "react";
import useServicesContext from "../../../../hooks/useServicesContext";
import useAuthContext from "../../../../hooks/useAuthContext";
import { checkBreedValidity, checkDateValidity, checkServiceNameValidity, checkSimptomsValidity, checkSpecieValidity, checkTutorValidity, checkVetValidity } from "../../../../utils/Helpers";
import CheckBox from "../../FormInputs/CheckBox";
import SelectVet from "../../FormInputs/Select/SelectVet";
import { Services } from "../../../../utils/Enums";

export default function EditServiceForm({service, setService}) {

    const { token } = useAuthContext()
    const { handleUpdateService } = useServicesContext()

    const [date, setDate] = useState("");

    const [serviceNameError, setServiceNameError] = useState("")
    const [tutorError, setTutorError] = useState("")
    const [vetError, setVetError] = useState("")
    const [dateError, setDateError] = useState("")
    const [specieError, setSpecieError] = useState("")
    const [breedError, setBreedError] = useState("")
    const [simptomsError, setSimptomsError] = useState("")

    async function updateService () {
        
        const nameIsValid = checkServiceNameValidity(service.service_name, setServiceNameError)
        const tutorIsValid = checkTutorValidity(service.tutor._id, setTutorError)
        const specieIsValid = checkSpecieValidity(service.specie._id, setSpecieError)
        const breedIsValid = checkBreedValidity(service.breed._id, setBreedError)
        const simptomsAreValid = service.service_name === Services.CONSULTA ? checkSimptomsValidity(service.simptoms, setSimptomsError) : true
        const dateIsValid = checkDateValidity(service.date, setDateError)
        const vetIsValid = service.is_confirmed && service.service_name === Services.CONSULTA ? checkVetValidity(service.vet._id, setVetError) : true

        const areValid = [nameIsValid, tutorIsValid, specieIsValid, breedIsValid, simptomsAreValid, dateIsValid, vetIsValid].every(e => e)

        if (areValid) {
            await handleUpdateService(token, service)
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

    function onChangeVet (e) {
        const vet_id = e.target.value
        const vet_name = e.target.selectedOptions[0].text

        setService({
            ...service, 
            vet: { _id: vet_id, name: vet_name }
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
        setDate(new Date(service.date))
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        setService({...service, date: date})
        //eslint-disable-next-line
    }, [date])

    useEffect(() => {
        if(!service.is_confirmed) setService({...service, vet: { _id: "", name: "" }})
        //eslint-disable-next-line
    }, [service.is_confirmed])

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", updateService)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", updateService)
        }
        //eslint-disable-next-line
    }, [token, service])

    return (
        <form>
            <div className="flex flex-col gap-1">
                <CheckBox 
                    id={"is-confirmed"}
                    label={"Serviço confirmado com Tutor"}
                    name={"is-confirmed"}
                    onChange={(e) => setService({...service, is_confirmed: e.target.checked})}
                    checked={service.is_confirmed}/>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div>
                        <SelectService 
                            value={service.service_name}
                            onChange={(e) => setService({...service, service_name: e.target.value})}
                            error={serviceNameError}                
                        />
                    </div>
                    <div>
                        <SelectUser 
                            value={service.tutor._id}
                            onChange={onChangeTutor}
                            error={tutorError}
                        />
                    </div>
                </div>
                {
                    service.is_confirmed && service.service_name === Services.CONSULTA ? 
                    <SelectVet
                        value={service.vet._id}
                        onChange={onChangeVet}
                        error={vetError}/> : 
                    <></>
                }
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
                <Input 
                    labelText="Sintomas*" 
                    name="service-simptoms" 
                    id="service-simptoms" 
                    value={service.simptoms} 
                    onChange={(e) => setService({...service, simptoms: e.target.value})}
                    error={simptomsError} 
                />
            </div>
        </form>
    )
};
