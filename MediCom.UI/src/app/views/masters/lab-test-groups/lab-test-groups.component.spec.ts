import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestGroupsComponent } from './lab-test-groups.component';

describe('LabTestGroupsComponent', () => {
  let component: LabTestGroupsComponent;
  let fixture: ComponentFixture<LabTestGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabTestGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabTestGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
