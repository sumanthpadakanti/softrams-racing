import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.getMembers();
  }

  private getMembers() {
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  goToAddMemberForm() {
    this.router.navigate(['/member-detail']);
  }

  goToMemberByID(id: number, path:string) {
    this.router.navigate(['/'+path, id]);
  }

  deleteMemberById(id: number) {
    this.appService.deleteMember(id).subscribe(memberId => {
      this.getMembers();
    });
  }
  
}
