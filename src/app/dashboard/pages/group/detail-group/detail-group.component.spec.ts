import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGroupComponent } from './detail-group.component';

describe('DetailGroupComponent', () => {
  let component: DetailGroupComponent;
  let fixture: ComponentFixture<DetailGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailGroupComponent]
    });
    fixture = TestBed.createComponent(DetailGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
