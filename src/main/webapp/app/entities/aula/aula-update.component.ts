import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAula } from 'app/shared/model/aula.model';
import { AulaService } from './aula.service';
import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from 'app/entities/turma';
import { IFalta } from 'app/shared/model/falta.model';
import { FaltaService } from 'app/entities/falta';
import { IPeriodoLetivo } from 'app/shared/model/periodo-letivo.model';
import { PeriodoLetivoService } from 'app/entities/periodo-letivo';

@Component({
    selector: 'jhi-aula-update',
    templateUrl: './aula-update.component.html'
})
export class AulaUpdateComponent implements OnInit {
    aula: IAula;
    isSaving: boolean;

    turmas: ITurma[];

    faltas: IFalta[];

    periodoletivos: IPeriodoLetivo[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected aulaService: AulaService,
        protected turmaService: TurmaService,
        protected faltaService: FaltaService,
        protected periodoLetivoService: PeriodoLetivoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ aula }) => {
            this.aula = aula;
        });
        this.turmaService.query({ filter: 'aula-is-null' }).subscribe(
            (res: HttpResponse<ITurma[]>) => {
                if (!this.aula.turma || !this.aula.turma.id) {
                    this.turmas = res.body;
                } else {
                    this.turmaService.find(this.aula.turma.id).subscribe(
                        (subRes: HttpResponse<ITurma>) => {
                            this.turmas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.faltaService.query().subscribe(
            (res: HttpResponse<IFalta[]>) => {
                this.faltas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.periodoLetivoService.query().subscribe(
            (res: HttpResponse<IPeriodoLetivo[]>) => {
                this.periodoletivos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.aula.id !== undefined) {
            this.subscribeToSaveResponse(this.aulaService.update(this.aula));
        } else {
            this.subscribeToSaveResponse(this.aulaService.create(this.aula));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAula>>) {
        result.subscribe((res: HttpResponse<IAula>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTurmaById(index: number, item: ITurma) {
        return item.id;
    }

    trackFaltaById(index: number, item: IFalta) {
        return item.id;
    }

    trackPeriodoLetivoById(index: number, item: IPeriodoLetivo) {
        return item.id;
    }
}
