import { Dispatch, SetStateAction } from "react";
import { IType } from '../../modules/search/interfaces/search.interface';

export interface ISelectInput {
    options: {
        id: number;
        value: string;
        label: string;
    }[];
    type: IType | null;
    setType: Dispatch<SetStateAction<IType | null>>;
}