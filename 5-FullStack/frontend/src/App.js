import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "/api";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users`);
      if (response.data.success) {
        setUsers(response.data.data);
        toast.success("Users loaded successfully!");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create new user
  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Name and email are required!");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users`, {
        name: formData.name,
        email: formData.email,
        age: formData.age ? parseInt(formData.age) : null,
      });

      if (response.data.success) {
        toast.success("User created successfully!");
        setFormData({ name: "", email: "", age: "" });
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create user";
      toast.error(errorMessage);
    }
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Name and email are required!");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/users/${editingUser.id}`, {
        name: formData.name,
        email: formData.email,
        age: formData.age ? parseInt(formData.age) : null,
      });

      if (response.data.success) {
        toast.success("User updated successfully!");
        setFormData({ name: "", email: "", age: "" });
        setEditingUser(null);
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update user";
      toast.error(errorMessage);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/users/${userId}`);

      if (response.data.success) {
        toast.success("User deleted successfully!");
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete user";
      toast.error(errorMessage);
    }
  };

  // Start editing user
  const startEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age || "",
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", age: "" });
  };

  return (
    <div className="container">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="header">
        <h1>🚀 5-FullStack</h1>
        <p>React.js + Node.js + MySQL + Docker + Nginx</p>
      </div>

      {/* User Form */}
      <div className="form-container">
        <h2>{editingUser ? "✏️ Edit User" : "➕ Add New User"}</h2>
        <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter age (optional)"
              min="1"
              max="150"
            />
          </div>

          <div className="form-actions">
            {editingUser ? (
              <>
                <button type="submit" className="btn btn-success">
                  Update User
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-primary">
                สร้างผู้ใช้งาน
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="users-container">
        <h2>👥 Users ({users.length})</h2>

        {loading ? (
          <div className="loading">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="loading">No users found. Create your first user!</div>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Age:</strong> {user.age || "Not specified"}
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="user-actions">
                  <button
                    className="btn btn-warning"
                    onClick={() => startEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
