import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MembersComponent } from './members.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { of } from 'rxjs';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  }
  const members = [ {
    "firstName": "John",
    "lastName": "Kelly",
    "jobTitle": "Racer",
    "team": "Formula 1 - Car 77",
    "status": "Active",
    "id": 5
  },
  {
    "firstName": "T3",
    "lastName": "T3",
    "jobTitle": "T3",
    "team": "World Rally Championship - Car 77",
    "status": "Inactive",
    "id": 7
  }];
  const fakeAppService =  {
    getMembers: () => of(members),
    deleteMember: () => of([])
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [HttpClientModule, RouterModule],
      providers: [
        {
          provide: Router,
          useValue: router
        },
        {
          provide: AppService,
          useValue: fakeAppService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete', () => {
    spyOn(component, 'deleteMemberById').and.callThrough();
    spyOn<any>(component, 'getMembers').and.callThrough();
    component.deleteMemberById(5);
    expect(component['getMembers']).toHaveBeenCalled();
  });

  it('should call goToAddMemberForm', () => {
    spyOn(component, 'goToAddMemberForm').and.callThrough();
    component.goToAddMemberForm();
    expect(router.navigate).toHaveBeenCalledWith(['/member-detail']);
  });

  it('should call goToMemberByID', () => {
    spyOn(component, 'goToMemberByID').and.callThrough();
    component.goToMemberByID(1, 'member-detail');
    expect(router.navigate).toHaveBeenCalledWith(['/member-detail', 1 ]);
  });

});
