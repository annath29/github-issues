import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueComment } from './issue-comment';

describe('IssueComment', () => {
  let component: IssueComment;
  let fixture: ComponentFixture<IssueComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
