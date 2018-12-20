import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEntrega } from 'app/shared/model/entrega.model';
import { AccountService } from 'app/core';
import { EntregaService } from './entrega.service';

@Component({
    selector: 'jhi-entrega',
    templateUrl: './entrega.component.html'
})
export class EntregaComponent implements OnInit, OnDestroy {
    entregas: IEntrega[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected entregaService: EntregaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.entregaService.query().subscribe(
            (res: HttpResponse<IEntrega[]>) => {
                this.entregas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEntregas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEntrega) {
        return item.id;
    }

    registerChangeInEntregas() {
        this.eventSubscriber = this.eventManager.subscribe('entregaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
