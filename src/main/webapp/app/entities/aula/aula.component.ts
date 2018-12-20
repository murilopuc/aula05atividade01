import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAula } from 'app/shared/model/aula.model';
import { AccountService } from 'app/core';
import { AulaService } from './aula.service';

@Component({
    selector: 'jhi-aula',
    templateUrl: './aula.component.html'
})
export class AulaComponent implements OnInit, OnDestroy {
    aulas: IAula[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected aulaService: AulaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.aulaService.query().subscribe(
            (res: HttpResponse<IAula[]>) => {
                this.aulas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAulas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAula) {
        return item.id;
    }

    registerChangeInAulas() {
        this.eventSubscriber = this.eventManager.subscribe('aulaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
