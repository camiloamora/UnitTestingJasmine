const saludar = require('../app');

// boolean, string, number
var x = true;
var a = {};
var b = {};

// Grupo de pruebas
describe('Verificar que la variable es true', () => {
    it('La función saluda', () => {
        expect(saludar('Platzi')).toBe('Hola Platzi');
      });
    
    it('La función saluda', () => {
    expect(saludar('Platzi')).toContain('Hola');
    });

    it('X es true', () => {
        expect(x).toBeTruthy();
    })

    // it('X es true', () => {
    //     expect(x).toBeFalsy();
    // })

    //Validacion exacta
    it('X es true', () => {
        expect(x).toBe(true);
    })

    //Validacion exacta
    it('X es true', () => {
        expect(x).toEqual(true);
    })

    it('Objetos iguales', () => {
        expect(a).toEqual(b);
    })
})

