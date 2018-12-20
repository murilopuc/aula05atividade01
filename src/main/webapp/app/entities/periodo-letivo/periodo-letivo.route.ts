import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PeriodoLetivo } from 'app/shared/model/periodo-letivo.model';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { PeriodoLetivoComponent } from './periodo-letivo.component';
import { PeriodoLetivoDetailComponent } from './periodo-letivo-detail.component';
import { PeriodoLetivoUpdateComponent } from './periodo-letivo-update.component';
import { PeriodoLetivoDeletePopupComponent } from './periodo-letivo-delete-dialog.component';
import { IPeriodoLetivo } from 'app/shared/model/periodo-letivo.model';

@Injectable({ providedIn: 'root' })
export class PeriodoLetivoResolve implements Resolve<IPeriodoLetivo> {
    constructor(private service: PeriodoLetivoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PeriodoLetivo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PeriodoLetivo>) => response.ok),
                map((periodoLetivo: HttpResponse<PeriodoLetivo>) => periodoLetivo.body)
            );
        }
        return of(new PeriodoLetivo());
    }
}

export const periodoLetivoRoute: Routes = [
    {
        path: 'periodo-letivo',
        component: PeriodoLetivoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.periodoLetivo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'periodo-letivo/:id/view',
        component: PeriodoLetivoDetailComponent,
        resolve: {
            periodoLetivo: PeriodoLetivoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.periodoLetivo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'periodo-letivo/new',
        component: PeriodoLetivoUpdateComponent,
        resolve: {
            periodoLetivo: PeriodoLetivoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.periodoLetivo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'periodo-letivo/:id/edit',
        component: PeriodoLetivoUpdateComponent,
        resolve: {
            periodoLetivo: PeriodoLetivoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.periodoLetivo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const periodoLetivoPopupRoute: Routes = [
    {
        path: 'periodo-letivo/:id/delete',
        component: PeriodoLetivoDeletePopupComponent,
        resolve: {
            periodoLetivo: PeriodoLetivoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.periodoLetivo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
