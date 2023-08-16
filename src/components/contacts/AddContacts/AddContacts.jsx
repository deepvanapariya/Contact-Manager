import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../srevices/ContactService";

const AddContacts = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errrorMassage: "",
  });

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  useEffect(() => {
    try {
      let response = async () => {
        let r = await ContactService.getGroups();
        console.log(r.data);
        setState({
          ...state,
          loading: false,
          groups: r.data,
        });
      };
      setState({
        ...state,
        loading: true,
      });
      response();
    } catch (error) {}
  }, []);

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.creatContact(state.contact);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({
        ...state,
        errrorMassage: error.message,
      });
      navigate("/contacts/add", { replace: false });
    }
  };
  let { contact, groups, errrorMassage } = state;

  return (
    <React.Fragment>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold"> Create Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                autem odio sit, odit pariatur qui voluptate quae tempora dolor
                explicabo, fugit soluta delectus similique expedita fugiat
                veniam doloribus! Saepe, officia.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    type="text"
                    name="name"
                    required={true}
                    value={contact.name}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    required={true}
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Photo Url"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="number"
                    required={true}
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="email"
                    required={true}
                    name="email"
                    value={contact.email}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    required={true}
                    name="company"
                    value={contact.company}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Company Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    required={true}
                    name="title"
                    value={contact.title}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <select
                    className="form-control"
                    required={true}
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInput}
                  >
                    <option value="">Select a Group</option>
                    {groups.length > 0 &&
                      groups.map((group) => {
                        return (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="mb-2 ">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Create"
                  />
                  <Link to={"/contacts/list"} className="btn btn-dark  ms-2">
                    Cancle
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AddContacts;
