/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { FaltaComponent } from 'app/entities/falta/falta.component';
import { FaltaService } from 'app/entities/falta/falta.service';
import { Falta } from 'app/shared/model/falta.model';

describe('Component Tests', () => {
    describe('Falta Management Component', () => {
        let comp: FaltaComponent;
        let fixture: ComponentFixture<FaltaComponent>;
        let service: FaltaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [FaltaComponent],
                providers: []
            })
                .overrideTemplate(FaltaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FaltaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaltaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Falta(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.faltas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
