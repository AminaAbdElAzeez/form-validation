import { useState } from "react";
import FormInput from "../FormInput/FormInput";
import "./Form.css";

function Form() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [showToast, setShowToast] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValues({ ...values, image: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      values.username &&
      values.email &&
      values.password &&
      values.confirmPassword &&
      values.password === values.confirmPassword &&
      values.image
    ) {
      setFormValid(true);
      setShowToast(true);

      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("image", values.image);

      fetch("/your-api-endpoint", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setTimeout(() => {
        setShowToast(false);
      }, 3500);
    } else {
      setFormValid(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Register</h1>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
        />
      ))}

      <div className="form-item">
        <label htmlFor="image" className="form-label">
          Upload Image:
        </label>
        <input
          className="form-image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {imagePreview && (
        <div className="image-preview">
          <img
            src={imagePreview}
            alt="Image Preview"
            width="100"
            className="uploaded-image"
          />
        </div>
      )}

      {!formValid && (
        <p className="error-message">Please fill all fields correctly!</p>
      )}

      <button className="form-link" type="submit">
        Submit
      </button>

      {showToast && (
        <div className="toast">
          <p style={{ marginBottom: "10px" }}>
            Welcome <strong>{values.username}</strong>!
          </p>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Uploaded Image"
              width="50"
              height="50"
              className="uploaded-image"
            />
          )}
        </div>
      )}
    </form>
  );
}

export default Form;
