import { types } from '../../../src/auth';

describe('Pruebas en types', () => { 

    test('Debe regresar estos mismos types', () => {

        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout'
        })
    })

})