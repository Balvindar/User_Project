import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlocksComponent } from './all-blocks.component';

describe('AllBlocksComponent', () => {
  let component: AllBlocksComponent;
  let fixture: ComponentFixture<AllBlocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBlocksComponent]
    });
    fixture = TestBed.createComponent(AllBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
