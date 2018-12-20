import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPeriodoLetivo } from 'app/shared/model/periodo-letivo.model';

@Component({
    selector: 'jhi-periodo-letivo-detail',
    templateUrl: './periodo-letivo-detail.component.html'
})
export class PeriodoLetivoDetailComponent implements OnInit {
    periodoLetivo: IPeriodoLetivo;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ periodoLetivo }) => {
            this.periodoLetivo = periodoLetivo;
        });
    }

    previousState() {
        window.history.back();
    }
}
