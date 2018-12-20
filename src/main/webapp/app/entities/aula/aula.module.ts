import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from 'app/shared';
import {
    AulaComponent,
    AulaDetailComponent,
    AulaUpdateComponent,
    AulaDeletePopupComponent,
    AulaDeleteDialogComponent,
    aulaRoute,
    aulaPopupRoute
} from './';

const ENTITY_STATES = [...aulaRoute, ...aulaPopupRoute];

@NgModule({
    imports: [MyAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AulaComponent, AulaDetailComponent, AulaUpdateComponent, AulaDeleteDialogComponent, AulaDeletePopupComponent],
    entryComponents: [AulaComponent, AulaUpdateComponent, AulaDeleteDialogComponent, AulaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppAulaModule {}
