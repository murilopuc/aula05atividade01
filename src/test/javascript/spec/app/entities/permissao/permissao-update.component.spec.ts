/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MyAppTestModule } from '../../../test.module';
import { PermissaoUpdateComponent } from 'app/entities/permissao/permissao-update.component';
import { PermissaoService } from 'app/entities/permissao/permissao.service';
import { Permissao } from 'app/shared/model/permissao.model';

describe('Component Tests', () => {
    describe('Permissao Management Update Component', () => {
        let comp: PermissaoUpdateComponent;
        let fixture: ComponentFixture<PermissaoUpdateComponent>;
        let service: PermissaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [PermissaoUpdateComponent]
            })
                .overrideTemplate(PermissaoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PermissaoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PermissaoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Permissao(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.permissao = entity;
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
                    const entity = new Permissao();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.permissao = entity;
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
