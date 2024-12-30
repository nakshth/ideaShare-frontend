import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { UploadInnovationIdeasService } from '../../../services/upload-innovation-ideas.service';
import { ToasterService } from '../../../services/toaster.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-others-innovations',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule, HttpClientModule, FormsModule],
  providers: [HttpClientModule, UploadInnovationIdeasService],
  templateUrl: './others-innovations.component.html',
  styleUrl: './others-innovations.component.scss',
})
export class OthersInnovationsComponent {
  description: string = '';
  constructor(
    private uploadInnovationIdeasService: UploadInnovationIdeasService,
    private toasterService: ToasterService
  ) {}
  ideasList: any = [];
  ngOnInit() {
    this.fetchIdeaList();
  }
  fetchIdeaList() {
    let lastSubmittedId = '';
    if (sessionStorage.getItem('userinfo')) {
      const userInfo = JSON.parse(sessionStorage.getItem('userinfo') ?? '');
      lastSubmittedId = userInfo?._id;
    }
    this.uploadInnovationIdeasService
      .getIdeasWithUserInfo()
      .subscribe((result) => {
        if (result.success && result.data) {
          this.ideasList = result.data.filter((ele: any) => {
            ele.isVoted = ele.likes.includes(lastSubmittedId);
            return ele._id !== lastSubmittedId;
          });
        }
      });
  }
  voteIdea(idea: any) {
    let lastSubmittedId = '';
    if (sessionStorage.getItem('userinfo')) {
      const userInfo = JSON.parse(sessionStorage.getItem('userinfo') ?? '');
      lastSubmittedId = userInfo?._id;
    }
      this.uploadInnovationIdeasService
        .voteIdea(idea._id, { userId: lastSubmittedId, id: idea._id })
        .subscribe({
          next: (result) => {
            if (result.success) {
              this.fetchIdeaList();
              this.toasterService.success('Success', result.message);
            } else {
              this.toasterService.danger('Error', result.message);
            }
          },
          error: (error) => {
            this.toasterService.danger(
              'Error',
              error?.error?.message ?? 'Error while voting  the Idea'
            );
          },
        });
  }
  unlikeIdea(idea: any) {
    let lastSubmittedId = '';
    if (sessionStorage.getItem('userinfo')) {
      const userInfo = JSON.parse(sessionStorage.getItem('userinfo') ?? '');
      lastSubmittedId = userInfo?._id;
    }
      this.uploadInnovationIdeasService
        .unVoteIdea(idea._id, { userId: lastSubmittedId, id: idea._id })
        .subscribe({
          next: (result) => {
            if (result.success) {
              this.fetchIdeaList();
              this.toasterService.success('Success', result.message);
            } else {
              this.toasterService.danger('Error', result.message);
            }
          },
          error: (error) => {
            this.toasterService.danger(
              'Error',
              error?.error?.message ?? 'Error while voting  the Idea'
            );
          },
        });
  }
}
