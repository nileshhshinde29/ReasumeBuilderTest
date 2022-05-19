import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function List() {
    const navigate= useNavigate()

  const [allData, setAllData] = useState(
    JSON.parse(localStorage.getItem("allData"))
      ? JSON.parse(localStorage.getItem("allData"))
      : []
  );
    
    
    const deleteFun = (i) => {
        
        const newData = allData.filter((items, index) => index !== i)
        setAllData(newData)
         localStorage.setItem("allData", JSON.stringify(newData));
        

    }
    
  return (
    <div >
      <div className="container my-4">
        <main>
          <div className="py-5">
            <h2>
              Candidates List
              <button onClick={()=>navigate("/add")} className="btn btn-primary float-end">
                Add Candidate
              </button>
            </h2>
          </div>

          <div className="row">
            <div className="col-12 ms-auto me-auto">
              <div className="card">
                <div className="card-body">
                  <table className="table">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Number of Skills</th>
                      <th>Total Work Experience (in months)</th>
                      <th>Actions</th>
                    </tr>

                    {allData.map((item, i) => (
                         <tr>
                            <td>{ i+1}</td>
                        <td>
                          {item.firstname} {item.lastname}
                        </td>
                        <td>{item.email}</td>
                        <td>{item.experience.length+1}</td>
                        <td>
                          {item.experience
                            .map((items) =>
                              Number(items.duration)
                                ? items.duration
                                : Number(0)
                            )
                            .reduce((a, b) => Number(a) + Number(b))}
                        </td>
                        <td>
                                <a onClick={() => { navigate("/edit");  localStorage.setItem("index",JSON.stringify(i))}}>Edit</a>
                          <a
                            onClick={() => deleteFun(i)}
                            className="text-danger ms-2"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default List;
