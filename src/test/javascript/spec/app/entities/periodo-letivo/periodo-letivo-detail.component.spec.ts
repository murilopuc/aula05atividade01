/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../test.module';
import { PeriodoLetivoDetailComponent } from 'app/entities/periodo-letivo/periodo-letivo-detail.component';
import { PeriodoLetivo } from 'app/shared/model/periodo-letivo.model';

describe('Component Tests', () => {
    describe('PeriodoLetivo Management Detail Component', () => {
        let comp: PeriodoLetivoDetailComponent;
        let fixture: ComponentFixture<PeriodoLetivoDetailComponent>;
        const route = ({ data: of({ periodoLetivo: new PeriodoLetivo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [PeriodoLetivoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PeriodoLetivoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PeriodoLetivoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.periodoLetivo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
