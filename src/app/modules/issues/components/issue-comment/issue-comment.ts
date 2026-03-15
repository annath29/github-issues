import { Component, input } from '@angular/core';
import { GitHubIssue } from '../../interfaces';
import {MarkdownModule} from 'ngx-markdown'

@Component({
  selector: 'issue-comment',
  imports: [MarkdownModule],
  templateUrl: './issue-comment.html',
})
export class IssueComment {

  issue = input.required<GitHubIssue>();

}
