import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Aula } from 'app/shared/model/aula.model';
import { AulaService } from './aula.service';
import { AulaComponent } from './aula.component';
import { AulaDetailComponent } from './aula-detail.component';
import { AulaUpdateComponent } from './aula-update.component';
import { AulaDeletePopupComponent } from './aula-delete-dialog.component';
import { IAula } from 'app/shared/model/aula.model';

@Injectable({ providedIn: 'root' })
export class AulaResolve implements Resolve<IAula> {
    constructor(private service: AulaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Aula> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Aula>) => response.ok),
                map((aula: HttpResponse<Aula>) => aula.body)
            );
        }
        return of(new Aula());
    }
}

export const aulaRoute: Routes = [
    {
        path: 'aula',
        component: AulaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.aula.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aula/:id/view',
        component: AulaDetailComponent,
        resolve: {
            aula: AulaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.aula.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aula/new',
        component: AulaUpdateComponent,
        resolve: {
            aula: AulaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.aula.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aula/:id/edit',
        component: AulaUpdateComponent,
        resolve: {
            aula: AulaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.aula.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aulaPopupRoute: Routes = [
    {
        path: 'aula/:id/delete',
        component: AulaDeletePopupComponent,
        resolve: {
            aula: AulaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myApp.aula.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
