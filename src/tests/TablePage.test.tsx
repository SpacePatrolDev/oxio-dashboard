import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useData } from "../contexts/DataContext";
import TablePage from "../components/TablePage";

jest.mock("../contexts/DataContext");

describe("TablePage", () => {
  it("sorts data on header click", async () => {
    const data = [
      { userId: 1, id: 1, title: "Title 1", body: "Body 1" },
      { userId: 2, id: 2, title: "Title 2", body: "Body 2" },
    ];

    (useData as jest.Mock).mockImplementation(() => ({
      data,
      setData: jest.fn(),
    }));

    const view = render(<TablePage />);
    const screen = view;

    const userIdHeader = screen.getByText("User ID", { exact: true });
    fireEvent.dblClick(userIdHeader);

    const sortedData = useData().data;

    const sortedUserId = sortedData[0].userId;
    expect(sortedUserId).toBe(Math.min(...data.map((item) => item.userId)));
  });
});
