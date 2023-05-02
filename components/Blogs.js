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
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="px-3 py-1 mb-4 text-sm font-semibold tracking-wide text-white transition duration-200 transform rounded-full bg-gradient-to-r from-red-500 to-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Add Blog
      </button>
      <Modal
        title="Add Blog"
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        onSubmit={handleAddBlog}
      >
        {/* Add form fields for the blog */}
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
        />
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content:
        </label>
        <textarea
          id="content"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
        />
      </Modal>

      {/* Render blogs */}
      {blogs &&
        blogs.docs.map((doc) => {
          const blogData = doc.data();
          return (
            <div
              key={doc.id}
              className="p-4 mb-4 transition duration-200 transform bg-white rounded-lg shadow-md hover:scale-105"
            >
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                {blogData.title}
              </h3>
              <p className="text-gray-600">{blogData.content}</p>
              <div className="mt-4 space-x-4">
                <button
                  onClick={() => {
                    setEditedBlog({ id: doc.id, ...blogData });
                    setIsEditModalOpen(true);
                  }}
                  className="px-3 py-1 text-sm font-semibold tracking-wide text-white transition duration-200 transform rounded-full bg-gradient-to-r from-red-500 to-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBlog(doc.id)}
                  className="px-3 py-1 text-sm font-semibold tracking-wide text-white transition duration-200 transform rounded-full bg-gradient-to-r from-red-500 to-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {/* Edit Blog Modal */}
      <Modal
        title="Edit Blog"
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        onSubmit={handleEditBlog}
      >
        {/* Edit form fields for the blog */}
        {editedBlog && (
          <>
            <label
              htmlFor="edit-title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="edit-title"
              value={editedBlog.title}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, title: e.target.value })
              }
              className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            <label
              htmlFor="edit-content"
              className="block text-sm font-medium text-gray-700"
            >
              Content:
            </label>
            <textarea
              id="edit-content"
              value={editedBlog.content}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, content: e.target.value })
              }
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default Blogs;
