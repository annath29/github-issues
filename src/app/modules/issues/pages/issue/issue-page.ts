import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { IssueComment } from '../../components/issue-comment/issue-comment';

@Component({
  selector: 'app-issue-page',
  imports: [RouterLink,IssueComment],
  templateUrl: './issue-page.html',
})
export default class IssuePage {
  route = inject(ActivatedRoute);
  issueServices = inject(IssueService);

  issuesNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      // tap(issuesNumber => console.log(issuesNumber))
      // tap(console.log), ///lo mismo que la linea anterior
      tap((number) => this.issueServices.setIssueNumber(number)),
    ),
  );

  public issueQuery = this.issueServices.issueQuery;
}
