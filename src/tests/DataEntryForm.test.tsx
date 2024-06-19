import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useData } from "../contexts/DataContext";
import DataEntryForm from "../components/DataEntryForm";

jest.mock("../contexts/DataContext");

describe("DataEntryForm", () => {
  it("displays error message when invalid data is entered", async () => {
    const data = {
      userId: "invalid",
      id: "invalid",
      title: "",
      body: "",
    };

    (useData as jest.Mock).mockImplementation(() => ({
      addData: jest.fn(),
    }));

    const view = render(<DataEntryForm />);
    const screen = view;

    const userIdInput = screen.getByPlaceholderText("User ID");
    const idInput = screen.getByPlaceholderText("Post ID");
    const titleInput = screen.getByPlaceholderText("Title");
    const bodyInput = screen.getByPlaceholderText("Body");

    fireEvent.change(userIdInput, { target: { value: data.userId } });
    fireEvent.change(idInput, { target: { value: data.id } });
    fireEvent.change(titleInput, { target: { value: data.title } });
    fireEvent.change(bodyInput, { target: { value: data.body } });

    const submitButton = screen.getByText("Add");
    fireEvent.click(submitButton);

    await waitFor(() => expect(useData().addData).toHaveBeenCalledTimes(0));

    const errorElement = screen.getByText(
      "All fields are required and must be valid!"
    );
    expect(errorElement).toBeInTheDocument();
  });

  it("displays success message when valid data is entered", async () => {
    const data = {
      userId: 1,
      id: 1,
      title: "Title",
      body: "Body",
    };

    (useData as jest.Mock).mockImplementation(() => ({
      addData: jest.fn(),
    }));

    const view = render(<DataEntryForm />);
    const screen = view;

    const userIdInput = screen.getByPlaceholderText("User ID");
    const idInput = screen.getByPlaceholderText("Post ID");
    const titleInput = screen.getByPlaceholderText("Title");
    const bodyInput = screen.getByPlaceholderText("Body");

    fireEvent.change(userIdInput, { target: { value: data.userId } });
    fireEvent.change(idInput, { target: { value: data.id } });
    fireEvent.change(titleInput, { target: { value: data.title } });
    fireEvent.change(bodyInput, { target: { value: data.body } });

    const submitButton = screen.getByText("Add");
    fireEvent.click(submitButton);

    const successElement = screen.getByText("Data added successfully!");
    expect(successElement).toBeInTheDocument();
  });
});
