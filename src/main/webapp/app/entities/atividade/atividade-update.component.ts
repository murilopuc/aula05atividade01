import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAtividade } from 'app/shared/model/atividade.model';
import { AtividadeService } from './atividade.service';
import { IEntrega } from 'app/shared/model/entrega.model';
import { EntregaService } from 'app/entities/entrega';
import { INota } from 'app/shared/model/nota.model';
import { NotaService } from 'app/entities/nota';
import { IDisciplina } from 'app/shared/model/disciplina.model';
import { DisciplinaService } from 'app/entities/disciplina';

@Component({
    selector: 'jhi-atividade-update',
    templateUrl: './atividade-update.component.html'
})
export class AtividadeUpdateComponent implements OnInit {
    atividade: IAtividade;
    isSaving: boolean;

    entregas: IEntrega[];

    notas: INota[];

    disciplinas: IDisciplina[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected atividadeService: AtividadeService,
        protected entregaService: EntregaService,
        protected notaService: NotaService,
        protected disciplinaService: DisciplinaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ atividade }) => {
            this.atividade = atividade;
        });
        this.entregaService.query({ filter: 'atividade-is-null' }).subscribe(
            (res: HttpResponse<IEntrega[]>) => {
                if (!this.atividade.entrega || !this.atividade.entrega.id) {
                    this.entregas = res.body;
                } else {
                    this.entregaService.find(this.atividade.entrega.id).subscribe(
                        (subRes: HttpResponse<IEntrega>) => {
                            this.entregas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.notaService.query().subscribe(
            (res: HttpResponse<INota[]>) => {
                this.notas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.disciplinaService.query().subscribe(
            (res: HttpResponse<IDisciplina[]>) => {
                this.disciplinas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.atividade.id !== undefined) {
            this.subscribeToSaveResponse(this.atividadeService.update(this.atividade));
        } else {
            this.subscribeToSaveResponse(this.atividadeService.create(this.atividade));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAtividade>>) {
        result.subscribe((res: HttpResponse<IAtividade>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEntregaById(index: number, item: IEntrega) {
        return item.id;
    }

    trackNotaById(index: number, item: INota) {
        return item.id;
    }

    trackDisciplinaById(index: number, item: IDisciplina) {
        return item.id;
    }
}
