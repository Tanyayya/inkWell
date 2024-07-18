import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Avatar } from './BlogCard';
import dateFormat from 'dateformat';

interface CommentProps {
  id: string;
  text: string;
  userId: string;
  replies?: CommentProps[];
  user: {
    name: string;
  };
  createdAt: string;
}

interface CommentComponentProps {
  comment: CommentProps;
  onReply: () => void;
  userId: string;
}

const Comment: React.FC<CommentComponentProps> = ({ comment, onReply, userId }) => {
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showReplies, setShowReplies] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    try {
      await axios.post(
        `${BACKEND_URL}/api/vi/comments/${comment.id}/replies`,
        { text: replyText },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setReplyText('');
      setReplyVisible(false);
      onReply(); // Refresh the comment list after posting a reply
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/vi/comments/${comment.id}`,
        { text: editedText },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setEditing(false);
      onReply(); // Refresh the comment list after editing
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/vi/comments/${comment.id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      onReply(); // Refresh the comment list after deleting
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comment bg-slate-100 p-4 rounded-lg mb-4 relative">
      <div className="flex items-center mb-2">
        <div className="pr-2 flex-col justify-center">
          <Avatar size="small" name="Tanya" />
        </div>
        <div>
          <div className="text-md cursor-pointer">{comment.user?.name}</div>
          <div className='font-thin text-slate-500 text-sm'>{dateFormat(comment.createdAt, "mmmm dS, yyyy")}</div>
        </div>
      </div>
      {!editing ? (
        <p className="p-1 text-gray-800">{comment.text}</p>
      ) : (
        <div className="flex  flex-col w-full">
          <textarea
            className="w-full border border-gray-300 p-2 rounded-lg"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Edit your comment..."
          />
          <div className="ml-2 p-1">
            <button className=" bg-green-700 rounded-full p-1 text-sm text-white hover:underline" onClick={handleEdit}>
              Update
            </button>
            <button className="text-red-500 hover:underline ml-2" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center mt-2">
        <button
          className="text-gray-500 hover:underline ml-auto"
          onClick={() => setReplyVisible(!replyVisible)}
        >
          Reply
        </button>
        {(userId === comment.userId)?<div className="dropdown ml-2 relative">

        <button
  className="bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none px-3 py-1"
  onClick={toggleDropdown} // Toggle dropdown visibility on click
>
  &#8942;
</button>
<ul className={`dropdown-menu absolute ${dropdownVisible ? 'block' : 'hidden'} text-gray-700 pt-1`}>
  {!editing && (
    <li>
      <button
        className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap w-full text-left"
        onClick={() => setEditing(true)}
      >
        Edit
      </button>
    </li>
  )}
  {userId === comment.userId && (
    <li>
      <button
        className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap w-full text-left"
        onClick={handleDelete}
      >
        Delete
      </button>
    </li>
  )}
</ul>

</div>
:null}
     </div>   

      {replyVisible && (
        <div className="reply-form mt-2">
          <textarea
            className="w-full border border-gray-300 p-2 rounded-lg"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="What are your thoughts?"
          />
          <button
            className="bg-green-700 text-white px-4 py-2 rounded-lg mt-2"
            onClick={handleReply}
          >
            Post Reply
          </button>
        </div>
      )}

      <button
        className="text-green-700 hover:underline ml-auto mt-2"
        onClick={() => setShowReplies(!showReplies)}
      >
        {showReplies ? 'Hide Replies' : 'Show Replies'}
      </button>

      {showReplies && comment.replies && (
        <div className="replies mt-2">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              userId={userId} // Pass userId to nested Comment component
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
