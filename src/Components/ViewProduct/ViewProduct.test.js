import ViewProduct from "./ViewProduct";
import { render, screen } from "@testing-library/react";
import { create } from "react-test-renderer";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

describe("VIEWPRODUCT PAGE SNAPSHOT", () => {
    test("ViewProduct Page Snapshot Executed Successfully", () => {
        const viewProductSnapshot = create(<ViewProduct />);
        expect(viewProductSnapshot).toMatchSnapshot();
    });
});
describe("VIEWPRODUCT PAGE TEST", () => {
    test("Update Button Test", () => {
        render(<ViewProduct />);
        expect(
            screen.getByRole("button", {
                name: /update/i,
            })
        ).toBeInTheDocument();
    });
    test("Back Button Test", () => {
        render(<ViewProduct />);
        expect(
            screen.getByRole("button", {
                name: /back/i,
            })
        ).toBeInTheDocument();
    });
});