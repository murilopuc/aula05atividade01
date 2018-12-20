import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INota } from 'app/shared/model/nota.model';

type EntityResponseType = HttpResponse<INota>;
type EntityArrayResponseType = HttpResponse<INota[]>;

@Injectable({ providedIn: 'root' })
export class NotaService {
    public resourceUrl = SERVER_API_URL + 'api/notas';

    constructor(protected http: HttpClient) {}

    create(nota: INota): Observable<EntityResponseType> {
        return this.http.post<INota>(this.resourceUrl, nota, { observe: 'response' });
    }

    update(nota: INota): Observable<EntityResponseType> {
        return this.http.put<INota>(this.resourceUrl, nota, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INota>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INota[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
