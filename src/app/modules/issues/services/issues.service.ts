import { Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getLabels } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  //tan pronto se inyecte el sevicio se va disparar esta peticion
  public labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }))


}
