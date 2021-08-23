import { FC } from 'react';

interface IButton {
    type: 'submit' | 'reset' | 'button';
    label: string;
}

const Button: FC<IButton> = ({ type, label }) => {
    return (
        <button
            className="w-full block bg-yellow-500 font-bold text-lg p-2 rounded-lg hover:text-white"
            type={type}
        >
            {label}
        </button>
    );
};

export default Button;
