import ContactUs from "./ContactUs";
import { render, screen } from "@testing-library/react";
import { create } from "react-test-renderer";

describe("CONTACTUS PAGE SNAPSHOT", () => {
    test("ContactUs Page Snapshot Executed Successfully", () => {
        const contactUsSnapshot = create(<ContactUs />);
        expect(contactUsSnapshot).toMatchSnapshot();
    });
});
describe("CONTACTUS PAGE TEST", () => {
    test("ContactUs Page Heading Test", () => {
        render(<ContactUs />);
        expect(
            screen.getByRole("heading", {
                name: "Contact Us",
            })
        ).toBeInTheDocument();
    });
    test("ContactUs Page Test_1", () => {
        render(<ContactUs />);
        expect(
            screen.getByRole("heading", {
                name: "If you have or issue or query please write mail to us bhabani.meher@wipro.com",
            })
        ).toBeInTheDocument();
    });
    test("ContactUs Page Test_2", () => {
        render(<ContactUs />);
        expect(
            screen.getByRole("heading", {
                name: "Or you can reach out to us by dialing 7606044523",
            })
        ).toBeInTheDocument();
    });
    test("ContactUs Page Test_3", () => {
        render(<ContactUs />);
        expect(screen.getByText('bhabani.meher@wipro.com').closest('a')).toHaveAttribute('href', 'mailto:bhabani.meher@wipro.com')
    });
    test("ContactUs Page Test_4", () => {
        render(<ContactUs />);
        expect(screen.getByText('7606044523').closest('a')).toHaveAttribute('href', '#')
    });
});