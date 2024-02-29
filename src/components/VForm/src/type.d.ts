export type FormOptionType = Partial<FormOption>;

export interface FormOption {
    label: string;
    prop: string;
    componentName?: string;
    value: string | number | boolean | null;
    name: string;
    childName: string;
    attrs: {
        [key: string]: any;
    };
    slotName: string;
    children: FormItemChildType[];
    extraLab: string;
    extraProp: string;
}

export interface RuleForm {
    [key: string]:
        | string
        | string[]
        | number
        | { [key: string]: string }
        | boolean
        | null;
}

export type defineRenderComponentType = {
    [key: string]: ComponentOptions;
};

export type FormItemChildType = {
    label: string;
    value?: string;
    name?: string;
};

export type Arrayable<T> = T | T[];

type Partial<T> = { [P in keyof T]?: T[P] };

// type PartialPerson = Partial<Person>;

// 等价于：
// type PartialPerson = {
//   name?: string;
//   age?: number;
//   email?: string;
// };
