import { FC, MouseEventHandler } from 'react';

interface ICheckbox {
    checkedIcon: string;
    uncheckedIcon: string;
    isOnWatchlist: boolean;
    onAddToWatchlist: () => void;
}

const Checkbox: FC<ICheckbox> = ({
    checkedIcon,
    uncheckedIcon,
    isOnWatchlist,
    onAddToWatchlist,
}) => {
    const handleBtnClick: MouseEventHandler<HTMLDivElement> = () => {
        onAddToWatchlist();
    };

    return (
        <div
            className="absolute top-3 right-6 flex items-center justify-center w-9 h-9 bg-black bg-opacity-60 rounded-md transition-all duration-300 ease-in-out cursor-pointer hover:bg-opacity-100"
            onClick={handleBtnClick}
        >
            <i
                className={
                    isOnWatchlist
                        ? `${checkedIcon} text-yellow-400`
                        : `${uncheckedIcon} text-white`
                }
            ></i>
        </div>
    );
};

export default Checkbox;
