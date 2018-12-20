import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITurma } from 'app/shared/model/turma.model';
import { AccountService } from 'app/core';
import { TurmaService } from './turma.service';

@Component({
    selector: 'jhi-turma',
    templateUrl: './turma.component.html'
})
export class TurmaComponent implements OnInit, OnDestroy {
    turmas: ITurma[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected turmaService: TurmaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.turmaService.query().subscribe(
            (res: HttpResponse<ITurma[]>) => {
                this.turmas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTurmas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITurma) {
        return item.id;
    }

    registerChangeInTurmas() {
        this.eventSubscriber = this.eventManager.subscribe('turmaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
