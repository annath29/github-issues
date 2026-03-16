import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { IssuesService } from './issues.service';
import {
  injectQuery,
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { State } from '../interfaces';
import { ApplicationRef } from '@angular/core';

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
    queryClient.clear();
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
    // console.log(service.selectedState());
    expect(service.selectedState()).toBe(State.All); // verificar el estado inicial

    const newState = State.Closed;
    service.showIssuesByState(newState);

    expect(service.selectedState()).toBe(newState);
  });

  // it('should result labels query when is called', async () => {
  //   expect(service.labelsQuery.status()).toBe('pending'); // debe estar pendiente la peticion

  //   const { status, data } = await service.labelsQuery.refetch(); //peticion tak cual como se encuentra configurada
  //   // console.log({data})
  //   TestBed.tick(); // que espere a la siguiente evaluacion
  //   // console.log({service: service.labelsQuery.data()})
  //   // expect(service.labelsQuery.data()!.length).toBe(4);
  //   expect(status).toBe('success');
  //   expect(data?.length).toBe(30);

  //   const label = data!.at(0);
  //   // console.log(label);

  //   expect(typeof label!.id).toBe('number');
  //   expect(typeof label!.node_id).toBe('string');
  //   expect(typeof label!.url).toBe('string');
  //   expect(typeof label!.name).toBe('string');
  //   expect(typeof label!.color).toBe('string');
  //   expect(typeof label!.default).toBe('boolean');
  //   expect(typeof label!.description).toBe('string');
  // });

  
  // it('should set selected labels and get issues by label', async() => {
  //   const myLabel = 'Accessibility';
  //   service.toogleLabel(myLabel)

  //   expect(service.selectedLabels().has(myLabel)).toBe(true)

  //   TestBed.tick();
  //   const response  = await service.issuesQuery.refetch();
  //   console.log({response})

  //   expect(status).toBe('success')
    
  //   data!.items.forEach(issue => {
  //     const haslabel = issue.labels.some(
  //       (label) => label.name == myLabel
  //     )

  //     expect(haslabel).toBe(true)
  //   });
  // });
});
