"use client";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import {
  AiFillDelete,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineGlobal,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { mockData } from "@/components/mockData"; /* Mock JSON Data */
import styles from "./CardInfo.module.css";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";

const CardInfo = () => {
  const [data, setData] = useState(mockData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // This function is used to handle toggling the like status of a person
  const handleLike = (id) => {
    setData((prevData) => {
      return prevData.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      );
    });
  };

  // This function is used to handle initiating the editing of a person
  const handleEdit = (person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  // This function is used to handle saving changes in the modal
  const handleModalSave = (editedData) => {
    const newData = data.map((item) =>
      item.id === editedData.id ? { ...item, ...editedData } : item
    );
    setData(newData);
    handleModalClose();
  };

  // This function is used to handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPerson(null);
  };

  // This function is used to handle the deletion of a person
  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <div key={item.id} className={styles.img_conatiner}>
          <div className={styles.img}>
            <Image src={item.image} alt={item.name} height={200} width={200} />
          </div>
          <div className={styles.name_section}>
            <div style={{ padding: "24px" }}>
              <h3 className={styles.name}>{item.name}</h3>
              <div className={styles.nameContainer}>
                <span>
                  <AiOutlineMail className={styles.icons} />
                </span>
                <span className={styles.text_styles}>{item.email}</span>
              </div>
              <div className={styles.nameContainer}>
                <span>
                  <AiOutlinePhone className={styles.icons} />
                </span>
                <span className={styles.text_styles}>{item.phone}</span>
              </div>
              <div className={styles.nameContainer}>
                <span>
                  <AiOutlineGlobal className={styles.icons} />
                </span>
                <span className={styles.text_styles}>{item.website}</span>
              </div>
            </div>
          </div>
          <div className={styles.iconsContainer}>
            <FaHeart
              className={`like-icon ${item.liked ? "liked" : ""} ${
                styles.icons
              }`}
              onClick={() => handleLike(item.id)}
              size={24}
              color={item.liked ? "red" : "gray"}
            />
            <CiEdit className={styles.icons} onClick={() => handleEdit(item)} />
            <AiFillDelete
              className={styles.icons}
              onClick={() => handleDelete(item.id)}
            />
          </div>
        </div>
      ))}
      {isModalOpen && selectedPerson && (
        <Modal
          person={selectedPerson}
          onSave={handleModalSave}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default CardInfo;
