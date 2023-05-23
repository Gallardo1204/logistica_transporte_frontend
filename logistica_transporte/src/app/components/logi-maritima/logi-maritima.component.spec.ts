import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogiMaritimaComponent } from './logi-maritima.component';

describe('LogiMaritimaComponent', () => {
  let component: LogiMaritimaComponent;
  let fixture: ComponentFixture<LogiMaritimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogiMaritimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogiMaritimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
