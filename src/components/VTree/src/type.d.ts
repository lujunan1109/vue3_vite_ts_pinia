export interface TreeDataType {
    [key: string]: any;
    children?: TreeDataType[];
}

export type DefaultPropsType = {
    label: string;
    children: string;
};
