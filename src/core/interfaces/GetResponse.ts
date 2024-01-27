export type GetResponse<T> = {
    data: T[];
    page: {
        elements: number;
        totalElements: number;
        number: number;
    };
};

export type GetResponseRepository<T> = {
    data: T[];
    total: number;
};
