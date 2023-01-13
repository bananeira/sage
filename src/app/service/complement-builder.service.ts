import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({providedIn:"root"})
export class ComplementBuilderService {
    constructor(private httpClient: HttpClient) {

    }

    public sendComplementBuilderRequest(): Observable<{status: string, message: string}> {
        const params = new HttpParams();

        params.append('length', 5);
        params.append('radix', 2);
        params.append('string', "0110110");

        console.log(params);

        return this.httpClient.get<{status: string, message: string}>('', {params});
    }
}
