import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueComments } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issueNumber = signal<string | null>(null);

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null, // no se va a disparar hasta que se cumpla una condicion
  }));

  public commentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(),'comments'],
    queryFn: () => getIssueComments(this.issueNumber()!),
    enabled: this.issueNumber() !== null, // no se va a disparar hasta que se cumpla una condicion
  }));
  setIssueNumber(issueID: string) {
    // console.log({issueID})
    this.issueNumber.set(issueID);
  }
}
