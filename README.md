# T-Mobile Coding Challenge

### Task 1

Please provide a short code review of the base `master` branch:

1. What is done well?
2. What would you change?
3. Are there any code smells or problematic implementations?

> Make a PR to fix at least one of the issues that you identify

### Below are comments on Task-1 ###

1. What is done well?
>  Use of NgRx is good part, it brings redux pattern and state oriented unidirectional data flow in Angular.
>  Use of facade pattern with NgRx is good practice. Facade provides abstraction for NgRx actions,reducer,selector and effects. 
We may use facade methods from angular components, which means angular component need not worry about calling action to update state and use selector to fetch state data diretly.
>  Use of NX for monorepo atchitecture. With monorepos its easier to share modules which provide common functionality between client and server.  

2. What would you change?
>  currently application using older version of Angular, NgRx (effects, entities, router etc). We may upgrade it to utilize latest version. 
>  Remove unused code in application
>  Error hadling and showing relevant error messages on UI in case of API errors.

3. Are there any code smells or problematic implementations?

* Problematic Impementation
> On load of Angular app, upon selecting valid data, chart is not populating. in libs\shared\ui\chart\src\lib\chart\chart.component.html file 'data' is checked if it is present or not. 'data' is in chartData variable.

* Below are code smells I have found in master branch
> variables types are not given in stocks.component.ts, chart.component.ts
> should not use 'any' as a type
> for complex datatypes interface should have been used.
> class data member's visibility is not set properly. i.e. in chart.component.ts chartData and chart is not set as private or public.
> In chart.component.ts, 'ChangeDetectionStrategy','ChangeDetectorRef' are not required.
> In libs\stocks\data-access-price-query\src\lib\+state\price-query.actions.ts file the types defined can be converted to interface for priceQueryResponse and priceQuery.
> In libs\stocks\data-access-price-query\src\lib\+state\price-query.actions.ts selectSymbol action is not used anywhere

