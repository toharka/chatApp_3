import React, { useState } from 'react';

function ChatUpperBar({ onContactAdded, setSearchTerm, messenger }) {

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [contactData, setContactData] = useState({
    name: '',
    description: '',
    photo: null
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContactData((prevState) => ({
        ...prevState,
        photo: file
      }));
    } else {
      setContactData((prevState) => ({
        ...prevState,
        photo: null
      }));
    }
  };

  const addContact = () => {
    if (!contactData.name.trim()) {
      setError("Name is required");
      return;
    }

    // check if the name already exists
    const doesNameExist = messenger.some(contact => contact.messengerName.toLowerCase() === contactData.name.toLowerCase());
    if (doesNameExist) {
      setError("Name already exists");
      return;
    }



    onContactAdded(contactData);
    setContactData({
      name: '',
      description: '',
      photo: null
    });
    setError(''); // Clear the error
    closeModal();
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault(); // This prevents the page refresh
  };
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <form className="d-flex" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
          </form>
          <button className="btn" onClick={openModal}>
            <i className="bi bi-person-plus"></i>
          </button>
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Contact</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Add contact form */}
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={contactData.name}
                      onChange={handleInputChange}
                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={contactData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="photo">Upload Photo:</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="photo"
                      name="photo"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                  onClick={closeModal}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={addContact}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatUpperBar;
