import React, { useState } from "react";
import Modal from "./Modal";
import { addData } from "../lib/firebase";
import { collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Experiences = ({ userId }) => {
  const experiencesRef = collection(db, `users/${userId}/experiences`);
  const [experiences] = useCollectionData(experiencesRef, { idField: "id" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExperience, setNewExperience] = useState({ title: "", description: "", startDate: "", endDate: "" });

  const handleAddExperience = async () => {
    await addData(userId, "experiences", newExperience);
    setNewExperience({ title: "", description: "", startDate: "", endDate: "" });
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Add Experience</button>
      <Modal
        title="Add Experience"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
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
      {experiences &&
        experiences.map((experience) => (
          <div key={experience.id}>
            <h3>{experience.title}</h3>
            <p>{experience.description}</p>
            <p>{experience.startDate} - {experience.endDate}</p>
          </div>
        ))}
    </>
  );
};

export default Experiences;
