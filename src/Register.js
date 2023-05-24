// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [data, setData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//   });
//   const changeHandler = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };
//   const submitHandler = (e) => {
//     e.preventDefault();
//     axios.post("http://localhost:5000/register", data).then((res) => {
//       alert(res.data);
//       setData({
//         username: "",
//         email: "",
//         password: "",
//         confirmpassword: "",
//       });
//     });
//   };
//   return (
//     <div>
//       <center>
//         <form onSubmit={submitHandler} autocomplete="off">
//           <h3>Register</h3>

//           <input
//             type="text"
//             onChange={changeHandler}
//             name="username"
//             placeholder="User Name"
//           />
//           <br />
//           <input
//             type="email"
//             onChange={changeHandler}
//             name="email"
//             placeholder="Email"
//           />
//           <br />
//           <input
//             type="password"
//             onChange={changeHandler}
//             name="password"
//             placeholder="Password"
//           />
//           <br />
//           <input
//             type="password"
//             onChange={changeHandler}
//             name="confirmpassword"
//             placeholder="Confirm Password"
//           />
//           <br />
//           <input type="submit" value="Register" />
//           <br />
//         </form>
//       </center>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};

    if (firstName.length < 5) {
      validationErrors.firstName =
        "First name must have at least 5 characters.";
    }

    if (mobileNumber.length !== 10) {
      validationErrors.mobileNumber = "Mobile number must be 10 digits.";
    }

    if (!email) {
      validationErrors.email = "Email address is required.";
    }

    if (
      password.length < 5 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      validationErrors.password =
        "Password must have at least 5 characters and contain at least one uppercase letter, one digit, and one special character (!@#$%^&*).";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit the form if there are no validation errors
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",

        {
          firstName,
          lastName,
          mobileNumber,
          email,
          password,
        }
      );
      alert(response.data);

      // Handle successful signup
      console.log(response.data);
    } catch (error) {
      // Handle signup error
      console.error(error);
    }
  };

  return (
    <center>
      <form onSubmit={handleSubmit}>
        <h3>Register</h3>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          {errors.mobileNumber && (
            <span className="error">{errors.mobileNumber}</span>
          )}
        </div>

        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </center>
  );
};

export default Register;
