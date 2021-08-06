import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface IFormInput {
    type: string;
    name: string;
    placeholder?: string;
}

const FormInput: FC<IFormInput> = ({ type, name, placeholder }) => {

    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <input className="h-12 border-2 border-solid border-gray-200 rounded-md text-gray-500 text-lg px-2" type={type} placeholder={placeholder} {...register(name)} />
            {errors && <p>{errors && errors[name]?.message}</p> }
        </>
    );
}

export default FormInput;