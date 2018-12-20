import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPeriodoLetivo } from 'app/shared/model/periodo-letivo.model';
import { AccountService } from 'app/core';
import { PeriodoLetivoService } from './periodo-letivo.service';

@Component({
    selector: 'jhi-periodo-letivo',
    templateUrl: './periodo-letivo.component.html'
})
export class PeriodoLetivoComponent implements OnInit, OnDestroy {
    periodoLetivos: IPeriodoLetivo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected periodoLetivoService: PeriodoLetivoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.periodoLetivoService.query().subscribe(
            (res: HttpResponse<IPeriodoLetivo[]>) => {
                this.periodoLetivos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPeriodoLetivos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPeriodoLetivo) {
        return item.id;
    }

    registerChangeInPeriodoLetivos() {
        this.eventSubscriber = this.eventManager.subscribe('periodoLetivoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
