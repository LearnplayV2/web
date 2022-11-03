import Cookies from 'universal-cookie';

class HandleCookie {

    static cookies = new Cookies();
    static months = (quantity: number) => 2592000 * quantity;

    static cookieName = {
        token: 'lp_token'
    }

    static setAuth(token: string) {
        this.cookies.set(this.cookieName.token, token, {path: '/', maxAge: this.months(3) } );
    }

}

export {HandleCookie};