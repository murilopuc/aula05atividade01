import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPermissao } from 'app/shared/model/permissao.model';

type EntityResponseType = HttpResponse<IPermissao>;
type EntityArrayResponseType = HttpResponse<IPermissao[]>;

@Injectable({ providedIn: 'root' })
export class PermissaoService {
    public resourceUrl = SERVER_API_URL + 'api/permissaos';

    constructor(protected http: HttpClient) {}

    create(permissao: IPermissao): Observable<EntityResponseType> {
        return this.http.post<IPermissao>(this.resourceUrl, permissao, { observe: 'response' });
    }

    update(permissao: IPermissao): Observable<EntityResponseType> {
        return this.http.put<IPermissao>(this.resourceUrl, permissao, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPermissao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPermissao[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
