import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INota } from 'app/shared/model/nota.model';
import { NotaService } from './nota.service';
import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from 'app/entities/aluno';
import { IAtividade } from 'app/shared/model/atividade.model';
import { AtividadeService } from 'app/entities/atividade';

@Component({
    selector: 'jhi-nota-update',
    templateUrl: './nota-update.component.html'
})
export class NotaUpdateComponent implements OnInit {
    nota: INota;
    isSaving: boolean;

    alunos: IAluno[];

    atividades: IAtividade[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected notaService: NotaService,
        protected alunoService: AlunoService,
        protected atividadeService: AtividadeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nota }) => {
            this.nota = nota;
        });
        this.alunoService.query({ filter: 'nota-is-null' }).subscribe(
            (res: HttpResponse<IAluno[]>) => {
                if (!this.nota.aluno || !this.nota.aluno.id) {
                    this.alunos = res.body;
                } else {
                    this.alunoService.find(this.nota.aluno.id).subscribe(
                        (subRes: HttpResponse<IAluno>) => {
                            this.alunos = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.atividadeService.query({ filter: 'nota-is-null' }).subscribe(
            (res: HttpResponse<IAtividade[]>) => {
                if (!this.nota.atividade || !this.nota.atividade.id) {
                    this.atividades = res.body;
                } else {
                    this.atividadeService.find(this.nota.atividade.id).subscribe(
                        (subRes: HttpResponse<IAtividade>) => {
                            this.atividades = [subRes.body].concat(res.body);
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
        if (this.nota.id !== undefined) {
            this.subscribeToSaveResponse(this.notaService.update(this.nota));
        } else {
            this.subscribeToSaveResponse(this.notaService.create(this.nota));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INota>>) {
        result.subscribe((res: HttpResponse<INota>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAlunoById(index: number, item: IAluno) {
        return item.id;
    }

    trackAtividadeById(index: number, item: IAtividade) {
        return item.id;
    }
}
