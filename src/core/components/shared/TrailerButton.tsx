import { FC } from 'react';
interface ITrailerButton {
    icon: string;
    label: string;
    position: string;
    title: string | undefined;
}

const TrailerButton: FC<ITrailerButton> = ({
    icon,
    label,
    position,
    title,
}) => {
    const onPlayTrailer = () => {};

    return (
        <div className="mt-4 cursor-pointer" onClick={onPlayTrailer}>
            <span>
                {position === 'left' && (
                    <i className={`${icon} text-yellow-400`}></i>
                )}
                <span className="text-lg text-white font-bold mx-3">
                    {label}
                </span>
                {position === 'right' && (
                    <i className={`${icon} text-yellow-400`}></i>
                )}
            </span>
        </div>
    );
};

export default TrailerButton;
