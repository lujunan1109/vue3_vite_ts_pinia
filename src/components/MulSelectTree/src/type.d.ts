export interface Node {
    id: number;
    label: string;
    children?: Node[];
}

export type CheckIDType = number | string;

export type DefaultPropsType = {
    label: string;
    children: string;
};
