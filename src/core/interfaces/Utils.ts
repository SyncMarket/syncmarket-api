export type SearchByProperty<T> = {
    property: keyof T;
    target: string;
    items: T[];
};
