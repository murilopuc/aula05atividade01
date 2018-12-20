/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MyAppTestModule } from '../../../test.module';
import { EntregaDeleteDialogComponent } from 'app/entities/entrega/entrega-delete-dialog.component';
import { EntregaService } from 'app/entities/entrega/entrega.service';

describe('Component Tests', () => {
    describe('Entrega Management Delete Component', () => {
        let comp: EntregaDeleteDialogComponent;
        let fixture: ComponentFixture<EntregaDeleteDialogComponent>;
        let service: EntregaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [EntregaDeleteDialogComponent]
            })
                .overrideTemplate(EntregaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntregaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntregaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
