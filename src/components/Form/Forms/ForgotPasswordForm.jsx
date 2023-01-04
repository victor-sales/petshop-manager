import Input from "../FormInputs/Input";

export default function ForgotPasswordForm(params) {
    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input 
                    labelText="E-mail"
                    id="email"
                    />
                
            </div>
        </form>)
};
