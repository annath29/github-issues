import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssues, getLabels } from '../actions';
import { State } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  public selectedState = signal<State>(State.Closed);

  //tan pronto se inyecte el sevicio se va disparar esta peticion
  public labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }))
  
  public issuesQuery = injectQuery(() => ({
    queryKey: ['issues',this.selectedState()],
    queryFn: () => getIssues(this.selectedState()),
  }))

  showIssuesByState(state:State){
    this.selectedState.set(state);
  }

}
