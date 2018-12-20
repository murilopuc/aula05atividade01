/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { NotaComponent } from 'app/entities/nota/nota.component';
import { NotaService } from 'app/entities/nota/nota.service';
import { Nota } from 'app/shared/model/nota.model';

describe('Component Tests', () => {
    describe('Nota Management Component', () => {
        let comp: NotaComponent;
        let fixture: ComponentFixture<NotaComponent>;
        let service: NotaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [NotaComponent],
                providers: []
            })
                .overrideTemplate(NotaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NotaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Nota(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.notas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
