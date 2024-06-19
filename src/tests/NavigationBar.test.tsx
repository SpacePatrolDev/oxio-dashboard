import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

test("handles route changes", async () => {
  const { getByText } = render(<App />);

  fireEvent.click(getByText("Table"));
  await waitFor(() => expect(getByText("Table")).toBeInTheDocument());
  expect(window.location.pathname).toBe("/table");

  fireEvent.click(getByText("Add Data"));
  await waitFor(() => expect(getByText("Add Data")).toBeInTheDocument());
  expect(window.location.pathname).toBe("/data-form");
});
