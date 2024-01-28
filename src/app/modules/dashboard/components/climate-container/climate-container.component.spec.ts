import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateContainerComponent } from './climate-container.component';

describe('MainContainerComponent', () => {
  let component: ClimateContainerComponent;
  let fixture: ComponentFixture<ClimateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClimateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClimateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
