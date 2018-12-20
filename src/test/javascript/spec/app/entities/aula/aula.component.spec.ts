/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { AulaComponent } from 'app/entities/aula/aula.component';
import { AulaService } from 'app/entities/aula/aula.service';
import { Aula } from 'app/shared/model/aula.model';

describe('Component Tests', () => {
    describe('Aula Management Component', () => {
        let comp: AulaComponent;
        let fixture: ComponentFixture<AulaComponent>;
        let service: AulaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [AulaComponent],
                providers: []
            })
                .overrideTemplate(AulaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AulaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AulaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Aula(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.aulas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
