import { useState } from "react";
import Input from "../FormInputs/Input";

export default function ForgotPasswordForm({email, setEmail}) {

    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input 
                    labelText="E-mail"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
            </div>
        </form>)
};
