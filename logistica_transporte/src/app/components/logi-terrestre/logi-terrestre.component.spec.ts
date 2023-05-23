import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogiTerrestreComponent } from './logi-terrestre.component';

describe('LogiTerrestreComponent', () => {
  let component: LogiTerrestreComponent;
  let fixture: ComponentFixture<LogiTerrestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogiTerrestreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogiTerrestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
