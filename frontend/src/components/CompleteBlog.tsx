import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dateFormat from 'dateformat';
import { decode } from 'hono/jwt';
import { Blogs } from '../hooks';
import { Avatar, Circle } from './BlogCard';
import { BACKEND_URL } from '../config';

export interface BlogID {
  title: string;
  content: string;
  anonymous: boolean;
  id: string;
}

export const CompleteBlog = ({ blog }: { blog: Blogs }) => {
  const token = localStorage.getItem('token');
  const { payload } = decode(token || '');
  const userId = payload.id as string;

  const [follow, setFollow] = useState<boolean>(false); // State to track follow status
  const name = blog.anonymous ? 'Anonymous' : blog.author.name;
  const words = blog.content.split(' ');

  // Function to handle following a user
  async function followUser(id: string, followerId: string) {
    try {
      const payload = {
        id,
        followerId
      };

      await axios.put(`${BACKEND_URL}/api/vi/user/follow`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Update state to indicate following
      setFollow(true);
      
    } catch (error:any) {
      console.error('Error following user:', error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.error : error.message);
    }
  }

  // Function to handle unfollowing a user
  async function unfollowUser(id: string, followerId: string) {
    try {
      const payload = {
        id,
        followerId
      };

      await axios.put(`${BACKEND_URL}/api/vi/user/unfollow`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setFollow(false);
      
    } catch (error:any) {
      console.error('Error unfollowing user:', error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.error : error.message);
    }
  }

  return (
    <div className="">
      <div className="flex justify-center flex-grow items-center p-8 m-auto">
        <div className="flex justify-center flex-col max-w-[800px] bg-slate-100 p-2">
          <div className="p-8">
            <Link to={`/editPost/${blog.id}`}>
              {userId === blog.author.id ? (
                <button
                  type="button"
                  className="text-gray-900 bg-slate-200 hover:text-white border border-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Edit Post
                </button>
              ) : null}
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <div className="px-10 py-12 overflow-hidden">
              <div className="">
                <div className="text-5xl font-extrabold">{blog.title}</div>
                <div className="">
                  <div className="flex py-4">
                    <div className="pr-4 flex-col justify-center">
                      <Avatar size="big" name={name}></Avatar>
                    </div>
                    <div>
                      <div className="p-2 text-md cursor-pointer">{name}</div>
                    </div>
                    <div>
                      {/* Conditionally render Follow/Following based on state */}
                      {follow ? (
                        <div
                          onClick={() => unfollowUser(blog.author.id, userId)}
                          className="p-2 text-md text-slate-500 font-medium cursor-pointer"
                        >
                          Following
                        </div>
                      ) : (
                        <div
                          onClick={() => followUser(blog.author.id, userId)}
                          className="p-2 text-md text-green-700 font-medium cursor-pointer"
                        >
                          Follow
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex text-slate-500 pt-4">
                  <div className="flex justify-center flex-col">{`${Math.ceil(words.length / 200)} min read`}</div>
                  <div className="flex justify-center flex-col pl-2">
                    <Circle></Circle>
                  </div>
                  <div className="flex justify-center flex-col pl-2">
                    {dateFormat(blog.publishedDate, 'mmmm dS, yyyy')}
                  </div>
                </div>
                <div className="pt-4 overflow-hidden">
                  <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
