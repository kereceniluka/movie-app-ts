import { FC } from 'react';

interface ITrailerButton {
    icon: string;
    label: string;
    position: string;
}

const TrailerButton: FC<ITrailerButton> = ({ icon, label, position }) => {
    return (
        <div className="mt-4 cursor-pointer">
            <span>
                {position === 'left' && <i className={`${icon} text-yellow-400`}></i>}
                <span className="text-lg text-white font-bold mx-3">{label}</span>
                {position === 'right' && <i className={`${icon} text-yellow-400`}></i>}
            </span>
        </div>
    );
}

export default TrailerButton;
