export interface IApiRes {
    status: string;
    page: number; 
    per_page: number; 
    total: number; 
    total_pages: number; 
    data: ProductData; 
}