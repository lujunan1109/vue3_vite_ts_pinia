export interface TableItemType {
    [key: string]: any;
}

export interface ColumnsType {
    prop: string;
    label: string;
    width?: string;
    sortable?: boolean;
    formatter?: (
        row: any,
        column: TableColumnCtx<any>,
        cellValue: any,
        index: number,
    ) => string;
}

export type PaginationType = {
    currentPage: number;
    pageSize: number;
    total: number;
    pageSizes?: number[];
    layout: string;
    background?: boolean;
};

interface PramasType {
    [key: string]: string | number | boolean | undefined | array | object;
}
export type MyFunction = (data: PramasType) => Promise<any>;

export type FilAttrType = {
    [key: string]: string | number | boolean;
};
