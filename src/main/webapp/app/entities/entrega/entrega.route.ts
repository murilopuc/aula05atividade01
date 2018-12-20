import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Entrega } from 'app/shared/model/entrega.model';
import { EntregaService } from './entrega.service';
import { EntregaComponent } from './entrega.component';
import { EntregaDetailComponent } from './entrega-detail.component';
import { EntregaUpdateComponent } from './entrega-update.component';
import { EntregaDeletePopupComponent } from './entrega-delete-dialog.component';
import { IEntrega } from 'app/shared/model/entrega.model';

@Injectable({ providedIn: 'root' })
export class EntregaResolve implements Resolve<IEntrega> {
    constructor(private service: EntregaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Entrega> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Entrega>) => response.ok),
                map((entrega: HttpResponse<Entrega>) => entrega.body)
            );
        }
        return of(new Entrega());
    }
}

export const entregaRoute: Routes = [
    {
        path: 'entrega',
        component: EntregaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.entrega.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entrega/:id/view',
        component: EntregaDetailComponent,
        resolve: {
            entrega: EntregaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.entrega.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entrega/new',
        component: EntregaUpdateComponent,
        resolve: {
            entrega: EntregaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.entrega.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entrega/:id/edit',
        component: EntregaUpdateComponent,
        resolve: {
            entrega: EntregaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.entrega.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entregaPopupRoute: Routes = [
    {
        path: 'entrega/:id/delete',
        component: EntregaDeletePopupComponent,
        resolve: {
            entrega: EntregaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.entrega.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
