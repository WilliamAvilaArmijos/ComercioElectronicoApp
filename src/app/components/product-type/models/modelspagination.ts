export interface ProductTypeDto {
    code: string;
    description: string;
    creationDate: Date;
}

export interface PagedResultProductTypeDto<T> {
    total: number;
    items: ProductTypeDto[];
}