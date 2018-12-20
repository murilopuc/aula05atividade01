import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from 'app/shared';
import {
    EntregaComponent,
    EntregaDetailComponent,
    EntregaUpdateComponent,
    EntregaDeletePopupComponent,
    EntregaDeleteDialogComponent,
    entregaRoute,
    entregaPopupRoute
} from './';

const ENTITY_STATES = [...entregaRoute, ...entregaPopupRoute];

@NgModule({
    imports: [MyAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EntregaComponent,
        EntregaDetailComponent,
        EntregaUpdateComponent,
        EntregaDeleteDialogComponent,
        EntregaDeletePopupComponent
    ],
    entryComponents: [EntregaComponent, EntregaUpdateComponent, EntregaDeleteDialogComponent, EntregaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppEntregaModule {}
