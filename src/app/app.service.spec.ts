import { TestBed, inject } from '@angular/core/testing';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe('AppService', () => {
  let service: AppService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:3000';
  const dummyMembers = [{
    "firstName": "Joe",
    "lastName": "King",
    "jobTitle": "Runner",
    "team": "World Rally Championship - Car 77",
    "status": "Active",
    "id": 9
  },
  {
    "firstName": "Alex",
    "lastName": "Jones",
    "jobTitle": "Racer",
    "team": "Formula 2 - Car 54",
    "status": "Inactive",
    "id": 10
  }];
  const dummyTeams = [{
        "id": 7,
        "teamName": "World Endurance Championship - Car 99"
      },{
        "id": 8,
        "teamName": "World Endurance Championship - Car 5"
      }];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it("be able to retrieve members from the API via GET", () => {
    let result= [];
    service.getMembers().subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl + '/members'
    });
    req.flush(dummyMembers);
    expect(result).toEqual(dummyMembers);
  });

  it("not able to get members from the API via GET", () => {
    let result= [];
    service.getMembers().subscribe(null, t => {
      result = t;
    });
    let req = httpTestingController.expectOne(baseUrl + '/members');
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });
    expect(result).toEqual([]);
  });

  it("be able to retrieve teams from the API via GET", () => {
    let result= [];
    service.getTeams().subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl + '/teams'
    });
    req.flush(dummyTeams);
    expect(result).toEqual(dummyTeams);
  });

  it("not able to get teams from the API via GET", () => {
    let result= [];
    service.getTeams().subscribe(null, t => {
      result = t;
    });
    let req = httpTestingController.expectOne(baseUrl + '/teams');
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });
    expect(result).toEqual([]);
  });

  it("be able to retrieve getMemberDetails from the API via GET", () => {
    let result= {};
    service.getMemberDetails(9).subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl + '/members/9'
    });
    req.flush(dummyMembers[0]);
    expect(result).toEqual(dummyMembers[0]);
  });

  it("be able to delete Member from the API via Delete", () => {
    let result= {};
    service.deleteMember(9).subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "DELETE",
      url: baseUrl + '/members/9'
    });
    req.flush(dummyMembers[0]);
    expect(result).toEqual(dummyMembers[0]);
  });

  it("be able to add Member from the API via Post", () => {
    service.addMember(dummyMembers[0]).subscribe();
    let req = httpTestingController.expectOne({ method: "POST", url: baseUrl + '/members' });
    expect(req.request.body).toEqual(dummyMembers[0]);
  });

  it("be able to update member API via Put", () => {
    service.updateMember(dummyMembers[0], dummyMembers[0].id).subscribe();
    let req = httpTestingController.expectOne({
      method: "PUT",
      url: `${baseUrl}/members/${dummyMembers[0].id}`
    });
    expect(req.request.body).toEqual(dummyMembers[0]);
  });

});