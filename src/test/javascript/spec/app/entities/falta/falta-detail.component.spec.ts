/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../test.module';
import { FaltaDetailComponent } from 'app/entities/falta/falta-detail.component';
import { Falta } from 'app/shared/model/falta.model';

describe('Component Tests', () => {
    describe('Falta Management Detail Component', () => {
        let comp: FaltaDetailComponent;
        let fixture: ComponentFixture<FaltaDetailComponent>;
        const route = ({ data: of({ falta: new Falta(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [FaltaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FaltaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FaltaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.falta).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
