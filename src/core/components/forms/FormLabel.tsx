import { FC } from 'react';

interface IFormLabel {
    htmlFor: string;
    label: string;
}

const FormLabel: FC<IFormLabel> = ({ htmlFor, label }) => {
    return (
        <label className="text-lg font-semibold text-black my-1" htmlFor={htmlFor}>{label}</label>
    );
}

export default FormLabel;
