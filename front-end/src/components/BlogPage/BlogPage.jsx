import React, { useState, useEffect } from 'react';
import './BlogPage.css';
import { getBlogPosts, postBlogPosts } from '../../../api/auth';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts', error);
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
    try {
      await postBlogPosts({ title, content });
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <div className="BlogPage">
      <h1>My Blog</h1>
      <form className="blog-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className="blog-input"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
          className="blog-input"
          required
        ></textarea>
        <button type="submit" className="blog-button">Submit</button>
      </form>
      <div className="blog-posts">
        {posts.map((post) => (
          <div key={post.id} className="blog-post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p className="blog-post-date">{new Date(post.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;