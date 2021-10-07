// ---------------- LOGIN FORM ----------------- //

import React, { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import noteService from './services/notes';
import Notification from './components/Notification';
import loginService from './services/login';
import NoteForm from './components/NoteForm';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    // // Inline style rule: set display property to none if don't want to display it
    // const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    // const showWhenVisible = { display: loginVisible ? '' : 'none' };

    // return (
    // <div>
    //   <div style={hideWhenVisible}>
    //     <button onClick={() => setLoginVisible(true)}>log in</button>
    //   </div>
    //   <div style={showWhenVisible}>
    //     <LoginForm
    //       username={username}
    //       password={password}
    //       handleUsernameChange={({ target }) => setUsername(target.value)}
    //       handlePasswordChange={({ target }) => setPassword(target.value)}
    //       handleSubmit={handleLogin}
    //     />
    //   </div>
    //   {/* Event handlers defined directly in component */}
    //   <button onClick={() => setLoginVisible(false)}>cancel</button>
    // </div>
    // THE COMPONENTS CHILDREN, AKA PROPS.CHILDREN
    //  LoginForm is a child component of Togglable
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };


  // Effect hook: Check for user details on local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);

  const addNote = (noteObject) => {
    // Hide form by calling method after a new note is created.
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
      });
  };

  // References to components with ref (offers a reference to component)
  //  Accessing variable of component from outside
  const noteFormRef = useRef();

  const noteForm = () => (
    // This hook ensures the same reference is kept throughout re-renders
    //  of the component
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null
        ? loginForm()
        :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>}

      <h2>Notes</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  );
};

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
    </div>
  );
};

export default App;