import React from "react";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  let selectedUser = "";
  const [edit, setEdit] = useState(false);
  const [type, setType] = useState("none");
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/exercises/");
      setData(res.data);
    } catch (err) {
      console.log("Something went wrong while fetching the exercies data ");
    }
  };
  const fetchUsers = async () => {
    try {
      const data = await axios.get("http://localhost:5000/users/");
      setUsers((pre) => data.data);
      console.log(data.data);
    } catch (error) {
      console.log("error in fetching users data... ");
    }
  };
  useEffect(() => {
    fetchData();
    fetchUsers();
  }, []);

  const handleClick = (e, type) => {
    
    e.preventDefault();
    if (type === "addUserForm") {
      let a = e.target[0].value;
      if (a === "") {
        reset();
        return;
      }
      console.log(a);
      axios
        .post("http://localhost:5000/users/add", { username: a })
        .then(() => {
          fetchUsers();
          console.log("user is added sussfully ");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "addExerciseForm") {
      let a = selectedUser == "" ? users[0].username : selectedUser;
      let des = e.target[1].value;
      let dur = e.target[2].value;
      if (a === "" || des === "" || dur === "") {
        reset();
        return;
      }
      if (edit !== true) {
        axios
          .post("http://localhost:5000/exercises/add", {
            username: a,
            description: des,
            duration: dur,
          })
          .then(() => {
            console.log("adding is success");
            fetchData();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post(`http://localhost:5000/exercises/update/${users[0]._id}`, {
            username: a,
            description: des,
            duration: dur,
          })
          .then(() => {
            console.log("adding is success");
            // selectedRow=[];
            fetchData();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    reset();
  };

  const createUser = () => {
    setClick(true);
    setType("addUser");
  };

  const createLogger = () => {
    setClick(true);
    fetchUsers();
    setType("addExercise");
  };

  const reset = () => {
    setClick(false);
    setType("none");
  };

  const dropdown = (e) => {
    selectedUser = e.target.value;
  };

  const deleteRow = (id) => {
    console.log(id, "is going to delete ");
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then(() => {
        console.log(id, " is deleted successfully ");
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editRow = (item) => {
    // selectedRow.push(item);
    setEdit(true);
    setUsers([item]);
    // console.log(item);
  };

  return (
    <div>
      <nav>
        <div className="logo-bar">ExerciseTracker</div>
        <div className="options-bar">
          <div className="addUser" onClick={() => createUser()}>
            Add User
          </div>
        </div>
      </nav>

      {click && (
        <section>
          <div className="black-screen"></div>

          {type === "addUser" && (
            <div className="popup mini-container">
              <div className="user-popup">
                <div className="container-title">Adding New User</div>
                <form onSubmit={(e) => handleClick(e, "addUserForm")}>
                  <div>
                    <span>Enter User Name : </span>
                    <input autoFocus="true" />
                  </div>
                  <button type="submit">Done</button>
                </form>
              </div>
            </div>
          )}

          {type === "addExercise" && (
            <div className="popup large-container user-popup">
              <form onSubmit={(e) => handleClick(e, "addExerciseForm")}>
                <div className="container-title">Add New Logger</div>
                <label>Select One : </label>
                <select
                  className="dropDown--wrapper"
                  defaultValue={users[0].username}
                  onChange={(e) => dropdown(e)}
                >
                  {users.map((item) => {
                    return (
                      <option value={item.username} key={item._id}>
                        {item.username}
                      </option>
                    );
                  })}
                </select>
                <br />
                <br />
                <br />
                Description :{" "}
                <input
                  type="text"
                  placeholder={
                    users.length === 1 ? users[0].description : "Description"
                  }
                />
                <br />
                <br />
                <br />
                Duration :{" "}
                <input
                  type="text"
                  placeholder={
                    users.length === 1 ? users[0].duration : "Duration in Minutes"
                  }
                />
                <br />
                <br />
                <button type="submit">Done</button>
              </form>
            </div>
          )}
        </section>
      )}

      <section className="data-display">
        <div className="LoggedExercises">LoggedExercises</div>
        <div>
          <table className="table">
            <thead>
              <tr className="table-header">
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr className="table-data" key={item._id}>
                    <td>{item.username}</td>
                    <td>{item.description} </td>
                    <td>{item.duration} min </td>
                    <td>{item.date.toString().substring(0, 10)}</td>
                    <td>
                      <span
                        className="blueColor pointer"
                        onClick={() => {
                          deleteRow(item._id);
                        }}
                      >
                        Delete
                      </span>{" "}
                      |{" "}
                      <span
                        className="blueColor pointer"
                        onClick={() => {
                          editRow(item);
                          // selectedRow=item;
                          setClick(true);
                          setType("addExercise");
                        }}
                      >
                        Edit
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="addLogger--btn--wrapper">
            <div className="addLogger--btn" onClick={() => createLogger()}>
              <span className="verticalLine"></span>
              <span className="horizantalLine"></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
// React
