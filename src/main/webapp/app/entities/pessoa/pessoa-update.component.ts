import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from './pessoa.service';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario';
import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from 'app/entities/aluno';
import { IProfessor } from 'app/shared/model/professor.model';
import { ProfessorService } from 'app/entities/professor';

@Component({
    selector: 'jhi-pessoa-update',
    templateUrl: './pessoa-update.component.html'
})
export class PessoaUpdateComponent implements OnInit {
    pessoa: IPessoa;
    isSaving: boolean;

    usuarios: IUsuario[];

    alunos: IAluno[];

    professors: IProfessor[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected pessoaService: PessoaService,
        protected usuarioService: UsuarioService,
        protected alunoService: AlunoService,
        protected professorService: ProfessorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pessoa }) => {
            this.pessoa = pessoa;
        });
        this.usuarioService.query({ filter: 'pessoa-is-null' }).subscribe(
            (res: HttpResponse<IUsuario[]>) => {
                if (!this.pessoa.usuario || !this.pessoa.usuario.id) {
                    this.usuarios = res.body;
                } else {
                    this.usuarioService.find(this.pessoa.usuario.id).subscribe(
                        (subRes: HttpResponse<IUsuario>) => {
                            this.usuarios = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.alunoService.query().subscribe(
            (res: HttpResponse<IAluno[]>) => {
                this.alunos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.professorService.query().subscribe(
            (res: HttpResponse<IProfessor[]>) => {
                this.professors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pessoa.id !== undefined) {
            this.subscribeToSaveResponse(this.pessoaService.update(this.pessoa));
        } else {
            this.subscribeToSaveResponse(this.pessoaService.create(this.pessoa));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>) {
        result.subscribe((res: HttpResponse<IPessoa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUsuarioById(index: number, item: IUsuario) {
        return item.id;
    }

    trackAlunoById(index: number, item: IAluno) {
        return item.id;
    }

    trackProfessorById(index: number, item: IProfessor) {
        return item.id;
    }
}
