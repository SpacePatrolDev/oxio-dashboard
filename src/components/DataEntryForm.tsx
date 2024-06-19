import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import "../styles/DataEntryForm.css";

interface DataItem {
  userId: number | string;
  id: number | string;
  title: string;
  body: string;
}

const DataEntryForm: React.FC = () => {
  const [formData, setFormData] = useState<DataItem>({
    userId: "",
    id: "",
    title: "",
    body: "",
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { addData } = useData();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    const userId = Number(formData.userId);
    const id = Number(formData.id);

    if (
      userId <= 0 ||
      id <= 0 ||
      formData.title.trim() === "" ||
      formData.body.trim() === ""
    ) {
      setError("All fields are required and must be valid!");
      setSuccess(null);
      return;
    }

    addData({ ...formData, userId, id });
    setFormData({ id: "", userId: "", title: "", body: "" });
    setError(null);
    setSuccess("Data added successfully!");
  };

  return (
    <div className="form-wrapper">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form className="data-entry-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="User ID"
            type="number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">Post ID</label>
          <input
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Post ID"
            type="number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Body"
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DataEntryForm;
