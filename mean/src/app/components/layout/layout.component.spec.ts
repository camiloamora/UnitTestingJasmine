import { MatBottomSheet } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MatBottomSheetStub {
  open() {}
}

fdescribe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      providers: [
        {
          provide: MatBottomSheet, useClass: MatBottomSheetStub
        }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: LayoutComponent
        },
        {
          path: 'app/add',
          component: LayoutComponent
        }])
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set the edit mode to false', () => {
    const verifyEditMode = spyOn(component, 'verifyEditMode').and.callThrough();
    fixture.ngZone.run(() => {
      (<any>component).router.navigate(['/']);

      fixture.whenStable().then(() => {
        expect(component.editMode).toBeFalsy();
        expect(verifyEditMode).toHaveBeenCalled();
      });
    });
  });
});
