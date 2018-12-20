/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MyAppTestModule } from '../../../test.module';
import { PeriodoLetivoUpdateComponent } from 'app/entities/periodo-letivo/periodo-letivo-update.component';
import { PeriodoLetivoService } from 'app/entities/periodo-letivo/periodo-letivo.service';
import { PeriodoLetivo } from 'app/shared/model/periodo-letivo.model';

describe('Component Tests', () => {
    describe('PeriodoLetivo Management Update Component', () => {
        let comp: PeriodoLetivoUpdateComponent;
        let fixture: ComponentFixture<PeriodoLetivoUpdateComponent>;
        let service: PeriodoLetivoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [PeriodoLetivoUpdateComponent]
            })
                .overrideTemplate(PeriodoLetivoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PeriodoLetivoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeriodoLetivoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PeriodoLetivo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.periodoLetivo = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PeriodoLetivo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.periodoLetivo = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
