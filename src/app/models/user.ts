export class User {
    uid: string;
    username?: string;
    password: string;
    carts?: [{Comida,Object}];
    email: string;
    roles?: {
        admin: boolean,
        client: boolean
    };

}
