import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFalta } from 'app/shared/model/falta.model';

@Component({
    selector: 'jhi-falta-detail',
    templateUrl: './falta-detail.component.html'
})
export class FaltaDetailComponent implements OnInit {
    falta: IFalta;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ falta }) => {
            this.falta = falta;
        });
    }

    previousState() {
        window.history.back();
    }
}
