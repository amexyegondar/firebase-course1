import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth,storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref ,uploadBytes} from "firebase/storage";
import { async } from "@firebase/util";
function App() {
  const [movieList, setMovieList] = useState([]);
  //New movie state
  const [movietitle, setMovietitle] = useState("");
  const [releaseDt, setReleaseDt] = useState(0);
  const [ischecked, setIschecked] = useState(true);

  const [updatetitle, setUpdatetitle] = useState("");
  //file upload state
  const[fileUpload,setFileUpload]=useState(null)
  const moviesCollectionRef = collection(db, "movies");
  useEffect(() => {
    const getmovies = async () => {
      try {
        const data = await getDocs(moviesCollectionRef);
        const filtereddata = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filtereddata);
      } catch (err) {
        console.error(err);
      }
    };
    getmovies();
  });
  const onsubmitmovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: movietitle,
        releasedate: releaseDt,
        receivedanoscar: ischecked,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };
  const deleteMovie = async (id) => {
    const movie = doc(db, "movies", id);

    await deleteDoc(movie);
  };
  const updatemovietitle = async (id) => {
    const movie = doc(db, "movies", id);
    await updateDoc(movie, {
      title: updatetitle,
    });
  };
  const uploadFile= async()=>{
    if(!fileUpload) return;
 const filesFolderRef=ref(storage, `projectFile/${fileUpload.name}`)
 try{
  await uploadBytes(filesFolderRef,fileUpload)

 }
 catch(err){
  console.error(err)
 }
 await uploadBytes(filesFolderRef,fileUpload)

  }
  return (
    <div className="app">
      <div className="authContainer">
        <Auth />
      </div>

      <div className="formContainer">
        <input
          type="text"
          placeholder="Movie title ....."
          onChange={(e) => setMovietitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Release date"
          onChange={(e) => setReleaseDt(Number(e.target.value))}
        />
        <input
          type="checkbox"
          id="isoscar"
          checked={ischecked}
          onChange={(e) => setIschecked(e.target.checked)}
        />

        <label htmlFor="isoscar">Recevied Oscar</label>

        <button onClick={onsubmitmovie}>Submit </button>
      </div>
      {
        <div className="dataContainer">
          {movieList.map((movie) => {
            return (
              <div key={movie.id}>
                <h1 style={{ color: movie.receivedanoscar ? "green" : "red" }}>
                  Title:{movie.title}
                </h1>
                <h4>Oscar:{movie.receivedanoscar}</h4>
                <h4>Date:{movie.releaseDate}</h4>

                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                <input
                  type="text"
                  placeholder="update title"
                  onChange={(e) => setUpdatetitle(e.target.value)}
                />
                <button onClick={() => updatemovietitle(movie.id)}>
                  Update
                </button>
              </div>
            );
          })}
        </div>
      }
      <div>
        <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload file</button>
      </div>

    </div>
  );
}

export default App;
