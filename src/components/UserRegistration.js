import React, { useState, useEffect, useCallback } from "react";

const UserRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Name is required";

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      newErrors.email = "Invalid email";

    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 chars";

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!form.gender) newErrors.gender = "Select gender";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  },[form]);

  useEffect(() => {
    validate();
  }, [form,validate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem("user", JSON.stringify(form));
      setSuccess(true);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="p-4 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">User Registration</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => {
          if (key === "terms") return null;
          if (key === "gender") {
            return (
              <div key={key}>
                <label>Gender:</label>
                <select name="gender" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <p className="text-red-500">{errors.gender}</p>
              </div>
            );
          }
          return (
            <div key={key}>
              <input
                type={
                  key === "password" || key === "confirmPassword"
                    ? "password"
                    : "text"
                }
                name={key}
                placeholder={key}
                value={form[key]}
                onChange={handleChange}
                className="border p-1 w-full my-1"
              />
              <p className="text-red-500">{errors[key]}</p>
            </div>
          );
        })}

        <div>
          <input type="checkbox" name="terms" onChange={handleChange} /> Accept
          Terms
          <p className="text-red-600">{errors.terms}</p>
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="bg-blue-500 text-white px-3 py-1 mt-2"
        >
          Submit
        </button>
        {success && <p className="text-green-600">Registered Successfully!</p>}
      </form>
    </div>
  );
};

export default UserRegistration;
