import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPeriodoLetivo } from 'app/shared/model/periodo-letivo.model';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { IFalta } from 'app/shared/model/falta.model';
import { FaltaService } from 'app/entities/falta';
import { IAula } from 'app/shared/model/aula.model';
import { AulaService } from 'app/entities/aula';

@Component({
    selector: 'jhi-periodo-letivo-update',
    templateUrl: './periodo-letivo-update.component.html'
})
export class PeriodoLetivoUpdateComponent implements OnInit {
    periodoLetivo: IPeriodoLetivo;
    isSaving: boolean;

    faltas: IFalta[];

    aulas: IAula[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected periodoLetivoService: PeriodoLetivoService,
        protected faltaService: FaltaService,
        protected aulaService: AulaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ periodoLetivo }) => {
            this.periodoLetivo = periodoLetivo;
        });
        this.faltaService.query({ filter: 'periodoletivo-is-null' }).subscribe(
            (res: HttpResponse<IFalta[]>) => {
                if (!this.periodoLetivo.falta || !this.periodoLetivo.falta.id) {
                    this.faltas = res.body;
                } else {
                    this.faltaService.find(this.periodoLetivo.falta.id).subscribe(
                        (subRes: HttpResponse<IFalta>) => {
                            this.faltas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.aulaService.query({ filter: 'periodoletivo-is-null' }).subscribe(
            (res: HttpResponse<IAula[]>) => {
                if (!this.periodoLetivo.aula || !this.periodoLetivo.aula.id) {
                    this.aulas = res.body;
                } else {
                    this.aulaService.find(this.periodoLetivo.aula.id).subscribe(
                        (subRes: HttpResponse<IAula>) => {
                            this.aulas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.periodoLetivo.id !== undefined) {
            this.subscribeToSaveResponse(this.periodoLetivoService.update(this.periodoLetivo));
        } else {
            this.subscribeToSaveResponse(this.periodoLetivoService.create(this.periodoLetivo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeriodoLetivo>>) {
        result.subscribe((res: HttpResponse<IPeriodoLetivo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFaltaById(index: number, item: IFalta) {
        return item.id;
    }

    trackAulaById(index: number, item: IAula) {
        return item.id;
    }
}
