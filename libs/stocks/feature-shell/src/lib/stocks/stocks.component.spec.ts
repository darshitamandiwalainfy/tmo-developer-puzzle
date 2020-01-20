import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StocksComponent } from './stocks.component';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';
import { of } from 'rxjs';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQuery: PriceQueryFacade;
  
  let priceQueryStub: Partial<PriceQueryFacade>;
  priceQueryStub = {
    selectedSymbol$: of(),
    priceQueries$: of(),
    fetchQuote: jest.fn()
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        SharedUiChartModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: PriceQueryFacade,
          useValue: priceQueryStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should subscribe to stockPickerForm valueChanges', () => {
    const formInputValues = {};
    spyOn(component.stockPickerForm.valueChanges, 'pipe').and.returnValue(of(formInputValues));
    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(component.stockPickerForm.valueChanges.pipe).toHaveBeenCalled();
  });

  it('should call fetchQuote on updation of form values', () => {
    priceQuery = TestBed.get(PriceQueryFacade);
    component.stockPickerForm.setValue({ symbol: 'INFY', period: '5Y' });
    spyOn(priceQuery, 'fetchQuote');
    component.fetchQuote();
    expect(component).toBeTruthy();
    expect(priceQuery.fetchQuote).toHaveBeenCalled();
  });
  
});
