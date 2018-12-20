import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPermissao } from 'app/shared/model/permissao.model';

@Component({
    selector: 'jhi-permissao-detail',
    templateUrl: './permissao-detail.component.html'
})
export class PermissaoDetailComponent implements OnInit {
    permissao: IPermissao;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ permissao }) => {
            this.permissao = permissao;
        });
    }

    previousState() {
        window.history.back();
    }
}
