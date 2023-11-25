import AddProduct from "./AddProduct";
import { render, screen } from "@testing-library/react";
import { create } from "react-test-renderer";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

describe("ADDPRODUCT PAGE SNAPSHOT", () => {
    test("AddProduct Page Snapshot Executed Successfully", () => {
        const addProductSnapshot = create(<AddProduct />);
        expect(addProductSnapshot).toMatchSnapshot();
    });
});
describe("ADDPRODUCT PAGE TEST", () => {
    test("Product Name Label", () => {
        render(<AddProduct />);
        const label = screen.getAllByText(/product name/i);
        expect(label).not.toHaveLength(0);
    });
    test("Quantity Label", () => {
        render(<AddProduct />);
        const label = screen.getAllByText(/quantity/i);
        expect(label).not.toHaveLength(0);
    });
    test("Price Label", () => {
        render(<AddProduct />);
        const label = screen.getAllByText(/price/i);
        expect(label).not.toHaveLength(0);
    });
});
