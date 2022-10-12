import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import DatePicker from "../components/Form/FormInputs/DatePicker";
import Header from "../components/Header";
import Input from "../components/Form/FormInputs/Input";
import Layout from "../components/Layout";
import Select from "../components/Form/FormInputs/Select";
import Textarea from "../components/Form/FormInputs/Textarea";

export default function Agendamento (props) {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            {/* <Header /> */}
            <Layout>
                <div className="grid md:grid-cols-1 lg:grid-cols-6 gap-2 mx-2 lg:mx-0">
                    <div className="col-start-2 border border-gray-300 rounded bg-white shadow-md">Meus agendamentos</div>
                    <div className="col-span-3 border border-gray-300 rounded bg-white p-6 shadow-md">
                        <h1 className="font-bold text-xl tracking-wide mb-6">Novo Agendamento</h1>
                        <form>
                            <Select 
                                required
                                id={"service"}
                                labelText={"Serviço"}
                                // value={userName}
                                // onChange={(e) => setUserName(e.target.value)}
                                >
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
                            <Select 
                                required
                                id={"specie"}
                                labelText={"Espécie"}
                                // value={userName}
                                // onChange={(e) => setUserName(e.target.value)}
                                >
                                <option value={"cachorro"}>Cachorro</option>
                                <option value={"gato"}>Gato</option>
                            </Select>
                            <Textarea labelText="Descrição" name="animal-description" id="animal-description"/>
                            <Textarea labelText="Sintomas" name="animal-simptoms" id="animal-simptoms"/>
                            
                        
                        <section className="flex flex-col items-center">
                            <button className="bg-blue-500 hover:bg-blue-600 py-1 text-white font-semibold border border-gray-300 rounded-md shadow-md h-10 w-full md:w-48 mt-4" type="submit">Agendar</button>
                        </section>
                    </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}