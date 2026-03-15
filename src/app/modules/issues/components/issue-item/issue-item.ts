import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GitHubIssue, State } from '../../interfaces';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'issue-item',
  imports: [RouterLink, NgStyle],
  templateUrl: './issue-item.html',
})
export class IssueItem {

  public issue = input.required<GitHubIssue>();
  public since = "falta"

  get isOpen(){
    return this.issue().state === State.Open;
  }
}
