import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from 'app/shared';
import {
    FaltaComponent,
    FaltaDetailComponent,
    FaltaUpdateComponent,
    FaltaDeletePopupComponent,
    FaltaDeleteDialogComponent,
    faltaRoute,
    faltaPopupRoute
} from './';

const ENTITY_STATES = [...faltaRoute, ...faltaPopupRoute];

@NgModule({
    imports: [MyAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [FaltaComponent, FaltaDetailComponent, FaltaUpdateComponent, FaltaDeleteDialogComponent, FaltaDeletePopupComponent],
    entryComponents: [FaltaComponent, FaltaUpdateComponent, FaltaDeleteDialogComponent, FaltaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppFaltaModule {}
