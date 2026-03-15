import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IssuesService } from '../../services/issues.service';
import { CommonModule } from '@angular/common';
import { LabelsSelector } from '../../components/labels-selector/labels-selector';

@Component({
  selector: 'app-issues-list-page',
  imports: [RouterLink,CommonModule,LabelsSelector],
  templateUrl: './issues-list-page.html',
})
export default class IssuesListPage { 
  public issuesServices = inject(IssuesService)

  get labelsQuery (){
    return this.issuesServices.labelsQuery;
  }
}
