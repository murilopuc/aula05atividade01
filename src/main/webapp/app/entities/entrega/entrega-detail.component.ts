import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntrega } from 'app/shared/model/entrega.model';

@Component({
    selector: 'jhi-entrega-detail',
    templateUrl: './entrega-detail.component.html'
})
export class EntregaDetailComponent implements OnInit {
    entrega: IEntrega;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entrega }) => {
            this.entrega = entrega;
        });
    }

    previousState() {
        window.history.back();
    }
}
