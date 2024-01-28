import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoContainerComponent } from './meteo-container.component';

describe('MeteoContainerComponent', () => {
  let component: MeteoContainerComponent;
  let fixture: ComponentFixture<MeteoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteoContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeteoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
