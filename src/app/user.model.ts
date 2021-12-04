export class User{
    constructor(private _token:any){}
    get token(){
        return this._token;
    }
}