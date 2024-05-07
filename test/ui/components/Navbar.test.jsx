import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter } from "react-router-dom";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}));

describe('Pruebas en navbar', () => { 

    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Juan'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks())

    test('Debe de mostrar el nombre del usuario', () => {


        render(
            <MemoryRouter initialEntries={['/marvel']}>

                <AuthContext.Provider value={contextValue}>
                    <Navbar /> ;
                </AuthContext.Provider>

            </MemoryRouter>
        )

        expect(screen.getByText('Juan')).toBeTruthy();
        
    })

    test('Debe de llamar el logout y navigate cuando se hace click en el boton', () => {

        render(
            <MemoryRouter initialEntries={['/marvel']}>

                <AuthContext.Provider value={contextValue}>
                    <Navbar /> ;
                </AuthContext.Provider>

            </MemoryRouter>
        );

        const logoutBtn = screen.getByRole('button');

        fireEvent.click(logoutBtn);

        expect(screen.getByRole('button')).toBeTruthy();
        expect(mockUseNavigate).toHaveBeenCalledWith('/login', {'replace': true});
        
    });

})