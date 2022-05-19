import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Add() {
    const localtion = useLocation()
  const [allData, setAllData] = useState([]);
  const [obj, setObj] = useState({
    skills: [],
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    state: "",
    country: "",
    experience: [{}, {}],
  });
    
    

  const genderFunction = (value) => {
    setObj({ ...obj, gender: value });
  };

  const handleSkills = (data) => {
    setObj({
      ...obj,
      skills: Array.isArray(obj.skills)
        ? obj?.skills?.includes(data)
          ? obj.skills.filter((item, i) => item != data)
          : [...obj.skills, data]
        : [data],
    });
  };

  const handleFunction = (e, i) => {
    const data = obj.experience.map((items, index) =>
      i == index ? { ...items, company: e.target.value } : items
    );
  };

  const submitFunction = () => {
    const localData = JSON.parse(localStorage.getItem("allData"))
      ? JSON.parse(localStorage.getItem("allData"))
      : [];

    const newData = [...localData , obj];
    console.log(newData);

    localStorage.setItem("allData", JSON.stringify(newData));
  };

  const [formErrors, setformErrors] = useState({});
  let isSubmit = false;

  function AddData(e, data) {
    e.preventDefault();
    isSubmit = true;

    const errors = validate(data);
    setformErrors(validate(data));

    if (Object.keys(errors).length == 0 && isSubmit) {
      submitFunction();
      setObj({
        skills: [],
        experience: [{}, {}],
        firstname: "",
        lastname: "",
        gender: "",
        email: "",
        address: "",
        state: "",
        country: "",
        address: "",
      });
      isSubmit = false;
    }
  }

  const validate = (values) => {
    const errors = {};
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      
    if (!values.firstname) {
      errors.firstname = " required";
    }
    if (!values.lastname) {
      errors.lastname = "  require ";
    }
    if (!values.gender) {
      errors.gender = "  require ";
    }
    if (!values.email) {
      errors.email = "  require ";
    }
    if (!values.address) {
      errors.address = "  require ";
    }
    if (!values.country) {
      errors.country = "  require ";
    }
    if (!values.state) {
      errors.state = "  require ";
    }
    if (values.skills.length < 3) {
      errors.skills = "  require ";
    }
      if (emailRegex.test(values.email)===false) {
        errors.email = "  require ";
      }
      if (values.experience.length < 1) {
        errors.skills = "require ";
      }
      console.log(values)
      if (values.experience.length > 5) {
        errors.experience = "require ";
      }


    return errors;
  };

  return (
    <div class="container my-4">
      <main>
        <div class="py-5 text-center">
          <h2>Add Candidate</h2>
        </div>

        <div class="row g-5">
          <div class="col-md-7 col-lg-8 ms-auto me-auto">
            <h4 class="mb-3">Basic Info</h4>
            <div class="row g-3">
              <div class="col-sm-6">
                <label class="form-label">First name</label>
                <input
                  type="text"
                  value={obj.firstname}
                  class="form-control"
                  onChange={(e) =>
                    setObj({ ...obj, firstname: e.target.value })
                  }
                />
                <span style={{ color: "red" }}>{formErrors.firstname}</span>
              </div>

              <div class="col-sm-6">
                <label class="form-label">Last name</label>
                <input
                  type="text"
                  value={obj.lastname}
                  class="form-control"
                  onChange={(e) => setObj({ ...obj, lastname: e.target.value })}
                />
                <span style={{ color: "red" }}>{formErrors.lastname}</span>
              </div>

              <div class="col-12">
                <label class="form-label">Gender</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={() => genderFunction("Male")}
                      class="form-check-input"
                      type="radio"
                      name="gender"
                    />
                    <label class="form-check-label">Male</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={() => genderFunction("female")}
                      class="form-check-input"
                      type="radio"
                      name="gender"
                    />
                    <label class="form-check-label">Female</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={() => genderFunction("other")}
                      class="form-check-input"
                      type="radio"
                      name="gender"
                    />
                    <label class="form-check-label">Other</label>
                  </div>
                </div>
                <span style={{ color: "red" }}>{formErrors.gender}</span>
              </div>

              <div class="col-12">
                <label class="form-label">Email</label>
                <input
                  value={obj.email}
                  type="email"
                  class="form-control"
                  placeholder="you@example.com"
                  onChange={(e) => setObj({ ...obj, email: e.target.value })}
                />
                <span style={{ color: "red" }}>{formErrors.email}</span>
              </div>

              <div class="col-12">
                <label class="form-label">Address</label>
                <textarea
                  value={obj.address}
                  class="form-control"
                  placeholder="1234 Main St "
                  onChange={(e) => setObj({ ...obj, address: e.target.value })}
                ></textarea>
                <span style={{ color: "red" }}>{formErrors.address}</span>
              </div>

              <div class="col-md-5">
                <label class="form-label">Country</label>
                <select
                  class="form-select"
                  onChange={(e) => setObj({ ...obj, country: e.target.value })}
                >
                  <option value="">Choose...</option>
                  <option>India</option>
                  <option>United States</option>
                </select>
                <span style={{ color: "red" }}>{formErrors.country}</span>
              </div>

              <div class="col-md-4">
                <label class="form-label">State</label>
                <select
                  class="form-select"
                  onChange={(e) => setObj({ ...obj, state: e.target.value })}
                >
                  <option value="">Choose...</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                </select>
                <span style={{ color: "red" }}>{formErrors.state}</span>
              </div>

              <div class="col-md-3">
                <label class="form-label">Pin / Zip</label>
                <input
                  type="text"
                  class="form-control"
                  onClick={(e) => setObj({ ...obj, pincode: e.target.value })}
                />
                <span style={{ color: "red" }}>{formErrors.pincode}</span>
              </div>
            </div>

            <hr class="my-4" />

            <h4 class="mb-3">Professional Info</h4>

            <div class="row g-3">
              <div class="col-12">
                <label class="form-label">
                  Choose your skills
                  <span class="small text-muted">(min 3 skills)</span>
                </label>
                <div class="mb-3">
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) => handleSkills(e.target.value)}
                      class="form-check-input"
                      type="checkbox"
                      name="skill"
                      value="Angular"
                    />
                    <label class="form-check-label">Angular</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) => handleSkills(e.target.value)}
                      class="form-check-input"
                      type="checkbox"
                      name="skill"
                      value="React"
                    />
                    <label class="form-check-label">React</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) => handleSkills(e.target.value)}
                      class="form-check-input"
                      type="checkbox"
                      name="skill"
                      value="Node.js"
                    />
                    <label class="form-check-label">Node.JS</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) => handleSkills(e.target.value)}
                      class="form-check-input"
                      type="checkbox"
                      name="skill"
                      value="Javascript"
                    />
                    <label class="form-check-label">JavaScript</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) => handleSkills(e.target.value)}
                      class="form-check-input"
                      type="checkbox"
                      name="skill"
                      value="fulter"
                    />
                    <label class="form-check-label">Flutter</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) => handleSkills(e.target.value)}
                      class="form-check-input"
                      type="checkbox"
                      name="skill"
                      value="java"
                    />
                    <label class="form-check-label">Java</label>
                  </div>
                </div>
              </div>
              <span style={{ color: "red" }}>{formErrors.skills}</span>
            </div>

            <div class="row gy-3">
              <div class="col-12">
                <label class="form-label">
                  <strong>
                    Experience
                    <span class="small text-muted">(min 2, max 5 items)</span>
                  </strong>
                </label>

                {obj.experience.map((items, i) => (
                  <div class="card mx-3 mt-3">
                    <div class="card-body">
                      <h6 class="card-title text-muted mb-3">
                        Experience #{i + 1}
                        <a
                          onClick={() =>
                            setObj({
                              ...obj,
                              experience: obj.experience.filter(
                                (item, ind) => i !== ind
                              ),
                            })
                          }
                          class="float-end text-danger fw-normal"
                        >
                          Remove
                        </a>
                      </h6>
                      <div class="row g-3">
                        <div class="col-6">
                          <label class="form-label">Company Name</label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={(e) =>
                              setObj({
                                ...obj,
                                experience: obj.experience.map((items, index) =>
                                  i == index
                                    ? { ...items, company: e.target.value }
                                    : items
                                ),
                              })
                            }
                          />
                        </div>
                        <div class="col-6">
                          <label class="form-label">
                            Duration <span class="text-muted">(in months)</span>
                          </label>
                          <input
                            type="number"
                            class="form-control"
                            onChange={(e) =>
                              setObj({
                                ...obj,
                                experience: obj.experience.map((items, index) =>
                                  i == index
                                    ? { ...items, duration: e.target.value }
                                    : items
                                ),
                              })
                            }
                          />
                        </div>
                        <div class="col-12">
                          <label class="form-label">
                            Describe your responsibilities
                          </label>
                          <textarea
                            onChange={(e) =>
                              setObj({
                                ...obj,
                                experience: obj.experience.map((items, index) =>
                                  i == index
                                    ? {
                                        ...items,
                                        responsibility: e.target.value,
                                      }
                                    : items
                                ),
                              })
                            }
                            class="form-control"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <a
                  class="d-block mt-3"
                  onClick={() =>
                    setObj({ ...obj, experience: [...obj.experience, {}] })
                  }
                >
                  Add more experience
                </a>
              </div>
              <span style={{ color: "red" }}>{formErrors.experience}</span>
            </div>

            <hr class="my-4" />

            <button
              onClick={(e) => AddData(e, obj)}
              class="btn btn-primary"
              type="submit"
            >
              Save Candidate
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Add;
