import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from 'app/shared';
import {
    PeriodoLetivoComponent,
    PeriodoLetivoDetailComponent,
    PeriodoLetivoUpdateComponent,
    PeriodoLetivoDeletePopupComponent,
    PeriodoLetivoDeleteDialogComponent,
    periodoLetivoRoute,
    periodoLetivoPopupRoute
} from './';

const ENTITY_STATES = [...periodoLetivoRoute, ...periodoLetivoPopupRoute];

@NgModule({
    imports: [MyAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PeriodoLetivoComponent,
        PeriodoLetivoDetailComponent,
        PeriodoLetivoUpdateComponent,
        PeriodoLetivoDeleteDialogComponent,
        PeriodoLetivoDeletePopupComponent
    ],
    entryComponents: [
        PeriodoLetivoComponent,
        PeriodoLetivoUpdateComponent,
        PeriodoLetivoDeleteDialogComponent,
        PeriodoLetivoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppPeriodoLetivoModule {}
