import '../../App.css';
// import "./Gallery.css"
import '../../firebase';
import {useState, useEffect} from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import {ImageListItem, ImageList} from "@mui/material";

function Gallery() {
    const [gallery, setGallery] = useState([]);

    useEffect( () => {
        const comRef = collection(db, 'gallery')

        const q = query(comRef);

        onSnapshot(q, (querySnapshot) => {
            setGallery(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }, []);

    return (
      <div className="Gallery">
        <header className="gallery-header">
            <ImageList variant="masonry" cols={3} gap={8}>
              {gallery.map((photo) => (
                <ImageListItem key={photo.id} className={"gallery"}>
                    <img src={photo.data.URL} alt="photos"/>
                </ImageListItem>
              ))}
            </ImageList>
        </header>
      </div>
    );
  }
  
  export default Gallery;