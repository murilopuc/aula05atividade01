import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from 'app/shared';
import {
    PermissaoComponent,
    PermissaoDetailComponent,
    PermissaoUpdateComponent,
    PermissaoDeletePopupComponent,
    PermissaoDeleteDialogComponent,
    permissaoRoute,
    permissaoPopupRoute
} from './';

const ENTITY_STATES = [...permissaoRoute, ...permissaoPopupRoute];

@NgModule({
    imports: [MyAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PermissaoComponent,
        PermissaoDetailComponent,
        PermissaoUpdateComponent,
        PermissaoDeleteDialogComponent,
        PermissaoDeletePopupComponent
    ],
    entryComponents: [PermissaoComponent, PermissaoUpdateComponent, PermissaoDeleteDialogComponent, PermissaoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppPermissaoModule {}
