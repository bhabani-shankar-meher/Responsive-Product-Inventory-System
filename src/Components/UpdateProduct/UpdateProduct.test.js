import { render, screen } from "@testing-library/react";
import { create } from "react-test-renderer";
import UpdateProduct from "./UpdateProduct";
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));
describe("UPDATEPRODUCT PAGE SNAPSHOT", () => {
    test("UpdateProduct Page Snapshot Executed Successfully", () => {
        const updateProductSnapshot = create(<UpdateProduct />);
        expect(updateProductSnapshot).toMatchSnapshot();
    });
});

describe("UPDATEPRODUCT PAGE TEST", () => {
    test("Product Name Label", () => {
        render(<UpdateProduct />);
        const label = screen.getAllByText(/product name/i);
        expect(label).not.toHaveLength(0);
    });
    test("Quantity Label", () => {
        render(<UpdateProduct />);
        const label = screen.getAllByText(/quantity/i);
        expect(label).not.toHaveLength(0);
    });
    test("Price Label", () => {
        render(<UpdateProduct />);
        const label = screen.getAllByText(/price/i);
        expect(label).not.toHaveLength(0);
    });
    test("Submit Button Test", () => {
        render(<UpdateProduct />);
        expect(
            screen.getByRole("button", {
                name: /submit/i,
            })
        ).toBeInTheDocument();
    });
    test("Back Button Test", () => {
        render(<UpdateProduct />);
        expect(
            screen.getByRole("button", {
                name: /back/i,
            })
        ).toBeInTheDocument();
    });
});
