import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Falta } from 'app/shared/model/falta.model';
import { FaltaService } from './falta.service';
import { FaltaComponent } from './falta.component';
import { FaltaDetailComponent } from './falta-detail.component';
import { FaltaUpdateComponent } from './falta-update.component';
import { FaltaDeletePopupComponent } from './falta-delete-dialog.component';
import { IFalta } from 'app/shared/model/falta.model';

@Injectable({ providedIn: 'root' })
export class FaltaResolve implements Resolve<IFalta> {
    constructor(private service: FaltaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Falta> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Falta>) => response.ok),
                map((falta: HttpResponse<Falta>) => falta.body)
            );
        }
        return of(new Falta());
    }
}

export const faltaRoute: Routes = [
    {
        path: 'falta',
        component: FaltaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.falta.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'falta/:id/view',
        component: FaltaDetailComponent,
        resolve: {
            falta: FaltaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.falta.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'falta/new',
        component: FaltaUpdateComponent,
        resolve: {
            falta: FaltaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.falta.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'falta/:id/edit',
        component: FaltaUpdateComponent,
        resolve: {
            falta: FaltaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.falta.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const faltaPopupRoute: Routes = [
    {
        path: 'falta/:id/delete',
        component: FaltaDeletePopupComponent,
        resolve: {
            falta: FaltaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.falta.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
