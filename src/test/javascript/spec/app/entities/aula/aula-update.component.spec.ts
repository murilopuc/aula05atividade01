/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MyAppTestModule } from '../../../test.module';
import { AulaUpdateComponent } from 'app/entities/aula/aula-update.component';
import { AulaService } from 'app/entities/aula/aula.service';
import { Aula } from 'app/shared/model/aula.model';

describe('Component Tests', () => {
    describe('Aula Management Update Component', () => {
        let comp: AulaUpdateComponent;
        let fixture: ComponentFixture<AulaUpdateComponent>;
        let service: AulaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [AulaUpdateComponent]
            })
                .overrideTemplate(AulaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AulaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AulaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Aula(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.aula = entity;
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
                    const entity = new Aula();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.aula = entity;
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
