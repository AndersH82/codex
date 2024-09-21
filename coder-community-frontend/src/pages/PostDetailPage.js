import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}/`);
        setPost(response.data);
      } catch (error) {
        console.error('Failed to fetch post', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/?post=${id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Failed to fetch comments', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/comments/',
        { post: id, content: newComment },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setNewComment('');
      const response = await axios.get(`/api/comments/?post=${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>Post Detail</h2>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" />}
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default PostDetailPage;