export type GetRequest = {
    page: number;
    pageSize: number;
    filter?: {
        [key: string]: string;
    };
};
