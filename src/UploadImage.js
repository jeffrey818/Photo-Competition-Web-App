import {useState} from 'react'
import {auth, db} from "./firebase"
import MyModal from "./MyModal"

import {projectStorage} from "./firebase";
import {uploadBytesResumable, ref, getDownloadURL} from "firebase/storage"
import {updateDoc, doc} from "firebase/firestore";
import {ProgressBar} from "react-bootstrap"

function UploadImage({onClose, userList, open, id}) {

    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);

    const userName = auth.currentUser.displayName;

    const handleUpload = (e) => {
        e.preventDefault();

        const compDocRef = doc(db, 'competition', id);
        // const file = e.target.files[0]

        //upload files and update the doc in the db
        if (userList[userName].photoRef > "") {
            alert("Failed! You have uploaded your photo!")
        }

        else {
            if (!selectedImage) {
                alert("no file selected");
            }
            else {
                const storageRef = ref(projectStorage, `capstone/${id}--${selectedImage.name}`);
                const uploadTask = uploadBytesResumable(storageRef, selectedImage);

                uploadTask.on('state_changed', (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                        // progress will change correspondingly
                        setProgress(progress);
                    },
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then(async (url) => {
                                userList[userName].photoRef = url;
                                userList[userName].uploadExist = "Uploaded Photo Exist"

                                try {
                                    // update the doc of the competition
                                    await updateDoc(compDocRef, {
                                        joinList: userList
                                    })
                                    onClose()
                                } catch (err) {
                                    alert(err)
                                }
                            });
                    }
                )
            }
        }
    }

    return (
        <MyModal modalLable='Upload Photo' onClose={onClose} open={open}>
            <form onSubmit={handleUpload}>
                <input type="file"
                       onChange={(e)=> {
                           setSelectedImage(e.target.files[0]);
                           setPreview(URL.createObjectURL(e.target.files[0]))
                       }
                       }/>
                <button type="submit">Upload</button>
                <div className={"imgContainer"}>
                    <img src= { preview ||
                        "https://firebasestorage.googleapis.com/v0/b/capstone-9b049.appspot.com/o/ForDev%2Fwhite.png?alt=media&token=4bc94576-6d61-41e1-b84e-f8f7bb5d92f9"} alt={"upImg"}
                    />
                </div>
            </form>

            <h4>Upload Progress :{progress}%</h4>
            <ProgressBar now={progress}/>

        </MyModal>
    )
}

export default UploadImage;