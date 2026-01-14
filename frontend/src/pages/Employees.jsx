


// import { useEffect, useState } from "react";
// import { employeeApi } from "../api/employeeApi";
// import { useAuth } from "../context/AuthContext";

// function Employees() {
//   const [employees, setEmployees] = useState([]);

//   // form state
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [department, setDepartment] = useState("");
//   const [salary, setSalary] = useState("");

//   const { token } = useAuth();

//   // 🔹 FETCH EMPLOYEES
//   const fetchEmployees = () => {
//     employeeApi(token)
//       .get("employees/")
//       .then(res => setEmployees(res.data))
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   // 🔹 CREATE EMPLOYEE
//   const handleAddEmployee = (e) => {
//     e.preventDefault();

//     employeeApi(token)
//       .post("employees/", {
//         name,
//         email,
//         department,
//         salary
//       })
//       .then(() => {
//         fetchEmployees();
//         setName("");
//         setEmail("");
//         setDepartment("");
//         setSalary("");
//       })
//       .catch(err => console.error(err));
//   };

//   // 🔹 DELETE EMPLOYEE
//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete?")) return;

//     employeeApi(token)
//       .delete(`employees/${id}/`)
//       .then(() => fetchEmployees())
//       .catch(err => console.error(err));
//   };

//   return (
//     <div>
//       <h2>Employees</h2>

//       {/* ADD EMPLOYEE */}
//       <form onSubmit={handleAddEmployee}>
//         <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
//         <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//         <input placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} />
//         <input type="number" placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} />
//         <button type="submit">Add Employee</button>
//       </form>

//       <hr />

//       {/* EMPLOYEE LIST */}
//       <ul>
//         {employees.map(emp => (
//           <li key={emp.id}>
//             <b>{emp.name}</b> <br />
//             {emp.email} <br />
//             {emp.department} <br />
//             ₹{emp.salary} <br />

//             <button onClick={() => handleDelete(emp.id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Employees;

// ___________________________________________

// import { useEffect, useState } from "react";
// import { employeeApi } from "../api/employeeApi";
// import { useAuth } from "../context/AuthContext";

// function Employees() {
//   const [employees, setEmployees] = useState([]);

//   // create form
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [department, setDepartment] = useState("");
//   const [salary, setSalary] = useState("");

//   // edit state
//   const [editingId, setEditingId] = useState(null);
//   const [editData, setEditData] = useState({
//     name: "",
//     email: "",
//     department: "",
//     salary: ""
//   });

//   const { token } = useAuth();

//   // 🔹 READ
//   const fetchEmployees = () => {
//     employeeApi(token)
//       .get("employees/")
//       .then(res => setEmployees(res.data))
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   // 🔹 CREATE
//   const handleAddEmployee = (e) => {
//     e.preventDefault();

//     employeeApi(token)
//       .post("employees/", { name, email, department, salary })
//       .then(() => {
//         fetchEmployees();
//         setName("");
//         setEmail("");
//         setDepartment("");
//         setSalary("");
//       });
//   };

//   // 🔹 DELETE
//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this employee?")) return;

//     employeeApi(token)
//       .delete(`employees/${id}/`)
//       .then(() => fetchEmployees());
//   };

//   // 🔹 START EDIT
//   const startEdit = (emp) => {
//     setEditingId(emp.id);
//     setEditData({
//       name: emp.name,
//       email: emp.email,
//       department: emp.department,
//       salary: emp.salary
//     });
//   };

//   // 🔹 UPDATE
//   const handleUpdate = (id) => {
//     employeeApi(token)
//       .put(`employees/${id}/`, editData)
//       .then(() => {
//         setEditingId(null);
//         fetchEmployees();
//       });
//   };

//   return (
//     <div>
//       <h2>Employees</h2>

//       {/* CREATE */}
//       <form onSubmit={handleAddEmployee}>
//         <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
//         <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//         <input placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} />
//         <input type="number" placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} />
//         <button type="submit">Add</button>
//       </form>

//       <hr />

//       {/* LIST */}
//       <ul>
//         {employees.map(emp => (
//           <li key={emp.id}>
//             {editingId === emp.id ? (
//               <>
//                 <input
//                   value={editData.name}
//                   onChange={e => setEditData({ ...editData, name: e.target.value })}
//                 />
//                 <input
//                   value={editData.email}
//                   onChange={e => setEditData({ ...editData, email: e.target.value })}
//                 />
//                 <input
//                   value={editData.department}
//                   onChange={e => setEditData({ ...editData, department: e.target.value })}
//                 />
//                 <input
//                   type="number"
//                   value={editData.salary}
//                   onChange={e => setEditData({ ...editData, salary: e.target.value })}
//                 />

//                 <button onClick={() => handleUpdate(emp.id)}>Save</button>
//                 <button onClick={() => setEditingId(null)}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 <b>{emp.name}</b> | {emp.department} | ₹{emp.salary}
//                 <br />
//                 {emp.email}
//                 <br />

//                 <button onClick={() => startEdit(emp)}>Edit</button>
//                 <button onClick={() => handleDelete(emp.id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Employees;


// *****************************

import { useEffect, useState } from "react";
import { employeeApi } from "../api/employeeApi";
import { useAuth } from "../context/AuthContext";

function Employees() {
  const [employees, setEmployees] = useState([]);

  // CREATE FORM STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  // EDIT STATE
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const { token } = useAuth();

  // 🔹 READ
  const fetchEmployees = () => {
    employeeApi(token)
      .get("employees/")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 🔹 CREATE
  const handleAddEmployee = (e) => {
    e.preventDefault();

    employeeApi(token)
      .post("employees/", {
        name,
        email,
        department,
        salary,
      })
      .then(() => {
        fetchEmployees();
        setName("");
        setEmail("");
        setDepartment("");
        setSalary("");
      })
      .catch((err) => console.error(err));
  };

  // 🔹 DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    employeeApi(token)
      .delete(`employees/${id}/`)
      .then(() => fetchEmployees())
      .catch((err) => console.error(err));
  };

  // 🔹 START EDIT
  const startEdit = (emp) => {
    setEditingId(emp.id);
    setEditData({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      salary: emp.salary,
    });
  };

  // 🔹 UPDATE
  const handleUpdate = (id) => {
    employeeApi(token)
      .put(`employees/${id}/`, editData)
      .then(() => {
        setEditingId(null);
        fetchEmployees();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Employees</h2>

      {/* 🔹 ADD EMPLOYEE */}
      <form onSubmit={handleAddEmployee}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <hr />

      {/* 🔹 EMPLOYEE LIST */}
      <ul>
        {employees.map((emp) => (
          <li key={emp.id} style={{ marginBottom: "15px" }}>
            {editingId === emp.id ? (
              <>
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
                <input
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
                <input
                  value={editData.department}
                  onChange={(e) =>
                    setEditData({ ...editData, department: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editData.salary}
                  onChange={(e) =>
                    setEditData({ ...editData, salary: e.target.value })
                  }
                />

                <br />
                <button onClick={() => handleUpdate(emp.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <b>{emp.name}</b>
                <br />
                Email: {emp.email}
                <br />
                Department: {emp.department}
                <br />
                Salary: ₹{emp.salary}
                <br />
                Created:{" "}
                {new Date(emp.created_at).toLocaleString()}
                <br />

                <button onClick={() => startEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;
