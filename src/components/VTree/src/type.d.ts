export interface TreeDataType {
  id: number;
  label: string;
  [key:string]: any;
  children?: TreeDataType[];
}

export type DefaultPropsType = {
  label: string;
  children:string;
}