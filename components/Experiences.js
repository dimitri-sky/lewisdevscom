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
  const [newExperience, setNewExperience] = useState({ title: "", description: "", startDate: "", endDate: "" });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedExperience, setEditedExperience] = useState(null);

  useEffect(() => {
    if (editedExperience && !editedExperience.id) {
      console.error("Error: editedExperience.id is undefined");
    }
  }, [editedExperience]);

  const handleAddExperience = async () => {
    await addData(userId, "experiences", newExperience);
    setNewExperience({ title: "", description: "", startDate: "", endDate: "" });
    setIsAddModalOpen(false);
  };

  const handleEditExperience = async () => {
    if (!editedExperience.id) {
      console.error("Error: editedExperience.id is undefined");
      return;
    }
    await updateData(userId, "experiences", editedExperience.id, editedExperience);
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

  const transformedExperiences = experiences && transformExperiencesData(experiences);

  return (
    <>
      <button onClick={() => setIsAddModalOpen(true)}>Add Experience</button>
      <Modal
        title="Add Experience"
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        onSubmit={handleAddExperience}
      >
        {/* Add form fields for the experience */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={newExperience.title}
          onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={newExperience.description}
          onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
        />
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={newExperience.startDate}
          onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={newExperience.endDate}
          onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
        />
      </Modal>

      {/* Render experiences */}
      {transformedExperiences &&
        transformedExperiences.map((experience) => (
          <div key={experience.id}>
                        <h3>{experience.title}</h3>
            <p>{experience.description}</p>
            <p>{experience.startDate} - {experience.endDate}</p>
            <button
              onClick={() => {
                setIsEditModalOpen(true);
                setEditedExperience({ ...experience });
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteExperience(experience.id)}>Delete</button>
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
          <label htmlFor="editTitle">Title:</label>
          <input
            type="text"
            id="editTitle"
            value={editedExperience.title}
            onChange={(e) =>
              setEditedExperience({ ...editedExperience, title: e.target.value })
            }
          />
          <label htmlFor="editDescription">Description:</label>
          <textarea
            id="editDescription"
            value={editedExperience.description}
            onChange={(e) =>
              setEditedExperience({ ...editedExperience, description: e.target.value })
            }
          />
          <label htmlFor="editStartDate">Start Date:</label>
          <input
            type="date"
            id="editStartDate"
            value={editedExperience.startDate}
            onChange={(e) =>
              setEditedExperience({ ...editedExperience, startDate: e.target.value })
            }
          />
          <label htmlFor="editEndDate">End Date:</label>
          <input
            type="date"
            id="editEndDate"
            value={editedExperience.endDate}
            onChange={(e) =>
              setEditedExperience({ ...editedExperience, endDate: e.target.value })
            }
          />
        </Modal>
      )}
    </>
  );
};

export default Experiences;

