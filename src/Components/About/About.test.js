import About from "./About";
import { render, screen } from "@testing-library/react";
import { create } from "react-test-renderer";

describe("ABOUT PAGE SNAPSHOT", () => {
    test("About Page Snapshot Executed Successfully", () => {
        const aboutSnapshot = create(<About />);
        expect(aboutSnapshot).toMatchSnapshot();
    });
});
describe("ABOUT PAGE TEST", () => {
    test("About Page Heading Test", () => {
        render(<About />);
        expect(
            screen.getByRole("heading", {
                name: "PRODUCT INVENTORY",
            })
        ).toBeInTheDocument();
    });
    test("About Page Test_1", () => {
        render(<About />);
        expect(
            screen.getByRole("heading", {
                name: "Product Inventory System is React CAPSTONE Project developed with functional components.",
            })
        ).toBeInTheDocument();
    });
});