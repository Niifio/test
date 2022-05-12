// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../config/firebaceConfig";
import { useState, useEffect, useContext } from "react";
import TableContext from "./ContextApi";
import Link from "next/link";

const Tables = () => {
  const { onClick, workForceData, fetchData } = useContext(TableContext);

  const [searchData, setSearchData] = useState([]);
  const [filteredResult, setFilteredResult] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const filter = (e) => {
    const keyword = e.target.value.toLocaleLowerCase();
    if (keyword !== "") {
      const result = workForceData.filter((user) => {
        const value = Object.values(user)
          .join(" ")
          .toLocaleLowerCase()
          .includes(keyword);

        return value;
      });

      setSearchData(result);
    } else {
      setSearchData(workForceData);
    }
    setFilteredResult(keyword);
  };

  return (
    <>
      <header>
        <h1>Select your work force</h1>
      </header>
      <div style={{ margin: "10px" }}>
        <input
          type="text"
          placeholder="Search"
          style={{ fontSize: "20px" }}
          value={filteredResult}
          onChange={filter}
        />
      </div>

      {searchData && searchData.length > 0 ? (
        <div className="header_fixed">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Job Title</th>
                <th>Gender</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {searchData.map((el) => {
                const {
                  id,
                  image,
                  first_name,
                  last_name,
                  email,
                  age,
                  job,
                  gender,
                } = el;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>
                      <img src={image} />
                    </td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{email}</td>
                    <td>{age}</td>
                    <td>{job}</td>
                    <td>{gender}</td>
                    <td>
                      <button id={id} onClick={onClick}>
                        selected
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="header_fixed">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Job Title</th>
                <th>Gender</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {workForceData.map((el) => {
                const {
                  id,
                  image,
                  first_name,
                  last_name,
                  email,
                  age,
                  job,
                  gender,
                } = el;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>
                      <img src={image} />
                    </td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{email}</td>
                    <td>{age}</td>
                    <td>{job}</td>
                    <td>{gender}</td>
                    <td>
                      <button id={id} onClick={onClick}>
                        selected
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Tables;
