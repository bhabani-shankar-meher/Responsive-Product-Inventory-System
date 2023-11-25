import NotLoggedInPage from "./NotLoggedInPage";
import { render, screen } from "@testing-library/react";
import { create } from "react-test-renderer";
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe("NOTLOGGEDINPAGE SNAPSHOT", () => {
    test("NotLoggedInPage Snapshot Executed Successfully", () => {
        const notLoggedInSnapshot = create(<NotLoggedInPage />);
        expect(notLoggedInSnapshot).toMatchSnapshot();
    });
});
describe("NOTLOGGEDINPAGE TEST", () => {
    test("NotLoggedInPage Heading Test", () => {
        render(<NotLoggedInPage />);
        expect(
            screen.getByRole("heading", {
                name: "Not Logged In",
            })
        ).toBeInTheDocument();
    });
    test("NotLoggedInPage Test_1", () => {
        render(<NotLoggedInPage />);
        expect(
            screen.getByRole("button", {
                name: /login/i,
            })
        ).toBeInTheDocument();
    });
    test("NotLoggedInPage Test_2", () => {
        render(<NotLoggedInPage />);
        expect(
            screen.getByRole("button", {
                name: /signup/i,
            })
        ).toBeInTheDocument();
    });
});