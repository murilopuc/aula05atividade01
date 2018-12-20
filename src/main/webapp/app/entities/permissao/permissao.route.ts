import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Permissao } from 'app/shared/model/permissao.model';
import { PermissaoService } from './permissao.service';
import { PermissaoComponent } from './permissao.component';
import { PermissaoDetailComponent } from './permissao-detail.component';
import { PermissaoUpdateComponent } from './permissao-update.component';
import { PermissaoDeletePopupComponent } from './permissao-delete-dialog.component';
import { IPermissao } from 'app/shared/model/permissao.model';

@Injectable({ providedIn: 'root' })
export class PermissaoResolve implements Resolve<IPermissao> {
    constructor(private service: PermissaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Permissao> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Permissao>) => response.ok),
                map((permissao: HttpResponse<Permissao>) => permissao.body)
            );
        }
        return of(new Permissao());
    }
}

export const permissaoRoute: Routes = [
    {
        path: 'permissao',
        component: PermissaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.permissao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'permissao/:id/view',
        component: PermissaoDetailComponent,
        resolve: {
            permissao: PermissaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.permissao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'permissao/new',
        component: PermissaoUpdateComponent,
        resolve: {
            permissao: PermissaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.permissao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'permissao/:id/edit',
        component: PermissaoUpdateComponent,
        resolve: {
            permissao: PermissaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.permissao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const permissaoPopupRoute: Routes = [
    {
        path: 'permissao/:id/delete',
        component: PermissaoDeletePopupComponent,
        resolve: {
            permissao: PermissaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.permissao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
