export type Tag = {
    name: string;
    type: string;
    checked: string;
    path: string;
};

export type Node = {
    path: string;
    label: string;
};

export type Func = () => void;
