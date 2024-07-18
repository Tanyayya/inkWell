import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config'; // Replace with your backend URL
import { decode } from 'hono/jwt';
import Comment from './Comments';
interface CommentProps {
  id: string;
  text: string;
  userId: string;
  replies?: CommentProps[];
  user: {
    name: string;
  };
  createdAt:string
}

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [newComment, setNewComment] = useState('');
  const token = localStorage.getItem('token');
  const { payload } = decode(token || '');
  const userId = payload.id as string;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get<{ comments: CommentProps[] }>(
        `${BACKEND_URL}/api/vi/comments/${postId}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleNewComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `${BACKEND_URL}/api/vi/comments/${postId}`,
        {
          text: newComment,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setNewComment('');
      fetchComments(); // Refresh the comment list after posting a new comment
    } catch (error) {
      console.error('Error posting new comment:', error);
    }
  };

  return (
    <div className="comment-list bg-white p-6 rounded-lg items-center m-auto shadow-md max-w-[800px]">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="new-comment-form mb-4">
        <textarea
          className="w-full border border-gray-300 p-2 rounded-lg mb-2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button
          className="bg-green-700 text-white px-4 py-2 rounded-lg"
          onClick={handleNewComment}
        >
          Post Comment
        </button>
      </div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={fetchComments}
          userId={userId} // Pass userId to Comment component
        />
      ))}
    </div>
  );
};

export default CommentList;
