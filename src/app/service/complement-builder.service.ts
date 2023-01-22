import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

export interface Output {
    status: string,
    text: string
}

@Injectable({providedIn: "root"})
export class ComplementBuilderService {
    constructor(private httpClient: HttpClient) {

    }

    public sendComplementBuilderRequest(inputString: string, radix: number, length: number, getMinusOneComplement: boolean): Observable<Output> {
        const params = new HttpParams()
            .set('length', length)
            .set('radix', radix)
            .set('getMinusOneComplement', getMinusOneComplement)
            .set('inputString', inputString);

        return this.httpClient.get<Output>('complement', {params});
    }
}
