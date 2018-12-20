import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDisciplina } from 'app/shared/model/disciplina.model';
import { DisciplinaService } from './disciplina.service';
import { IProfessor } from 'app/shared/model/professor.model';
import { ProfessorService } from 'app/entities/professor';
import { IAtividade } from 'app/shared/model/atividade.model';
import { AtividadeService } from 'app/entities/atividade';

@Component({
    selector: 'jhi-disciplina-update',
    templateUrl: './disciplina-update.component.html'
})
export class DisciplinaUpdateComponent implements OnInit {
    disciplina: IDisciplina;
    isSaving: boolean;

    professors: IProfessor[];

    atividades: IAtividade[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected disciplinaService: DisciplinaService,
        protected professorService: ProfessorService,
        protected atividadeService: AtividadeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ disciplina }) => {
            this.disciplina = disciplina;
        });
        this.professorService.query({ filter: 'disciplina-is-null' }).subscribe(
            (res: HttpResponse<IProfessor[]>) => {
                if (!this.disciplina.professor || !this.disciplina.professor.id) {
                    this.professors = res.body;
                } else {
                    this.professorService.find(this.disciplina.professor.id).subscribe(
                        (subRes: HttpResponse<IProfessor>) => {
                            this.professors = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.atividadeService.query({ filter: 'disciplina-is-null' }).subscribe(
            (res: HttpResponse<IAtividade[]>) => {
                if (!this.disciplina.atividade || !this.disciplina.atividade.id) {
                    this.atividades = res.body;
                } else {
                    this.atividadeService.find(this.disciplina.atividade.id).subscribe(
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
        if (this.disciplina.id !== undefined) {
            this.subscribeToSaveResponse(this.disciplinaService.update(this.disciplina));
        } else {
            this.subscribeToSaveResponse(this.disciplinaService.create(this.disciplina));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisciplina>>) {
        result.subscribe((res: HttpResponse<IDisciplina>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProfessorById(index: number, item: IProfessor) {
        return item.id;
    }

    trackAtividadeById(index: number, item: IAtividade) {
        return item.id;
    }
}
