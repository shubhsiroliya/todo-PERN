import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTools = () => {
  const [todos, setTodos] = useState([]);

  // delete todo function
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todo/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.tb1_id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // get todos
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.tb1_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                {" "}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.tb1_id)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTools;
