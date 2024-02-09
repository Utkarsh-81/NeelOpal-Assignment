import { useState } from "react";
import styles from "./Modal.module.css";

const Modal = ({ person, onSave, onClose }) => {
  const [editedData, setEditedData] = useState({ ...person });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h2>Edit Person</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={editedData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={editedData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={editedData.website}
            onChange={handleChange}
          />
        </label>
        <div className={styles.modal_buttons}>
          <button className={styles.modal_button} onClick={handleSave}>
            Ok
          </button>
          <button className={styles.modal_button} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
