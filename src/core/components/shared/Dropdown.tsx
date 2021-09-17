import { FC, useState } from 'react';

// interfaces
import { ISelectInput } from '@core/interfaces/select-input.interface';
import { IType } from '../../../modules/search/interfaces/search.interface';

const SelectInput: FC<ISelectInput> = ({ options, type, setType }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onIsOpen = () => {
        setIsOpen(isOpen => !isOpen);
    };

    const onItemSelect = (option: IType) => {
        setType(option);
        setIsOpen(false);
    };

    /* w-36  */

    return (
        <div className="relative border-l-2 py-1 px-4">
            <div
                className="w-18 flex items-center cursor-pointer"
                onClick={() => onIsOpen()}
            >
                <span className="font-bold text-sm mr-3">
                    {type ? type.label : 'Type'}
                </span>
                <i
                    className={`text-sm fas fa-chevron-down ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                ></i>
            </div>
            <div
                className={`${
                    isOpen ? 'block' : 'hidden'
                } absolute w-32 top-14 left-3 bg-white rounded-lg shadow-2xl cursor-pointer z-10`}
            >
                <ul className="py-4">
                    {options.map(option => (
                        <li
                            key={option.id}
                            className="text-sm text-center text-black hover:text-white hover:bg-yellow-400 py-1"
                            onClick={() => onItemSelect(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SelectInput;
