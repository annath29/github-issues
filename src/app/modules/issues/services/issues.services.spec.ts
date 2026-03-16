import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { IssuesService } from './issues.service';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { State } from '../interfaces';

describe('issuesServices', () => {
  let service: IssuesService;
  let httMock: HttpTestingController;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideTanStackQuery(queryClient)],
    });
    service = TestBed.inject(IssuesService);
    httMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should haave default values', () => {
    expect(service.selectedState()).toBe(State.All);
    expect(service.selectedLabels()).toEqual(new Set());
    expect(service.labelsQuery.isLoading()).toBe(true);
    expect(service.issuesQuery.isLoading()).toBe(true);
  });
  it('should set selectedlabels', () => {
    const label = 'Accessibility';

    service.toogleLabel(label);

    // expect(service.selectedLabels()).toContain(label);
    expect(service.selectedLabels().has(label)).toBe(true);

    service.toogleLabel(label);
    expect(service.selectedLabels().has(label)).toBe(false); //si se vuelve a llamar debe de quitaarse
  });
  it('should set selected state, open,close,all', () => {
    console.log(service.selectedState());
    expect(service.selectedState()).toBe(State.All); // verificar el estado inicial

    const newState = State.Closed;
    service.showIssuesByState(newState);
    
    expect(service.selectedState()).toBe(newState);
  });
});
