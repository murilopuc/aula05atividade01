import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProfessor } from 'app/shared/model/professor.model';
import { AccountService } from 'app/core';
import { ProfessorService } from './professor.service';

@Component({
    selector: 'jhi-professor',
    templateUrl: './professor.component.html'
})
export class ProfessorComponent implements OnInit, OnDestroy {
    professors: IProfessor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected professorService: ProfessorService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.professorService.query().subscribe(
            (res: HttpResponse<IProfessor[]>) => {
                this.professors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProfessors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProfessor) {
        return item.id;
    }

    registerChangeInProfessors() {
        this.eventSubscriber = this.eventManager.subscribe('professorListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
