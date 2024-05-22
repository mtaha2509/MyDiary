import React, { useState, useEffect } from 'react';
import './BlogPage.css';
import { getPosts, postPost } from '../../../api/auth';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getPosts();
      console.log('Fetched data:', data); // Log the returned data
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

  const clearForm = () => {
    setTitle('');
    setContent('');
  };

  const handleError = (message, error) => {
    console.error(message, error);
    setError(message);
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
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p className="blog-post-date">{new Date(post.created_at).toLocaleString()}</p>
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