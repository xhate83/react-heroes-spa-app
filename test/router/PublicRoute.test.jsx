import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe('Pruebas en public route', () => {

    test('debe de mostrar el children si no esta autenticado', () => {

        const contextValue = {
            logged: false
        }
        
        render(
            <AuthContext.Provider value={contextValue}> 
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta pública')).toBeTruthy();

    })

    test('debe de navegar si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Juan'
            }
        }
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        }/>

                        <Route path="marvel" element={<h1>Página marvel</h1>}></Route>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

     
        expect(screen.getByText('Página marvel')).toBeTruthy();
    })
})