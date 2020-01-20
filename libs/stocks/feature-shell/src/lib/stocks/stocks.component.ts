import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { getRangeForDates } from '../../../../../shared/util/src/stocks.common';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;

  quotes$ = this.priceQuery.priceQueries$;
  private formChangeSubscription: Subscription;
  public today = new Date();
  public fromDateInputValue: string = '';

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.formChangeSubscription = this.stockPickerForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(formValues => {
        if (formValues.fromDate !== '') {
          this.fromDateInputValue = formValues.fromDate;
        }
        if (this.stockPickerForm.valid) {
          const range = getRangeForDates(formValues.fromDate);
          this.fetchQuote(range);
        } else {
          if (formValues.fromDate != '' && formValues.toDate != '') {
            this.stockPickerForm.patchValue({
              toDate: formValues.fromDate
            });
          }
        }
      });
  }

  fetchQuote(range: string) {
    const { symbol, fromDate, toDate } = this.stockPickerForm.value;
    this.priceQuery.fetchQuote(symbol, range, fromDate, toDate);
  }

  ngOnDestroy() {
    this.formChangeSubscription.unsubscribe();
  }
}
