import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartComponent } from './chart.component';
import { Observable } from 'rxjs';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [ GoogleChartsModule.forRoot() ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.data$ = new Observable(observer => {
      observer.next([]);
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
