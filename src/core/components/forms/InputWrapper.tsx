import { FC } from 'react';

interface IInputWrapper {
    flexDirection?: 'flex-row'|'flex-row-reverse'|'flex-col'|'flex-col-reverse';
}

const InputWrapper: FC<IInputWrapper> = ({ children, flexDirection }) => {
    return (
        <div className={`flex ${flexDirection} my-5`}>
            {children}
        </div>
    );
}

export default InputWrapper;
