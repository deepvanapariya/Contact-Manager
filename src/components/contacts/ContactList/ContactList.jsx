import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../srevices/ContactService";
import Spinner from "../../Spinner/Spinner";

const ContactList = () => {
  let [query, setQuery] = useState({
    text: "",
  });

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filterdContacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    try {
      let response = async () => {
        const r = await ContactService.getAllContacts();

        setState({
          ...state,
          loading: false,
          contacts: r.data,
          filterdContacts: r.data,
        });
      };
      setState({ ...state, loading: true });
      response();
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
      console.log(error);
    }
  }, []);

  ///delete

  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        let response = async () => {
          const r = await ContactService.getAllContacts();

          setState({
            ...state,
            loading: false,
            contacts: r.data,
            filterdContacts: r.data,
          });
        };
        setState({ ...state, loading: true });
        response();
      }
    } catch (error) {}
  };

  //search
  let searchContacts = (event) => {
    setQuery({
      ...query,
      text: event.target.value,
    });
    let theContacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filterdContacts: theContacts,
    });
  };
  let { loading, errorMessage, filterdContacts } = state;

  return (
    <React.Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bolder">
                  Contact Manager
                  <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" /> New
                  </Link>
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                  ullam illo et praesentium, veritatis odit totam doloremque
                  nihil hic natus, veniam labore, rem iure obcaecati eum? At rem
                  incidunt libero expedita illum, numquam labore distinctio
                  odio. Repudiandae, vel ipsam! Ea.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="text"
                        name="text"
                        value={query.text}
                        onChange={searchContacts}
                        className="form-control"
                        placeholder="Search Names"
                      />
                    </div>
                  </div>
                  <div className="col">
                    {" "}
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filterdContacts.length > 0 &&
                  filterdContacts.map((contacts) => {
                    return (
                      <div className="col-md-6" key={contacts.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-4">
                                <img
                                  src={contacts.photo}
                                  alt="img"
                                  className="contact-img"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name:
                                    <span className="fw-bold">
                                      {contacts.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Mobile:
                                    <span className="fw-bold">
                                      {contacts.mobile}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email:
                                    <span className="fw-bold">
                                      {contacts.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link
                                  to={`/contacts/view/${contacts.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contacts.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen" />
                                </Link>
                                <button
                                  className="btn btn-danger my-1"
                                  onClick={() => {
                                    clickDelete(contacts.id);
                                  }}
                                >
                                  <i className="fa fa-trash " />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ContactList;
