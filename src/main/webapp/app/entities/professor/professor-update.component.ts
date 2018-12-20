import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProfessor } from 'app/shared/model/professor.model';
import { ProfessorService } from './professor.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa';
import { IDisciplina } from 'app/shared/model/disciplina.model';
import { DisciplinaService } from 'app/entities/disciplina';
import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from 'app/entities/turma';

@Component({
    selector: 'jhi-professor-update',
    templateUrl: './professor-update.component.html'
})
export class ProfessorUpdateComponent implements OnInit {
    professor: IProfessor;
    isSaving: boolean;

    pessoas: IPessoa[];

    disciplinas: IDisciplina[];

    turmas: ITurma[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected professorService: ProfessorService,
        protected pessoaService: PessoaService,
        protected disciplinaService: DisciplinaService,
        protected turmaService: TurmaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ professor }) => {
            this.professor = professor;
        });
        this.pessoaService.query({ filter: 'professor-is-null' }).subscribe(
            (res: HttpResponse<IPessoa[]>) => {
                if (!this.professor.pessoa || !this.professor.pessoa.id) {
                    this.pessoas = res.body;
                } else {
                    this.pessoaService.find(this.professor.pessoa.id).subscribe(
                        (subRes: HttpResponse<IPessoa>) => {
                            this.pessoas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.disciplinaService.query().subscribe(
            (res: HttpResponse<IDisciplina[]>) => {
                this.disciplinas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.turmaService.query().subscribe(
            (res: HttpResponse<ITurma[]>) => {
                this.turmas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.professor.id !== undefined) {
            this.subscribeToSaveResponse(this.professorService.update(this.professor));
        } else {
            this.subscribeToSaveResponse(this.professorService.create(this.professor));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfessor>>) {
        result.subscribe((res: HttpResponse<IProfessor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPessoaById(index: number, item: IPessoa) {
        return item.id;
    }

    trackDisciplinaById(index: number, item: IDisciplina) {
        return item.id;
    }

    trackTurmaById(index: number, item: ITurma) {
        return item.id;
    }
}
