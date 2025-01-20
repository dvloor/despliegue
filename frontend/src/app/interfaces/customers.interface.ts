export interface Customer {
    id?: number;
    name: String;
    lastname: String;
    email: String;
    phone: String;
    signin_date: Date;
    editing?:boolean;
}
