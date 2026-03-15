import { Component, inject } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { CommonModule } from '@angular/common';
import { LabelsSelector } from '../../components/labels-selector/labels-selector';
import { IssueItem } from "../../components/issue-item/issue-item";

@Component({
  selector: 'app-issues-list-page',
  imports: [CommonModule, LabelsSelector, IssueItem],
  templateUrl: './issues-list-page.html',
})
export default class IssuesListPage {
  public issuesServices = inject(IssuesService);

  get labelsQuery() {
    return this.issuesServices.labelsQuery;
  }
  get issuesQuery() {
    return this.issuesServices.issuesQuery;
  }
}
