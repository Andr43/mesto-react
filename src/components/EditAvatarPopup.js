import PopupWithForm from "./PopupWithForm";
import { useRef, useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarProfile(props) {
  const imageRef = useRef();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleFormSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      name,
      about: description,
      avatar: imageRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onMouseDown={props.onClose}
      onSubmit={handleFormSubmit}
      name="edit-avatar"
      title="Обновить аватар"
    >
      {" "}
      <input
        placeholder="Ссылка на картинку"
        id="avatar"
        className="popup__field popup__field_source"
        type="url"
        ref={imageRef}
        required
      />
      <span className="popup__error avatar-error"></span>{" "}
    </PopupWithForm>
  );
}

export default EditAvatarProfile;
