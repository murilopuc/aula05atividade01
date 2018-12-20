import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPeriodoLetivo } from 'app/shared/model/periodo-letivo.model';

type EntityResponseType = HttpResponse<IPeriodoLetivo>;
type EntityArrayResponseType = HttpResponse<IPeriodoLetivo[]>;

@Injectable({ providedIn: 'root' })
export class PeriodoLetivoService {
    public resourceUrl = SERVER_API_URL + 'api/periodo-letivos';

    constructor(protected http: HttpClient) {}

    create(periodoLetivo: IPeriodoLetivo): Observable<EntityResponseType> {
        return this.http.post<IPeriodoLetivo>(this.resourceUrl, periodoLetivo, { observe: 'response' });
    }

    update(periodoLetivo: IPeriodoLetivo): Observable<EntityResponseType> {
        return this.http.put<IPeriodoLetivo>(this.resourceUrl, periodoLetivo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPeriodoLetivo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPeriodoLetivo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
