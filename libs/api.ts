export interface IApiRes {
    status: string; // Status of the API request
    page: number; // Current page number
    per_page: number; // Number of items returned per page
    total: number; // Total number of items available
    total_pages: number; // Total number of pages available
    data: ProductData; // The data object containing products
}