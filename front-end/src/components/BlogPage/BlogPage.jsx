import React, { useState, useEffect } from "react";
import "./BlogPage.css";
import {
  getPosts,
  postPost,
  editBlog,
  deleteBlog,
  getUser,
} from "../../../api/auth";
import { Footer } from '../LandingPage';
import NavBar from '../LandingPage/navbar/navbar';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editId, setEditId] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await getUser();
      console.log("Fetched current user:", user); // Debug log
      setCurrentUser(user);
    } catch (error) {
      handleError("Error fetching current user", error);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPosts();
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        setPosts([]);
        handleError(
          "Error: Received data is not an array",
          new Error("Data type error")
        );
      }
    } catch (error) {
      handleError("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // const handleImageUpload = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() /* || !image */) {
      setError("Title and content are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // const imageUrl = await uploadImage(image);
      await postPost({ title, content /* , imageUrl */ });
      clearForm();
      fetchPosts();
    } catch (error) {
      handleError("Error creating post", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (blogId, updatedTitle, updatedContent) => {
    try {
      await editBlog({
        blog_id: blogId,
        title: updatedTitle,
        content: updatedContent,
      });
      fetchPosts();
      setEditId("");
      setIsEditing(false);
    } catch (error) {
      handleError("Error editing blog", error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId);
      fetchPosts();
    } catch (error) {
      handleError("Error deleting blog", error);
    }
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    // setImage(null);
  };

  const handleError = (message, error) => {
    console.error(message, error);
    setError(message);
  };

  const handleEditInputChange = (e) => {
    if (e.target.name === "editedTitle") {
      setEditedTitle(e.target.value);
    } else {
      setEditedContent(e.target.value);
    }
  };

  const closeModal = (confirmed = false) => {
    if (confirmed || !isEditing) {
      setShowModal(false);
      setSelectedPost(null);
      handleEditCancel();
    }
  };

  const handleCancelConfirmation = () => {
    if (isEditing && (editedTitle.trim() || editedContent.trim())) {
      const confirmCancel = window.confirm("Are you sure you want to cancel? Your changes will be lost.");
      closeModal(confirmCancel);
    } else {
      closeModal(true);
    }
  };

  const handleEditCancel = () => {
    setEditId("");
    setIsEditing(false);
    setEditedTitle("");
    setEditedContent("");
  };

  const handleEditClick = (post) => {
    setIsEditing(true);
    setEditId(post.id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  return (
    <div className="BlogPage">
      <NavBar className="fadeIn about-nav" />
      <div className="hero-section">
        <h1 className="fadeIn">Welcome to Our Blog</h1>
        <p className="fadeIn">Explore our latest posts and share your thoughts.</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      {loading && !posts.length && <p className="loading-message">Loading...</p>}
      <div className="blog-posts">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="blog-post" onClick={() => handlePostClick(post)}>
              <div className="blog-post-image">
                <img src={post.imageUrl || `https://picsum.photos/seed/${post.id}/300/200`} alt={post.title} />
              </div>
              <h2 className="fadeIn">{post.title}</h2>
              <p className="blog-snippet">{post.content}</p>
              <p className="blog-post-info">
                <span>
                  Posted by {post.first_name} {post.last_name}
                </span>
                <span> | {new Date(post.created_at).toLocaleString()}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="fadeIn">No posts available.</p>
        )}
      </div>
      <form className="blog-form" onSubmit={handleSubmit}>
        <h2 className="fadeIn">Create a New Post</h2>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className="blog-input"
          required
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
          className="blog-input"
          required
        ></textarea>
        {/* Image upload input (commented out) */}
        {/* <label htmlFor="image">Image:</label>
        <input
          type="file"          
          // id="image"
          // accept="image/*"
          // onChange={handleImageUpload}
          // className="blog-input"
        // /> */}
        {/* Button to submit the form */}
        <button type="submit" className="blog-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <Footer className="fadeIn about-footer" />

      {showModal && selectedPost && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="fadeIn">{selectedPost.title}</h2>
            <p className="fadeIn">{selectedPost.content}</p>
            <div className="blog-post-image">
              <img src={selectedPost.imageUrl || `https://picsum.photos/seed/${selectedPost.id}/600/400`} alt={selectedPost.title} />
            </div>
            <p className="blog-post-info">
              <span>
                Posted by {selectedPost.first_name} {selectedPost.last_name}
              </span>
              <span> | {new Date(selectedPost.created_at).toLocaleString()}</span>
            </p>
            {currentUser && currentUser.id === selectedPost.user_id && ( // Ensure the current user matches the post creator
  <>
    <button onClick={() => handleEditClick(selectedPost)}>
      Edit
    </button>
    <p></p>
    <button onClick={() => handleDelete(selectedPost.id)}>
      Delete
    </button>
  </>
)}

            {isEditing && (
              <div className="edit-form">
                <label htmlFor="editedTitle">Title:</label>
                <input
                  type="text"
                  id="editedTitle"
                  name="editedTitle"
                  value={editedTitle}
                  onChange={handleEditInputChange}
                  className="blog-input"
                  required
                />
                <label htmlFor="editedContent">Content:</label>
                <textarea
                  id="editedContent"
                  name="editedContent"
                  value={editedContent}
                  onChange={handleEditInputChange}
                  className="blog-input"
                  required
                ></textarea>
                <button
                  className="blog-button"
                  onClick={() => handleEdit(selectedPost.id, editedTitle, editedContent)}
                >
                  Save
                </button>
              </div>
            )}
            <button className="cancel-button" onClick={handleCancelConfirmation}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPage;
