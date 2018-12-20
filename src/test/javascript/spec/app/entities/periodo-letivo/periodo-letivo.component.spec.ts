/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { PeriodoLetivoComponent } from 'app/entities/periodo-letivo/periodo-letivo.component';
import { PeriodoLetivoService } from 'app/entities/periodo-letivo/periodo-letivo.service';
import { PeriodoLetivo } from 'app/shared/model/periodo-letivo.model';

describe('Component Tests', () => {
    describe('PeriodoLetivo Management Component', () => {
        let comp: PeriodoLetivoComponent;
        let fixture: ComponentFixture<PeriodoLetivoComponent>;
        let service: PeriodoLetivoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [PeriodoLetivoComponent],
                providers: []
            })
                .overrideTemplate(PeriodoLetivoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PeriodoLetivoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeriodoLetivoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PeriodoLetivo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.periodoLetivos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
