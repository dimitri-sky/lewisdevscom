import React, { useState } from "react";
import Modal from "./Modal";
import { addData } from "../lib/firebase";
import { collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Blogs = ({ userId }) => {
  const blogsRef = collection(db, `users/${userId}/blogs`);
  const [blogs] = useCollectionData(blogsRef, { idField: "id" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });

  const handleAddBlog = async () => {
    await addData(userId, "blogs", newBlog);
    setNewBlog({ title: "", content: "" });
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Add Blog</button>
      <Modal
        title="Add Blog"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSubmit={handleAddBlog}
      >
        {/* Add form fields for the blog */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        />
      </Modal>

      {/* Render blogs */}
      {blogs &&
        blogs.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))}
    </>
  );
};

export default Blogs;
