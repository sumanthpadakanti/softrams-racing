import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  submitted = false;
  alertType: String;
  alertMessage: String;
  editMemberId:number;
  viewMemberId: number;
  teams = [];
    memberForm = this.fb.group({
    firstName:['', [Validators.required]],
    lastName: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
    team: ['', [Validators.required]],
    status: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router,
    private route: ActivatedRoute) {
      this.editMemberId = this.route.snapshot.params['editId'];
      this.viewMemberId = this.route.snapshot.params['viewId'];
    }

  ngOnInit() {
    this.appService.getTeams().subscribe(team => {
      this.teams = team;
      if(this.editMemberId || this.viewMemberId) {
        this.getMemberDetails();
      }
    }); 
  }

  private getMemberDetails() {
    const id = this.editMemberId || this.viewMemberId;
    this.appService.getMemberDetails(id).subscribe(member => {
      this.memberForm.setValue({
        firstName: member.firstName,
        lastName: member.lastName,
        jobTitle: member.jobTitle,
        team: member.team,
        status: member.status
      });
    });
  }

  ngOnChanges() {}
  
  onSubmit() {
    this.memberModel = this.memberForm.value;
    if(this.editMemberId) {
     this.updateMember(); 
    }else {
      this.saveMember();
    }
  }

  private saveMember() {
    this.appService.addMember(this.memberModel).subscribe(member => {
      this.router.navigate(['/members']);
    });
  }

  private updateMember() {
    this.appService.updateMember(this.memberModel, this.editMemberId).subscribe(member => {
      this.router.navigate(['/members']);
    });
  }

  public backToSummary() {
    this.router.navigate(['/members']);
  }

}
