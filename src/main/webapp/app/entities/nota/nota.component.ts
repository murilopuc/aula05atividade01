import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INota } from 'app/shared/model/nota.model';
import { AccountService } from 'app/core';
import { NotaService } from './nota.service';

@Component({
    selector: 'jhi-nota',
    templateUrl: './nota.component.html'
})
export class NotaComponent implements OnInit, OnDestroy {
    notas: INota[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected notaService: NotaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.notaService.query().subscribe(
            (res: HttpResponse<INota[]>) => {
                this.notas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNotas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INota) {
        return item.id;
    }

    registerChangeInNotas() {
        this.eventSubscriber = this.eventManager.subscribe('notaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
