import { Product } from "./products.interface";

export interface Order {
    id: number;
    customer_id: number;
    customer_name: string;
    customer_lastname: string;
    customer_email: string;
    customer_phone: string;
    order_date: string;
    status: 'Pendiente' | 'Enviado' | 'Completado';
    total_price: number;
    products: Product[];
}