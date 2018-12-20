import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntrega } from 'app/shared/model/entrega.model';

type EntityResponseType = HttpResponse<IEntrega>;
type EntityArrayResponseType = HttpResponse<IEntrega[]>;

@Injectable({ providedIn: 'root' })
export class EntregaService {
    public resourceUrl = SERVER_API_URL + 'api/entregas';

    constructor(protected http: HttpClient) {}

    create(entrega: IEntrega): Observable<EntityResponseType> {
        return this.http.post<IEntrega>(this.resourceUrl, entrega, { observe: 'response' });
    }

    update(entrega: IEntrega): Observable<EntityResponseType> {
        return this.http.put<IEntrega>(this.resourceUrl, entrega, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEntrega>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntrega[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
