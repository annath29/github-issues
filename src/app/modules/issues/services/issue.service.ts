import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueComments } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issueNumber = signal<string | null>(null);
  private queryClient = inject(QueryClient); //toda la info de como estan todas las peticiones

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null, // no se va a disparar hasta que se cumpla una condicion
  }));

  public issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueComments(this.issueNumber()!),
    enabled: this.issueNumber() !== null, // no se va a disparar hasta que se cumpla una condicion
  }));
  setIssueNumber(issueID: string) {
    // console.log({issueID})
    this.issueNumber.set(issueID);
  }

  prefetchIssue(issueId: string) {
    //llave en la que necesito que se grave, si alguien vuelve  hace una peticion para esa llave y ya se proceso regresa la info que ya tiene
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId],// este issue id debe tenet el mismo tipado del issue number 
      queryFn: () => getIssueByNumber(issueId!),
      staleTime: 1000*60*5 //(5min) tiempo fresco : si esta dentro de un tiempo no se vulve a hacer la llamada
    });
  }
}
