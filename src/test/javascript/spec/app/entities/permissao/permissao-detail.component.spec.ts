/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../test.module';
import { PermissaoDetailComponent } from 'app/entities/permissao/permissao-detail.component';
import { Permissao } from 'app/shared/model/permissao.model';

describe('Component Tests', () => {
    describe('Permissao Management Detail Component', () => {
        let comp: PermissaoDetailComponent;
        let fixture: ComponentFixture<PermissaoDetailComponent>;
        const route = ({ data: of({ permissao: new Permissao(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [PermissaoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PermissaoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PermissaoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.permissao).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
