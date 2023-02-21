import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface rsaOutputWithKey {
    eulerTotient: number;
    totientComponents: number[];
    primeFactors: number[];
    divisorFormatList: number[][];
    extendedGCDList: number[][];
    exception: number;
}

export interface rsaOutputWithPrimes {
    eulerTotient: number;
    totientComponents: number[];
    divisorFormatList: number[][];
    extendedGCDList: number[][];
    exception: number;
}

@Injectable({providedIn: "root"})
export class RSAService {
    private apiBaseUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {

    }

    public sendRSAWithKeyRequest(
        encryptKey: number,
        N: number
    ): Observable<rsaOutputWithKey> {
        const params = new HttpParams()
            .set('encryptKey', encryptKey)
            .set('N', N);

        return this.httpClient.get<rsaOutputWithKey>(this.apiBaseUrl + 'rsaWithKey', {params});
    }

    public sendRSAWithPrimesRequest(
        p: number,
        q: number,
        encryptKey: number
    ): Observable<rsaOutputWithPrimes> {
        const params = new HttpParams()
            .set('primeP', p)
            .set('primeQ', q)
            .set('encryptKey', encryptKey);

        return this.httpClient.get<rsaOutputWithPrimes>(this.apiBaseUrl + 'rsaWithPrimes', {params});
    }

    public sendGenerateRSAPrimesSetRequest(
        min: number,
        max: number
    ): Observable<number[]> {
        const params = new HttpParams()
            .set('min', min)
            .set('max', max);

        return this.httpClient.get<number[]>(this.apiBaseUrl + 'generateRSAPrimesSet', {params});
    }

    public sendGenerateRSAKeySetRequest(
        min: number,
        max: number
    ): Observable<number[]> {
        const params = new HttpParams()
            .set('min', min)
            .set('max', max);

        return this.httpClient.get<number[]>(this.apiBaseUrl + 'generateRSAKeySet', {params});
    }
}
