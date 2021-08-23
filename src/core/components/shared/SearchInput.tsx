import { FC, ChangeEvent } from 'react';

// components
import Dropdown from '@core/components/shared/Dropdown';

// interfaces
import { ISearchInput } from '@core/interfaces/search-input.interface';

const options = [
    { id: 0, value: 'movie', label: 'Movie' },
    { id: 1, value: 'tv', label: 'TV Show' },
    { id: 2, value: 'person', label: 'People' },
];

const SearchInput: FC<ISearchInput> = ({
    icon,
    placeholder,
    term,
    setTerm,
    type,
    setType,
}) => {
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    };

    return (
        <div className="h-14 lg:h-16 lg:w-3/6 flex items-center justify-between bg-white rounded-lg shadow-2xl px-3">
            <i className={`${icon} text-gray-300`}></i>
            <input
                className="flex-1 h-full text-base font-bold text-gray-300 px-2"
                type="text"
                placeholder={placeholder}
                onChange={e => onInputChange(e)}
            />
            <Dropdown options={options} type={type} setType={setType} />
        </div>
    );
};

export default SearchInput;
