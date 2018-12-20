import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDisciplina } from 'app/shared/model/disciplina.model';
import { AccountService } from 'app/core';
import { DisciplinaService } from './disciplina.service';

@Component({
    selector: 'jhi-disciplina',
    templateUrl: './disciplina.component.html'
})
export class DisciplinaComponent implements OnInit, OnDestroy {
    disciplinas: IDisciplina[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected disciplinaService: DisciplinaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.disciplinaService.query().subscribe(
            (res: HttpResponse<IDisciplina[]>) => {
                this.disciplinas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDisciplinas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDisciplina) {
        return item.id;
    }

    registerChangeInDisciplinas() {
        this.eventSubscriber = this.eventManager.subscribe('disciplinaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
