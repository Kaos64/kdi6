import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KdiUiComponent } from './kdi-ui.component';

describe('KdiUiComponent', () => {
  let component: KdiUiComponent;
  let fixture: ComponentFixture<KdiUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KdiUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KdiUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
