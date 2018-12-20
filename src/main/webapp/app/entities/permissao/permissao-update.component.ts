import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPermissao } from 'app/shared/model/permissao.model';
import { PermissaoService } from './permissao.service';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario';

@Component({
    selector: 'jhi-permissao-update',
    templateUrl: './permissao-update.component.html'
})
export class PermissaoUpdateComponent implements OnInit {
    permissao: IPermissao;
    isSaving: boolean;

    usuarios: IUsuario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected permissaoService: PermissaoService,
        protected usuarioService: UsuarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ permissao }) => {
            this.permissao = permissao;
        });
        this.usuarioService.query({ filter: 'permissao-is-null' }).subscribe(
            (res: HttpResponse<IUsuario[]>) => {
                if (!this.permissao.usuario || !this.permissao.usuario.id) {
                    this.usuarios = res.body;
                } else {
                    this.usuarioService.find(this.permissao.usuario.id).subscribe(
                        (subRes: HttpResponse<IUsuario>) => {
                            this.usuarios = [subRes.body].concat(res.body);
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
        if (this.permissao.id !== undefined) {
            this.subscribeToSaveResponse(this.permissaoService.update(this.permissao));
        } else {
            this.subscribeToSaveResponse(this.permissaoService.create(this.permissao));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPermissao>>) {
        result.subscribe((res: HttpResponse<IPermissao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
