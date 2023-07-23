import { Modal } from 'flowbite-react';
import { RunType } from '../../context/RunsContext';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { UserAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

type PropsType = {
    openModal: string | undefined
    setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>
    run: RunType
}

export default function RunModal({ openModal, setOpenModal, run }: PropsType) {
    const { user } = UserAuth();
    const [currentImage, setCurrentImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (run.hasImage) {
            getDownloadURL(ref(storage, `users/${user?.uid}/${run.docId}`))
                .then((url) => {
                    setPreviewImage(url)
                })
                .catch((error) => {
                    alert(error)
                });
        }
        else {
            setMessage('You can upload an image!')
        }
    }, [])


    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files as FileList;
        setCurrentImage(selectedFiles?.[0]);
        setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
        setProgress(0);
    };

    const upload = () => {
        setProgress(0);
        if (!currentImage) return;

        const storageRef = ref(storage, `users/${user?.uid}/${run.docId}`);
        const uploadTask = uploadBytesResumable(storageRef, currentImage);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                alert(error);
            },
            async () => {
                const runRef = doc(db, `runs/${run.docId}`);

                await updateDoc(runRef, {
                    hasImage: true
                });
                setMessage('Uploaded successfully!')
            }
        );
    };

    return (
        <Modal popup dismissible show={openModal === 'dismissible'} onClose={() => setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body>
                <div className="flex flex-col items-center text-black">
                    <p className="text-xl leading-relaxed">
                        Date: {run.day}
                    </p>
                    <p className="text-xl leading-relaxed">
                        Length: {run.km}km
                    </p>
                    <p className="text-xl leading-relaxed">
                        Time: {Math.floor(run.minutes / 60)}:{String(run.minutes % 60).padStart(2, '0')}
                    </p>
                    <div className='flex gap-6 flex-wrap justify-center items-center mb-2'>
                        <input type="file" accept="image/*" onChange={selectImage} className='bg-red-400 rounded-xl' />
                        <button className={`${currentImage ? 'opacity-100' : 'opacity-30 cursor-not-allowed'} bg-red-400 p-2 rounded-lg`} onClick={upload}>Upload</button>
                    </div>
                    {message}
                    {currentImage && progress > 0 && <div className='mt-1'>{progress}%</div>}

                    {previewImage && <img className="mt-1" src={previewImage} alt="" />}

                </div>
            </Modal.Body>
        </Modal >
    )
}


