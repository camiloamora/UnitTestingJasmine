import { routes } from './app-routing.module';
import { PinsComponent } from './components/pins/pins.component';

fdescribe('App routing', () => {

  // Ciclos de vida de las pruebas unitarias
  // recibe un callback y ejcuta la función que se asigne
  beforeAll(() => {
    console.log('beforeAll')
  });

  // Se ejecuta antes de cada una de las pruebas
  beforeEach(() => {
    console.log('beforeEach')
  });

  // Se ejecuta despúes de todas de las pruebas
  afterAll(() => {
    console.log('afterAll')
  });

  afterEach(() => {
    console.log('afterEach')
  });

  it('Should have app  as path', () => {
    expect(routes[0].path).toBe('app');
  });

  it('Should match the children', () => {
    expect(routes[0].children).toContain(
      {
        path: 'pins',
        component: PinsComponent
      }
    );
  });
});
