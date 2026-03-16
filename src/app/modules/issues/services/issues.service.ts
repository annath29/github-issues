import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssues, getLabels } from '../actions';
import { State } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  public selectedState = signal<State>(State.All);
  // Set primitivo que permite almacenar valores in duplicados
  public selectedLabels = signal(new Set<string>()); //{'a','b','c'}

  //tan pronto se inyecte el sevicio se va disparar esta peticion
  public labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  // public issuesQuery = injectQuery(() => ({
  //   queryKey: ['issues',this.selectedState()],
  //   queryFn: () => getIssues(this.selectedState()),
  // }))

  //no importa la posicion de los elementows
  public issuesQuery = injectQuery(() => ({
    queryKey: [
      'issues',
      {
        state: this.selectedState(),
        labels:[...this.selectedLabels()]
      },
    ],
    queryFn: () => getIssues(this.selectedState(),[...this.selectedLabels()]),
  }));

  showIssuesByState(state: State) {
    this.selectedState.set(state);
  }

  toogleLabel(label: string) {
    const labels = this.selectedLabels();

    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }

    this.selectedLabels.set(new Set(labels))
  }
}
