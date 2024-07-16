

import dateFormat from 'dateformat';

import {  RBlog } from '../hooks';
import { Avatar, Circle } from './BlogCard';


export interface BlogID {
  title: string;
  content: string;
  anonymous: boolean;
  id: string;
}
export interface User{
  id:string
  saved:string[],
  following:string[]
}

export const CompleteCollaborateBlog = ({ rblog }: { rblog: RBlog }) => {
  
  
  
  
  
 

  
  
  // const name = rblog.anonymous ? 'Anonymous' : rblog.author;
  const words = rblog.content.split(' ');

  // Function to handle following a user
  

  return (
    <div className="">
      <div className="flex justify-center flex-grow items-center p-8 m-auto">
        <div className="flex justify-center flex-col max-w-[800px] bg-slate-100 p-2">
          <div className="p-8">
            
          </div>
          <div className="flex justify-center items-center">
            <div className="px-10 py-12 overflow-hidden">
              <div className="">
                <div className="text-5xl font-extrabold">{rblog.title}</div>
                <div className="">
                  <div className="flex py-4">
                    <div className="pr-4 flex-col justify-center">
                      <Avatar size="big" name="Tanya"></Avatar>
                    </div>
                    <div>
                      <div className="p-2 text-md cursor-pointer">Tanya</div>
                    </div>
                    
                  </div>
                </div>
                <div className="flex text-slate-500 pt-4">
                  <div className="flex justify-center flex-col">{`${Math.ceil(words.length / 200)} min read`}</div>
                  <div className="flex justify-center flex-col pl-2">
                    <Circle></Circle>
                  </div>
                  <div className="flex justify-center flex-col pl-2">
                    {dateFormat(rblog.publishedDate, 'mmmm dS, yyyy')}
                  </div>
                </div>
                <div className="pt-4 overflow-hidden">
                  <div dangerouslySetInnerHTML={{ __html: rblog.content }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};