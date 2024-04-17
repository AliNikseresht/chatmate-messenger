import React, { createContext, useState, useContext, ReactNode } from "react";

import { PostType } from "../types/models";

interface PostContextType {
  posts: PostType[];
  addPost: (newPost: PostType) => void;
  deletePost: (postId: string) => void;
  editPost: (postId: string, updatedPost: PostType) => void;
  archivePost: (postId: string) => void;
  mentionPost: (postId: string, username: string) => void;
  location: string;
  setLocation: (newLocation: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [location, setLocation] = useState<string>("");
  const addPost = (newPost: PostType) =>
    setPosts((prevPosts) => [...prevPosts, newPost]);
  const deletePost = (postId: string) =>
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  const editPost = (postId: string, updatedPost: PostType) =>
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  const archivePost = (postId: string) =>
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, archived: true } : post
      )
    );

  const mentionPost = (postId: string, username: string) => {
    console.log(`User ${username} mentioned in post ${postId}`);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        deletePost,
        editPost,
        archivePost,
        mentionPost,
        location,
        setLocation,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
