import { useState } from "react";
import DatePicker from "../FormInputs/DatePicker";
import Select from "../FormInputs/Select";
import Textarea from "../FormInputs/Textarea";
import AddServiceForm from "./Services/AddServiceForm";

export default function ScheduleForm () {
    
    return (
        <section className="lg:col-span-3 border border-gray-300 rounded bg-white p-6 shadow-md">
            <h1 className="font-bold text-xl tracking-wide mb-6">Novo Agendamento</h1>
            <AddServiceForm />
            <section className="flex flex-col items-center">
                <button 
                id="confirm-schedule"
                className="bg-blue-500 hover:bg-blue-600 py-1 text-white font-semibold border border-gray-300 rounded-md shadow-md h-10 w-full md:w-48 mt-4">Agendar</button>
            </section>            
        </section>
    )
}