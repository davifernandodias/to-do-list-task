import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDeafultComponent } from './button-deafult.component';

describe('ButtonDeafultComponent', () => {
  let component: ButtonDeafultComponent;
  let fixture: ComponentFixture<ButtonDeafultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDeafultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonDeafultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
