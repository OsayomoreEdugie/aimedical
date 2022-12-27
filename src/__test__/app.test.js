import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';

describe("ComponentsIn", () => {
  it("app has weather text header", () => {
    render(<App />);
    const appElement = screen.getByTestId('textHeader');
    expect(appElement).toBeInTheDocument();
    expect(appElement).toHaveTextContent('Stockholm Weather');
  });

  it("data not found text should be", () => {
    const noDataTextElement = screen.queryByTestId('noDataText');
    waitFor(() => expect(noDataTextElement).toBeInTheDocument());
    waitFor(() => expect(noDataTextElement).toHaveTextContent("Couldn't get data"));
  });

  it("scale loader should have perfect color and size", () => {
    const scaleLoader = screen.queryByTestId('loader');
    waitFor(() => expect(scaleLoader).toBeInTheDocument());
    waitFor(() => expect(scaleLoader).toHaveColor('#FFF'));
    waitFor(() => expect(scaleLoader).toHaveSize(150));
  });
});

