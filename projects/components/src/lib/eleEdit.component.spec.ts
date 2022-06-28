import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleEditComponent } from './eleEdit.component';

describe('EleEditComponent', () => {
  let component: EleEditComponent;
  let fixture: ComponentFixture<EleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EleEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
