import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPeriodoLetivo } from 'app/shared/model/periodo-letivo.model';
import { PeriodoLetivoService } from './periodo-letivo.service';

@Component({
    selector: 'jhi-periodo-letivo-delete-dialog',
    templateUrl: './periodo-letivo-delete-dialog.component.html'
})
export class PeriodoLetivoDeleteDialogComponent {
    periodoLetivo: IPeriodoLetivo;

    constructor(
        protected periodoLetivoService: PeriodoLetivoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.periodoLetivoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'periodoLetivoListModification',
                content: 'Deleted an periodoLetivo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-periodo-letivo-delete-popup',
    template: ''
})
export class PeriodoLetivoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ periodoLetivo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PeriodoLetivoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.periodoLetivo = periodoLetivo;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
