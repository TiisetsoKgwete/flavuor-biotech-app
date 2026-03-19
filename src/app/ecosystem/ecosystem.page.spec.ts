import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcosystemPage } from './ecosystem.page';

describe('EcosystemPage', () => {
  let component: EcosystemPage;
  let fixture: ComponentFixture<EcosystemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EcosystemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
