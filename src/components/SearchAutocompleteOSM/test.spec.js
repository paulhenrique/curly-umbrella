import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchAutocompleteOSM from "./index";

it("O componente de Autocomplete é renderizado na tela", () => {
  render(<SearchAutocompleteOSM />);
  expect(screen.getByTestId("SearchAutocompleteOSM"));
});

it("O componente de textField do Autocomplete é renderizado na tela", () => {
  render(<SearchAutocompleteOSM />);
  expect(screen.getByTestId("searchAutocompleteTextField"));
});

it("O componente de Autocomplete e o label estão sendo exibidos na tela", () => {
  render(<SearchAutocompleteOSM />);
  expect(screen.getByText("Procurar por"));
});

it("Ao interagir com o Autocomplete de endereço os dados são exibidos corretamente", () => {
  render(<SearchAutocompleteOSM />);
  screen.getByTestId("searchAutocompleteTextField").focus();
  expect(screen.getByPlaceholderText("Digite para encontrar um texto"));
});

it("É possível digitar no autocomplete", () => {
  render(<SearchAutocompleteOSM />);
  const element = screen
    .getByTestId("searchAutocompleteTextField")
    .querySelector("input");
  fireEvent.change(element, {
    target: { value: "23" },
  });
  expect(element.value).toBe("23");
});

it("Ao digitar no autocomplete a função onChange não é chamada", () => {
  const handleChange = jest.fn();
  render(<SearchAutocompleteOSM onChange={handleChange} />);
  const element = screen
    .getByTestId("searchAutocompleteTextField")
    .querySelector("input");
  fireEvent.change(element, {
    target: { value: "23" },
  });
  expect(handleChange).not.toHaveBeenCalled();
  expect(handleChange).not.toHaveBeenCalledWith("23");
});

jest.setTimeout(30000);

it("Ao digitar no autocomplete após 3 segundos a função onChange não foi chamada", async () => {
  const handleChange = jest.fn();
  render(<SearchAutocompleteOSM onChange={handleChange} />);
  const element = screen
    .getByTestId("searchAutocompleteTextField")
    .querySelector("input");
  fireEvent.change(element, {
    target: { value: "23" },
  });
  await new Promise((r) => setTimeout(r, 3000));
  expect(handleChange).not.toHaveBeenCalled();
  expect(handleChange).toHaveBeenCalledWith("23");
});

it("Ao digitar no autocomplete a após 5 segundos a função onChange é chamada", async () => {
  const handleChange = jest.fn();
  render(<SearchAutocompleteOSM onChange={handleChange} />);
  const element = screen
    .getByTestId("searchAutocompleteTextField")
    .querySelector("input");
  fireEvent.change(element, {
    target: { value: "23" },
  });
  await new Promise((r) => setTimeout(r, 5000));
  expect(handleChange).toHaveBeenCalled();
  expect(handleChange).toHaveBeenCalledWith("23");
});
