import { MatSnackBar } from '@angular/material';
import { NavigationService } from 'src/app/services/navigation.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FormComponent } from './form.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormArray } from '@angular/forms';

class RepositoryServiceStub {
  savePins() {
    return of(true);
  }
}

class NavigationServiceStub {
    goToPins() {}
}

class MatSnackBarStub {
  open() {
    return {
      afterDismissed: () => {
        return of(true);
      }
    }
  }
}

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: NavigationService, useClass: NavigationServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When component is initilizated', () => {
    it('should create the forms', () => {
      console.log(Object.keys(component.firstFormGroup.controls))
      expect(Object.keys(component.firstFormGroup.controls)).toEqual([
        'title',
        'author',
        'description'
      ]);

      expect(Object.keys(component.secondFormGroup.controls)).toEqual([
        'firstAsset',
        'assets'
      ]);
    });
  });

  describe('when addAsset is executed', () => {
      it('Should add new group', () => {
        const assets = <FormArray>component.secondFormGroup.get('assets');

        component.addAsset();
        component.addAsset();

        console.log(Object.keys(assets.controls));
        expect(Object.keys(assets.controls)).toEqual(['0', '1']);
    });
  });

  describe('When delete asset', () => {
    it('Should remove th form control', () => {
      const assets = <FormArray>component.secondFormGroup.get('assets');
      component.addAsset();
      component.deleteAsset(0);
      expect(Object.keys(assets.controls)).toEqual([]);
    });
  });

  describe('When savePin is executed', () => {
    it('Should navigate to pins view', () => {
      const navigate = spyOn((<any>component).navigate, 'goToPins');
      const open = spyOn((<any>component).snackBar, 'open').and.callThrough();
    });
  });

});
