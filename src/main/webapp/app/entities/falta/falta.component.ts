import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFalta } from 'app/shared/model/falta.model';
import { AccountService } from 'app/core';
import { FaltaService } from './falta.service';

@Component({
    selector: 'jhi-falta',
    templateUrl: './falta.component.html'
})
export class FaltaComponent implements OnInit, OnDestroy {
    faltas: IFalta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected faltaService: FaltaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.faltaService.query().subscribe(
            (res: HttpResponse<IFalta[]>) => {
                this.faltas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFaltas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFalta) {
        return item.id;
    }

    registerChangeInFaltas() {
        this.eventSubscriber = this.eventManager.subscribe('faltaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
