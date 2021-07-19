export type IType = { id: number; value: string; label: string; };

export interface ISearchContext {
    term: string | null;
    type: IType | null;
}