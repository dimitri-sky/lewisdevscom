import React, { useState } from "react";
import Modal from "./Modal";
import { addData, updateData, deleteData } from "../lib/firebase";
import { collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const Blogs = ({ userId }) => {
  const blogsRef = collection(db, `users/${userId}/blogs`);
  const [blogs, loading, error] = useCollection(blogsRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedBlog, setEditedBlog] = useState(null);

  const handleAddBlog = async () => {
    await addData(userId, "blogs", newBlog);
    setNewBlog({ title: "", content: "" });
    setIsAddModalOpen(false); // Close the modal
  };

  const handleEditBlog = async () => {
    if (!editedBlog.id) {
      console.error("Error: editedBlog.id is undefined");
      return;
    }
    await updateData(userId, "blogs", editedBlog.id, editedBlog);
    setIsEditModalOpen(false);
  };

  const handleDeleteBlog = async (blogId) => {
    await deleteData(userId, "blogs", blogId);
  };

  return (
    <>
      <button onClick={() => setIsAddModalOpen(true)}>Add Blog</button>
      <Modal
        title="Add Blog"
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
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
        blogs.docs.map((doc) => {
          const blogData = doc.data();
          return (
            <div key={doc.id}>
              <h3>{blogData.title}</h3>
              <p>{blogData.content}</p>
              <button
                onClick={() => {
                  setIsEditModalOpen(true);
                  setEditedBlog({ id: doc.id, ...blogData });
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDeleteBlog(doc.id)}>Delete</button>
            </div>
          );
        })}

      {/* Edit blog modal */}
      {editedBlog && (
        <Modal
          title="Edit Blog"
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          onSubmit={handleEditBlog}
        >
          {/* Add form fields for the blog */}
          <label htmlFor="editTitle">Title:</label>
          <input
            type="text"
            id="editTitle"
            value={editedBlog.title}
            onChange={(e) =>
              setEditedBlog({ ...editedBlog, title: e.target.value })
            }
          />
                    <label htmlFor="editContent">Content:</label>
          <textarea
            id="editContent"
            value={editedBlog.content}
            onChange={(e) =>
              setEditedBlog({ ...editedBlog, content: e.target.value })
            }
          />
        </Modal>
      )}
    </>
  );
};

export default Blogs;

