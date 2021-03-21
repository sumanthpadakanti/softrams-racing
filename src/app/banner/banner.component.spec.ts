import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  }
  const fakeAppService =  {
    username : 'sampleUser'
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout', () => {
    spyOn(component, 'logout').and.callThrough();
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

});
