import SignUp from "./SignUp";
import { render, screen } from "@testing-library/react";
import { create } from "react-test-renderer";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

describe("SIGNUP PAGE SNAPSHOT", () => {
    test("SignUp Page Snapshot Executed Successfully", () => {
        const signUpSnapshot = create(<SignUp />);
        expect(signUpSnapshot).toMatchSnapshot();
    });
});
describe("SIGNUP PAGE TEST", () => {
    test("SignUp Page Heading Test", () => {
        render(<SignUp />);
        expect(
            screen.getByRole("heading", {
                name: /signup/i,
            })
        ).toBeInTheDocument();
    });
    test("Email", () => {
        render(<SignUp />);
        const label = screen.getAllByText(/email/i);
        expect(label).not.toHaveLength(0);
    });
    test("Password", () => {
        render(<SignUp />);
        const label = screen.getAllByText(/password/i);
        expect(label).not.toHaveLength(0);
    });
    test("Re-Password", () => {
        render(<SignUp />);
        const label = screen.getAllByText(/re-password/i);
        expect(label).not.toHaveLength(0);
    });
    test("First Name", () => {
        render(<SignUp />);
        const label = screen.getAllByText(/first name/i);
        expect(label).not.toHaveLength(0);
    });
    test("Last Name", () => {
        render(<SignUp />);
        const label = screen.getAllByText(/last name/i);
        expect(label).not.toHaveLength(0);
    });
    test("Location", () => {
        render(<SignUp />);
        const label = screen.getAllByText(/location/i);
        expect(label).not.toHaveLength(0);
    });
    test("Mobile", () => {
        render(<SignUp />);
        const label = screen.getAllByText(/mobile/i);
        expect(label).not.toHaveLength(0);
    });
    test("Login Button Test", () => {
        render(<SignUp />);
        expect(
            screen.getByRole("button", {
                name: /signup/i,
            })
        ).toBeInTheDocument();
    });
    test("Back Button Test", () => {
        render(<SignUp />);
        expect(
            screen.getByRole("button", {
                name: /back/i,
            })
        ).toBeInTheDocument();
    });
});
