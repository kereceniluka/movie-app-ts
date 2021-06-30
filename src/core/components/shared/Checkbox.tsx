import { FC, useState, MouseEventHandler } from 'react';
import './Checkbox.scss';

/* interface ICheckbox {
    checkedIcon: string;
    uncheckedIcon: string;
} */

const Checkbox: FC = () => {

    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleBtnClick: MouseEventHandler<HTMLDivElement> = () => {
        setIsClicked(isClicked => !isClicked);
    }

    return (
        <div className="absolute top-3 right-4 flex items-center justify-center w-9 h-9 bg-black bg-opacity-60 rounded-md transition-all duration-300 ease-in-out cursor-pointer hover:bg-opacity-100" onClick={handleBtnClick}>
            <i className={isClicked ? `checked` : `unchecked`}></i>
        </div>
    );
}

export default Checkbox;
