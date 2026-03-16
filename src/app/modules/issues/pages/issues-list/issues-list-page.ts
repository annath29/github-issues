import { Component, computed, inject } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { CommonModule } from '@angular/common';
import { LabelsSelector } from '../../components/labels-selector/labels-selector';
import { IssueItem } from '../../components/issue-item/issue-item';
import { State } from '../../interfaces';

@Component({
  selector: 'app-issues-list-page',
  imports: [CommonModule, LabelsSelector, IssueItem],
  templateUrl: './issues-list-page.html',
})
export default class IssuesListPage {
  public issuesServices = inject(IssuesService);

  public currentState = computed(() => this.issuesServices.selectedState());

  get labelsQuery() {
    return this.issuesServices.labelsQuery;
  }
  get issuesQuery() {
    return this.issuesServices.issuesQuery;
  }

  onChangeState(newState:string){
    const state  ={
      'all': State.All,
      'open': State.Open,
      'closed': State.Closed, 
    }[newState] ?? State.All

    this.issuesServices.showIssuesByState(state)
  }
}
