import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFalta } from 'app/shared/model/falta.model';

type EntityResponseType = HttpResponse<IFalta>;
type EntityArrayResponseType = HttpResponse<IFalta[]>;

@Injectable({ providedIn: 'root' })
export class FaltaService {
    public resourceUrl = SERVER_API_URL + 'api/faltas';

    constructor(protected http: HttpClient) {}

    create(falta: IFalta): Observable<EntityResponseType> {
        return this.http.post<IFalta>(this.resourceUrl, falta, { observe: 'response' });
    }

    update(falta: IFalta): Observable<EntityResponseType> {
        return this.http.put<IFalta>(this.resourceUrl, falta, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFalta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFalta[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
