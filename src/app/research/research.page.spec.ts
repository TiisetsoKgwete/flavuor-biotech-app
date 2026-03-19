import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResearchPage } from './research.page';

describe('ResearchPage', () => {
  let component: ResearchPage;
  let fixture: ComponentFixture<ResearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
