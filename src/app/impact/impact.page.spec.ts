import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImpactPage } from './impact.page';

describe('ImpactPage', () => {
  let component: ImpactPage;
  let fixture: ComponentFixture<ImpactPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
