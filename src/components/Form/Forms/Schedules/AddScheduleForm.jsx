import { useState } from "react";
import DatePicker from "../../FormInputs/DatePicker";
import Input from "../../FormInputs/Input";
import Select from "../../FormInputs/Select";
import Textarea from "../../FormInputs/Textarea";

export default function AddScheduleForm(params) {
    const [startDate, setStartDate] = useState("");

    return (
        <form>
                <Select 
                    required
                    id={"service"}
                    labelText={"Serviço"}
                    // value={userName}
                    // onChange={(e) => setUserName(e.target.value)}
                    >
                                                    <option value={""}>...</option>

                    <option value={"consulta"}>Consulta</option>
                    <option value={"banho-tosa"}>Banho e Tosa</option>
                </Select>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div>
                        <DatePicker id={"data-schedule"} date={startDate} setDate={setStartDate} />
                    </div> 
                    <div className="">
                        <Select
                            required
                            id={"hour"}
                            labelText={"Hora"}>
                            <option value={""}>...</option>
                            <option value={"8"}>08:00</option>
                            <option value={"9"}>09:00</option>
                            <option value={"10"}>10:00</option>
                            <option value={"11"}>11:00</option>
                            <option value={"13"}>13:00</option>
                            <option value={"14"}>14:00</option>
                            <option value={"15"}>15:00</option>
                            <option value={"16"}>16:00</option>
                            <option value={"17"}>17:00</option>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div>
                        <Select 
                            required
                            id={"specie"}
                            labelText={"Espécie"}
                            // value={userName}
                            // onChange={(e) => setUserName(e.target.value)}
                            >
                                                            <option value={""}>...</option>

                            <option value={"cachorro"}>Cachorro</option>
                            <option value={"gato"}>Gato</option>
                        </Select>
                    </div>
                    <div>
                        <Select 
                            required
                            id={"breed"}
                            labelText={"Raça"}
                            // value={userName}
                            // onChange={(e) => setUserName(e.target.value)}
                            >
                                                            <option value={""}>...</option>

                            <option value={"raca-1"}>Raça 1</option>
                            <option value={"raca-2"}>Raça 2</option>
                            <option value={"raca-3"}>Raça 3</option>
                            <option value={"raca-4"}>Raça 4</option>
                        </Select>
                    </div>
                </div>
                <Textarea labelText="Descrição" name="animal-description" id="animal-description"/>
                <Textarea labelText="Sintomas" name="animal-simptoms" id="animal-simptoms"/>
        </form>
    )
};
