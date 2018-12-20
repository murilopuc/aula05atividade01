/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MyAppTestModule } from '../../../test.module';
import { FaltaUpdateComponent } from 'app/entities/falta/falta-update.component';
import { FaltaService } from 'app/entities/falta/falta.service';
import { Falta } from 'app/shared/model/falta.model';

describe('Component Tests', () => {
    describe('Falta Management Update Component', () => {
        let comp: FaltaUpdateComponent;
        let fixture: ComponentFixture<FaltaUpdateComponent>;
        let service: FaltaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [FaltaUpdateComponent]
            })
                .overrideTemplate(FaltaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FaltaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaltaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Falta(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.falta = entity;
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
                    const entity = new Falta();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.falta = entity;
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
