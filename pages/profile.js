import { useState, useEffect, useContext } from "react";
import { auth } from "../config/firebaceConfig";
import { db } from "../config/firebaceConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import Link from "next/link";
import TableContext from "../components/ContextApi";

const profile = () => {
  const [changeDetails, setChangeDetails] = useState(false);
  const { isSelected, fetchData } = useContext(TableContext);
  useEffect(() => {
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { name, email } = formData;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData((prevState) => {
          return {
            ...prevState,
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
          };
        });
      }
    });
  }, []);

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { name });
      const updateTimestamp = await updateDoc(userRef, {
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const deleteAccount = () => {
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <h2>Profile</h2>
      <div style={{ display: "flex" }}>
        <div className="card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRthZcF6C12-eMC0JrJdv4CWO40-emM4BBFlw&usqp=CAU"
            alt="Avatar"
            className="img"
          />
          <div className="container">
            <form>
              <label htmlFor="name"> User Details </label>
              <input
                type="text"
                id="name"
                disabled={!changeDetails}
                className={!changeDetails ? "profileName" : "profileNameActive"}
                value={name}
                onChange={onChange}
              />
              <input
                type="text"
                id="email"
                disabled={!changeDetails}
                className={!changeDetails ? "profileEmail" : "profileEmailActive"}
                value={email}
                onChange={onChange}
              />
            </form>

            <div>
              <p
                onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                {changeDetails ? "done" : "change details"}
              </p>
            </div>
            <div>
              <Link href="/feed"> Go back to feed</Link>
            </div>
            <div onClick={deleteAccount}>delete Account</div>
          </div>
        </div>
        <table>
          <tbody>
            {isSelected.map((el) => {
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default profile;
