export interface IProduct {
    _id: string;
    category: string;
    subcategory: string;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    description: string;
    thumbnail: string;
    images: string[];
    slugname: string;
}

 export interface ICategory {
    [x: string]: Key | null | undefined;
    _id: string;
    name: string;
    icon: string;
    slugname: string;
}

export interface ISubcategory {
    _id: string;
    category: string;
    name: string;
    slugname: string;
}