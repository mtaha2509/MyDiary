import React, { useState, useEffect } from 'react';
import './BlogPage.css';
import { getPosts, postPost, editBlog, deleteBlog } from '../../../api/auth';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editId, setEditId] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getPosts();
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        setPosts([]);
        handleError('Error: Received data is not an array', new Error('Data type error'));
      }
    } catch (error) {
      handleError('Error fetching posts', error);
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
      setError('Title and content cannot be empty');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await postPost({ title, content });
      clearForm();
      fetchPosts();
    } catch (error) {
      handleError('Error creating post', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (blogId, updatedTitle, updatedContent) => {
    try {
      await editBlog({ blog_id: blogId, title: updatedTitle, content: updatedContent });
      fetchPosts();
      setEditId('');
      setIsEditing(false);
    } catch (error) {
      handleError('Error editing blog', error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId);
      fetchPosts();
    } catch (error) {
      handleError('Error deleting blog', error);
    }
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
  };

  const handleError = (message, error) => {
    console.error(message, error);
    setError(message);
  };

  const handleEditInputChange = (e) => {
    if (e.target.name === 'editedTitle') {
      setEditedTitle(e.target.value);
    } else {
      setEditedContent(e.target.value);
    }
  };

  const handleEditCancel = () => {
    setEditId('');
    setIsEditing(false);
    setEditedTitle('');
    setEditedContent('');
  };

  const handleEditClick = (post) => {
    setIsEditing(true);
    setEditId(post.id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  return (
    <div className="BlogPage">
      <h1>My Blog</h1>
      {error && <p className="error-message">{error}</p>}
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
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {loading && !posts.length && <p>Loading...</p>}
      <div className="blog-posts">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="blog-post">
              {isEditing && editId === post.id ? (
                <>
                  <input
                    type="text"
                    name="editedTitle"
                    value={editedTitle}
                    onChange={handleEditInputChange}
                  />
                  <textarea
                    name="editedContent"
                    value={editedContent}
                    onChange={handleEditInputChange}
                  ></textarea>
                  <button onClick={() => handleEdit(post.id, editedTitle, editedContent)}>Save</button>
                  <button onClick={handleEditCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <p className="blog-post-date">{new Date(post.created_at).toLocaleString()}</p>
                  <button onClick={() => handleEditClick(post)}>Edit</button>
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default BlogPage;