import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ITask } from "./List";

interface Props {
  children: string;
  onDelete: () => void;
  onEdit: (editedTask: string) => void;
  isChecked: boolean;
  onChangeCheckedStat: () => void;
  task: ITask;
}

const Item = ({
  children,
  onDelete,
  onEdit,
  isChecked,
  onChangeCheckedStat,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(children);

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("2" + isChecked);
    setEditedTask(event.target.value);
  };

  const handleEditSave = () => {
    setIsEditing(false);
    onEdit(editedTask);
  };

  useEffect(() => {
    console.log({ isChecked });
  }, [isChecked]);

  return (
    <div className="checkbox-container">
      <label>
        {!isEditing ? (
          <input
            id="checkkk"
            type="checkbox"
            defaultChecked={isChecked}
            onClick={onChangeCheckedStat}
          />
        ) : (
          <span></span>
        )}
        {isEditing ? (
          <input
            id="textt"
            type="text"
            value={editedTask}
            onChange={(event) => {
              event.preventDefault();
              handleEditChange(event);
            }}
          />
        ) : (
          <span>{children.toString()}</span>
        )}
        {isEditing ? (
          <FontAwesomeIcon
            className="save-icon"
            icon={faSave}
            onClick={(event) => {
              event.preventDefault();
              handleEditSave();
            }}
          />
        ) : (
          <FontAwesomeIcon
            className="edit-icon"
            icon={faPencil}
            onClick={(event) => {
              event.preventDefault();
              setIsEditing(true);
            }}
          />
        )}

        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={onDelete}
        />
      </label>
    </div>
  );
};

export default Item;
