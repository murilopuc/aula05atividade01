/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { PermissaoComponent } from 'app/entities/permissao/permissao.component';
import { PermissaoService } from 'app/entities/permissao/permissao.service';
import { Permissao } from 'app/shared/model/permissao.model';

describe('Component Tests', () => {
    describe('Permissao Management Component', () => {
        let comp: PermissaoComponent;
        let fixture: ComponentFixture<PermissaoComponent>;
        let service: PermissaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [PermissaoComponent],
                providers: []
            })
                .overrideTemplate(PermissaoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PermissaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PermissaoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Permissao(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.permissaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
