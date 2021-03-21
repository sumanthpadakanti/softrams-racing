import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { of } from 'rxjs';

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  const teams = [{
      "id": 1,
      "teamName": "Formula 1 - Car 77"
    },
    {
      "id": 2,
      "teamName": "Formula 1 - Car 8"
    }]
  const fakeAppService =  {
    getTeams: () => of(teams),
    getMemberDetails: () => of({
      "firstName": "John",
      "lastName": "Kelly",
      "jobTitle": "Racer",
      "team": "Formula 1 - Car 77",
      "status": "Active",
      "id": 5
    }),
    addMember: () => of(),
    updateMember: () => of()
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
      ],
      providers: [
        HttpClient,
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue:  {
            snapshot: {
              params: {
                editId: '1',
                viewId: '2'
              }
            }
          }
        },
        {
          provide: AppService,
          useValue: fakeAppService
        },
        {
          provide: Router,
          useValue: router
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.editMemberId = 1;
    expect(component).toBeTruthy();
  });

  it('should call backToSummary', () => {
    spyOn(component, 'backToSummary').and.callThrough();
    component.backToSummary();
    expect(router.navigate).toHaveBeenCalledWith(['/members']);
  });

  describe('should call onSubmit', () => {

    it('with updateMember', () => {
      spyOn<any>(component, 'updateMember').and.callThrough();
      spyOn(component, 'onSubmit').and.callThrough();
      component.editMemberId = 1;
      component.onSubmit();
      expect(component['updateMember']).toHaveBeenCalled();
    });

    it('with saveMember', () => {
      spyOn<any>(component, 'saveMember').and.callThrough();
      spyOn(component, 'onSubmit').and.callThrough();
      component.editMemberId = null;
      component.onSubmit();
      expect(component['saveMember']).toHaveBeenCalled();
    });
  });

});
