import { useState } from "react";
import "./FormInput.css";

function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { label, errorMessage, onChange, id, type, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <label className="form-label">{label} :</label>
      <div className="input-container">
        <input
          className="form-input"
          {...inputProps}
          type={showPassword && type === "password" ? "text" : type}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
          }
          focused={focused.toString()}
        />
        {type === "password" && (
          <i
            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
            onClick={toggleShowPassword}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          ></i>
        )}
        <span>{errorMessage}</span>
      </div>
    </>
  );
}

export default FormInput;
