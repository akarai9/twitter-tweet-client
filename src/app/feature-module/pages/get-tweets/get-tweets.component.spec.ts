import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTweetsComponent } from './get-tweets.component';

describe('GetTweetsComponent', () => {
  let component: GetTweetsComponent;
  let fixture: ComponentFixture<GetTweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
