import { FC, useState } from 'react';

// interfaces
import { ISelectInput } from '@core/interfaces/select-input.interface';
import { IType } from '../../../modules/search/interfaces/search.interface';


const SelectInput: FC<ISelectInput> = ({ options, type, setType }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onIsOpen = () => {
        setIsOpen(isOpen => !isOpen);
    }

    const onItemSelect = (option: IType) => {
        setType(option);
        setIsOpen(false);
    }

    return (
        <div className="w-36 relative border-l-2 py-1">
            <div className="flex items-center justify-between cursor-pointer px-6" onClick={() => onIsOpen()}>
                <span className="font-bold">{type ? type.label : 'Type'}</span>
                <i className={`fas fa-chevron-down ${isOpen ? 'transform rotate-180' : ''}`}></i>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} absolute w-full top-14 bg-white rounded-lg shadow-2xl cursor-pointer z-10`}>
                <ul className="py-4">
                    {options.map(option => (
                        <li key={option.id} className="text-black hover:text-white hover:bg-yellow-400 px-6 py-1" onClick={() => onItemSelect(option)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SelectInput;
