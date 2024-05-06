import { authReducer, types } from '../../../src/auth';


describe('Pruebas authReducer', () => {

    const initialState = {
            logged: false,
            user: null
        }

    test('Debe retornar el estado por defecto', () => { 

        const newState = authReducer(initialState, {});
        expect(newState).toBe(initialState);
    })

    test('Debe realizar el login', () => { 

        const action = { 
            type: types.login, 
            payload: {
                name: 'Julian',
                id: '123'
            }
        };

        const newState = authReducer(initialState, action);
        expect(newState.logged).toBe(true);
        expect(newState).toEqual({
            logged: true,
            user: action.payload

        });
    })


    test('Debe realizar el logout', () => {

        const loggedState = {
            logged: true,
            user: {
                name: 'Julian',
                id: '123'
            }
        }

        const action = { 
            type: types.logout, 
            payload: null
        };
        const newState = authReducer(loggedState, action);
        expect(newState.logged).toBe(false);
        expect(newState.user).toBe(null);
    })


})