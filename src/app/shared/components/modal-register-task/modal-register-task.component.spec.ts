import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegisterTaskComponent } from './modal-register-task.component';

describe('ModalRegisterTaskComponent', () => {
  let component: ModalRegisterTaskComponent;
  let fixture: ComponentFixture<ModalRegisterTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRegisterTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRegisterTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
