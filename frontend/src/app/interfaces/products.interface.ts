export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discount_price: number;
    stock: number;
    brand: { id:number,name: string };
    size: { id:number, size: string };
    category: { id:number, name: string };
    editing?:boolean
}
