import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolutionsPage } from './solutions.page';

describe('SolutionsPage', () => {
  let component: SolutionsPage;
  let fixture: ComponentFixture<SolutionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
