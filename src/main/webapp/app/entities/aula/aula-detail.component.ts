import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAula } from 'app/shared/model/aula.model';

@Component({
    selector: 'jhi-aula-detail',
    templateUrl: './aula-detail.component.html'
})
export class AulaDetailComponent implements OnInit {
    aula: IAula;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ aula }) => {
            this.aula = aula;
        });
    }

    previousState() {
        window.history.back();
    }
}
