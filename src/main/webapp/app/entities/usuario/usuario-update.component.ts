import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';
import { IPermissao } from 'app/shared/model/permissao.model';
import { PermissaoService } from 'app/entities/permissao';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa';

@Component({
    selector: 'jhi-usuario-update',
    templateUrl: './usuario-update.component.html'
})
export class UsuarioUpdateComponent implements OnInit {
    usuario: IUsuario;
    isSaving: boolean;

    permissaos: IPermissao[];

    pessoas: IPessoa[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected usuarioService: UsuarioService,
        protected permissaoService: PermissaoService,
        protected pessoaService: PessoaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
        });
        this.permissaoService.query().subscribe(
            (res: HttpResponse<IPermissao[]>) => {
                this.permissaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pessoaService.query().subscribe(
            (res: HttpResponse<IPessoa[]>) => {
                this.pessoas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(this.usuarioService.create(this.usuario));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>) {
        result.subscribe((res: HttpResponse<IUsuario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPermissaoById(index: number, item: IPermissao) {
        return item.id;
    }

    trackPessoaById(index: number, item: IPessoa) {
        return item.id;
    }
}
