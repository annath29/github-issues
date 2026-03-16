import { Component, inject, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces';
import { NgStyle } from '@angular/common';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-labels-selector',
  imports: [NgStyle],
  templateUrl: './labels-selector.html',
})
export class LabelsSelector {
   labels = input.required<GitHubLabel[]>();

   issuesService = inject(IssuesService)

   isSelectedLabel (labelName:string){
    return this.issuesService.selectedLabels().has(labelName);
   }

   onTooggleLabel(labelName:string){
    this.issuesService.toogleLabel(labelName);
   }
}
