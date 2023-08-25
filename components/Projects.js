import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { addData, updateData, deleteData } from "../lib/firebase";
import { collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const Projects = ({ userId }) => {
  const projectsRef = collection(db, `users/${userId}/projects`);
  const [projects] = useCollection(projectsRef, { idField: "id" });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", description: "" });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProject, setEditedProject] = useState(null);

  useEffect(() => {
    if (editedProject && !editedProject.id) {
      console.error("Error: editedProject.id is undefined");
    }
  }, [editedProject]);

  const handleAddProject = async () => {
    await addData(userId, "projects", newProject);
    setNewProject({ title: "", description: "" });
    setIsAddModalOpen(false);
  };

  const handleEditProject = async () => {
    if (!editedProject.id) {
      console.error("Error: editedProject.id is undefined");
      return;
    }
    await updateData(userId, "projects", editedProject.id, editedProject);
    setIsEditModalOpen(false);
  };

  const handleDeleteProject = async (projectId) => {
    await deleteData(userId, "projects", projectId);
  };

  const transformProjectsData = (projectsData) => {
    return projectsData.docs.map((doc) => {
      const { id, ...rest } = doc.data();
      return { id: doc.id, ...rest };
    });
  };

  const transformedProjects = projects && transformProjectsData(projects);

  return (
    <>
      <button onClick={() => setIsAddModalOpen(true)}>Add Project</button>
      <Modal
        title="Add Project"
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        onSubmit={handleAddProject}
      >
        {/* Add form fields for the project */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
        />
      </Modal>

      {/* Render projects */}
      {transformedProjects &&
        transformedProjects.map((project) => (
<<<<<<< Updated upstream
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
=======
          <div
            key={project.id}
            className="p-4 mb-4 transition duration-200 transform bg-white rounded-lg shadow-md hover:scale-105"
          >
            <h3 className="mb-2 text-lg font-semibold text-gray-700">{project.title}</h3>
            <p className="mb-4 text-gray-700">{project.description}</p>
>>>>>>> Stashed changes
            <button
              onClick={() => {
                setIsEditModalOpen(true);
                setEditedProject({ ...project });
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
          </div>
        ))}

      {/* Edit project modal */}
      {editedProject && (
        <Modal
          title="Edit Project"
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          onSubmit={handleEditProject}
        >
          {/* Add form fields for the project */}
          <label htmlFor="editTitle">Title:</label>
          <input
            type="text"
            id="editTitle"
            value={editedProject.title}
            onChange={(e) =>
              setEditedProject({ ...editedProject, title: e.target.value })
            }
          />
          <label htmlFor="editDescription">Description:</label>
          <textarea
            id="editDescription"
            value={editedProject.description}
            onChange={(e) =>
              setEditedProject({ ...editedProject, description: e.target.value })
            }
          />
        </Modal>
      )}
    </>
  );
};

export default Projects;

