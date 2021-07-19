import { Dispatch, SetStateAction } from "react";
import { IType } from '../../modules/search/interfaces/search.interface';

export interface ISearchInput {
    icon: string;
    placeholder: string;
    term: string | null;
    type: IType | null;
    setTerm: Dispatch<SetStateAction<string|null>>;
    setType: Dispatch<SetStateAction<IType|null>>;
}