import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEntrega } from 'app/shared/model/entrega.model';
import { EntregaService } from './entrega.service';
import { IAtividade } from 'app/shared/model/atividade.model';
import { AtividadeService } from 'app/entities/atividade';

@Component({
    selector: 'jhi-entrega-update',
    templateUrl: './entrega-update.component.html'
})
export class EntregaUpdateComponent implements OnInit {
    entrega: IEntrega;
    isSaving: boolean;

    atividades: IAtividade[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected entregaService: EntregaService,
        protected atividadeService: AtividadeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entrega }) => {
            this.entrega = entrega;
        });
        this.atividadeService.query().subscribe(
            (res: HttpResponse<IAtividade[]>) => {
                this.atividades = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.entrega.id !== undefined) {
            this.subscribeToSaveResponse(this.entregaService.update(this.entrega));
        } else {
            this.subscribeToSaveResponse(this.entregaService.create(this.entrega));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntrega>>) {
        result.subscribe((res: HttpResponse<IEntrega>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAtividadeById(index: number, item: IAtividade) {
        return item.id;
    }
}
