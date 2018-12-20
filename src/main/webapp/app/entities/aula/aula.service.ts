import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAula } from 'app/shared/model/aula.model';

type EntityResponseType = HttpResponse<IAula>;
type EntityArrayResponseType = HttpResponse<IAula[]>;

@Injectable({ providedIn: 'root' })
export class AulaService {
    public resourceUrl = SERVER_API_URL + 'api/aulas';

    constructor(protected http: HttpClient) {}

    create(aula: IAula): Observable<EntityResponseType> {
        return this.http.post<IAula>(this.resourceUrl, aula, { observe: 'response' });
    }

    update(aula: IAula): Observable<EntityResponseType> {
        return this.http.put<IAula>(this.resourceUrl, aula, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAula>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAula[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
