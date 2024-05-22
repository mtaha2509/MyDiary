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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await postPost({ title, content });
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

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="BlogPage">
      <NavBar className="fadeIn about-nav" />
      <h1 className="fadeIn">Blogs</h1>
      {error && <p className="error-message">{error}</p>}
      {loading && !posts.length && <p className="loading-message">Loading...</p>}
      <div className="blog-posts">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="blog-post" onClick={() => handlePostClick(post)}>
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
        <button type="submit" className="blog-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <Footer className="fadeIn about-footer" />

      {showModal && selectedPost && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <h2 className="fadeIn">{selectedPost.title}</h2>
            <p className="fadeIn">{selectedPost.content}</p>
            <p className="blog-post-info">
              <span>
                Posted by {selectedPost.first_name} {selectedPost.last_name}
              </span>
              <span> | {new Date(selectedPost.created_at).toLocaleString()}</span>
            </p>
            {currentUser && currentUser === selectedPost.user_id && (
              <>
                <button onClick={() => handleEditClick(selectedPost)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(selectedPost.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPage;
