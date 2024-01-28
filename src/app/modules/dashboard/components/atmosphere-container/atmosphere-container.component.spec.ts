import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmosphereContainerComponent } from './atmosphere-container.component';

describe('AtmosphereContainerComponent', () => {
  let component: AtmosphereContainerComponent;
  let fixture: ComponentFixture<AtmosphereContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmosphereContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtmosphereContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
