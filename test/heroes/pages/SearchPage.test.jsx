import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes"

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}));


describe('Pruebas Search page', () => {


    beforeEach(() => jest.clearAllMocks())

    test('Debe de mostrar el componente correctamente con valores por defecto', () => {

        const {container } = render(

            <MemoryRouter >
                <SearchPage />
            </MemoryRouter>

        );

        expect(container).toMatchSnapshot();

    })

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {

        render(

            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const inputValue = screen.getByRole('textbox');
        expect(inputValue.value).toBe('batman');
    

        const img = screen.getByRole('img');
        expect(img.src).toContain('/heroes/dc-batman.jpg');

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('none');

    })

    test('Debe de mostrar un error si no se encuentra el hero', () => {

        render(

            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('');

    })

    test('Debe de llamar el navigate a la pantalla nueva', () => {

        render(

            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const textHero = 'superman'
        const inputValue = screen.getByRole('textbox');
        fireEvent.change(inputValue, { target: { value: textHero } });

        // llamar el submit del formulario
        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${textHero}`);


    })
})