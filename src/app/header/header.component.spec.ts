import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header.component';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validations', () => {
    it('should be an invalid form', () => {
      component.submitForm();
      expect(component.form.controls['search'].hasError('required')).toBeTrue();
      expect(component.form.valid).toBeFalse();
    });

    it('should generate a pattern error', () => {
      component.form.controls['search'].setValue('Carlos');
      component.submitForm();
      expect(component.form.controls['search'].hasError('pattern')).toBeTrue();
    });

    it('should not to show any error', () => {
      component.form.controls['search'].setValue('192.168.12.1');
      component.submitForm();
      expect(component.form.controls['search'].hasError('pattern')).toBeFalse();
      expect(
        component.form.controls['search'].hasError('required')
      ).toBeFalse();
      expect(component.form.valid).toBeTrue();
    });

    it('should be dirty and touched', () => {
      component.submitForm();
      expect(component.form.controls['search'].touched).toBeTrue();
      expect(component.form.controls['search'].dirty).toBeTrue();
    });
  });

  it('should get the search field value', () => {
    component.form.controls['search'].setValue('Carlos');
    expect(component.search.value).toBe('Carlos');
  });
});
