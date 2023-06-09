import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

export interface GaussOutput {
    matrixHistory: {den: string, num: string}[][][];
    matrixOperations: string[];
    operationsOnPass: number[];
    eqSysTranformationHistory: {den: string, num: string}[][][];
    containsIllegalEquation: boolean;
    foundVariables: number[];
}

@Injectable({providedIn: "root"})
export class GaussAlgoService {
    private apiBaseUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    public sendGaussRequest(
        m: number,
        n: number,
        matrixElements: string[]
    ): Observable<GaussOutput> {
        const params = new HttpParams()
            .set('m', m)
            .set('n', n)
            .set('matrixElements', matrixElements.toString());

        return this.httpClient.get<GaussOutput>(this.apiBaseUrl + 'gauss', {params});
    }

}

@Injectable({providedIn: "root"})
export class RandomGaussMatrix {
    private apiBaseUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    public sendRandomMatrixRequest(
        max: number,
        useFractions: boolean,
        m: number,
        n: number,
        numOfFreeVars: number
    ): Observable<string[]> {
        const params = new HttpParams()
            .set('max', max)
            .set('useFractions', useFractions)
            .set('m', m)
            .set('n', n)
            .set('numOfFreeVars', numOfFreeVars);

        return this.httpClient.get<string[]>(this.apiBaseUrl + 'randomGaussMatrix', {params});
    }

}
