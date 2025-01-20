export interface OrderDetail {
    id?:number
    order: {
        id?:number
        customer: {
            name: string;
            lastname: string;
        };
        order_date: Date;
        total_price: number;
        status: string;
    };
    quantity: number;
    unit_price: number;
    product: {
        name: string;
        description: string;
        price: number;
        discount_price: number;
        stock:number;

    };
}
// esto ya no va, lo simplifique en order, interface