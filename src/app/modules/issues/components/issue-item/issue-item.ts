import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GitHubIssue, State } from '../../interfaces';
import { NgStyle } from '@angular/common';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [RouterLink, NgStyle],
  templateUrl: './issue-item.html',
})
export class IssueItem {

  public issue = input.required<GitHubIssue>();
  public issueService = inject(IssueService)
  public since = "falta"

  get isOpen(){
    return this.issue().state === State.Open;
  }

  prefetchData(){
    // this.issueService.prefetchIssue(this.issue().number.toString())
    this.issueService.setIssueData(this.issue())
  }
}
