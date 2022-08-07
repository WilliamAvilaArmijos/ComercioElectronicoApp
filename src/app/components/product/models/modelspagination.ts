export interface ProductDto {
    id: string;
    name: string;
    description: string;
    price: number;
    productType: string;
    brand: string;
}

export interface PagedResultDto<T> {
    total: number;
    items: ProductDto[];
}