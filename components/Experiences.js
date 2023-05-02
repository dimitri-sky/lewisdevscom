import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { addData, updateData, deleteData } from "../lib/firebase";
import { collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const Experiences = ({ userId }) => {
  const experiencesRef = collection(db, `users/${userId}/experiences`);
  const [experiences] = useCollection(experiencesRef, { idField: "id" });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newExperience, setNewExperience] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedExperience, setEditedExperience] = useState(null);

  useEffect(() => {
    if (editedExperience && !editedExperience.id) {
      console.error("Error: editedExperience.id is undefined");
    }
  }, [editedExperience]);

  const handleAddExperience = async () => {
    await addData(userId, "experiences", newExperience);
    setNewExperience({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    setIsAddModalOpen(false);
  };

  const handleEditExperience = async () => {
    if (!editedExperience.id) {
      console.error("Error: editedExperience.id is undefined");
      return;
    }
    await updateData(
      userId,
      "experiences",
      editedExperience.id,
      editedExperience
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteExperience = async (experienceId) => {
    await deleteData(userId, "experiences", experienceId);
  };

  const transformExperiencesData = (experiencesData) => {
    return experiencesData.docs.map((doc) => {
      const { id, ...rest } = doc.data();
      return { id: doc.id, ...rest };
    });
  };

  const transformedExperiences =
    experiences && transformExperiencesData(experiences);

  return (
    <>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="px-3 py-1 mb-4 text-sm font-semibold tracking-wide text-white transition duration-200 transform rounded-full bg-gradient-to-r from-red-500 to-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Add Experience
      </button>
      <Modal
        title="Add Experience"
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        onSubmit={handleAddExperience}
      >
        {/* Add form fields for the experience */}
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={newExperience.title}
          onChange={(e) =>
            setNewExperience({ ...newExperience, title: e.target.value })
          }
          className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
        />
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description:
        </label>
        <textarea
          id="description"
          value={newExperience.description}
          onChange={(e) =>
            setNewExperience({ ...newExperience, description: e.target.value })
          }
          className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
        />
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={newExperience.startDate}
          onChange={(e) =>
            setNewExperience({ ...newExperience, startDate: e.target.value })
          }
          className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
        />
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          value={newExperience.endDate}
          onChange={(e) =>
            setNewExperience({ ...newExperience, endDate: e.target.value })
          }
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
        />
      </Modal>

      {/* Render experiences */}
      {transformedExperiences &&
        transformedExperiences.map((experience) => (
          <div
            key={experience.id}
            className="p-4 mb-4 transition duration-200 transform bg-white rounded-lg shadow-md hover:scale-105"
          >
            <h3 className="mb-2 text-xl font-bold">{experience.title}</h3>
            <p className="mb-2 text-gray-700">{experience.description}</p>
            <p className="mb-4 text-gray-700">
              {experience.startDate} - {experience.endDate}
            </p>
            <button
              onClick={() => {
                setIsEditModalOpen(true);
                setEditedExperience({ ...experience });
              }}
              className="px-3 py-1 mr-2 text-sm font-semibold tracking-wide text-white transition duration-200 transform rounded-full bg-gradient-to-r from-red-500 to-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteExperience(experience.id)}
              className="px-3 py-1 text-sm font-semibold tracking-wide text-white transition duration-200 transform bg-red-500 rounded-full hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        ))}

      {/* Edit experience modal */}
      {editedExperience && (
        <Modal
          title="Edit Experience"
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          onSubmit={handleEditExperience}
        >
          {/* Add form fields for the experience */}
          <label
            htmlFor="editTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="editTitle"
            value={editedExperience.title}
            onChange={(e) =>
              setEditedExperience({
                ...editedExperience,
                title: e.target.value,
              })
            }
            className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
          <label
            htmlFor="editDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="editDescription"
            value={editedExperience.description}
            onChange={(e) =>
              setEditedExperience({
                ...editedExperience,
                description: e.target.value,
              })
            }
            className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
          <label
            htmlFor="editStartDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="editStartDate"
            value={editedExperience.startDate}
            onChange={(e) =>
              setEditedExperience({
                ...editedExperience,
                startDate: e.target.value,
              })
            }
            className="block w-full mt-1 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
          <label
            htmlFor="editEndDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date:
          </label>
          <input
            type="date"
            id="editEndDate"
            value={editedExperience.endDate}
            onChange={(e) =>
              setEditedExperience({
                ...editedExperience,
                endDate: e.target.value,
              })
            }
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </Modal>
      )}
    </>
  );
};

export default Experiences;
