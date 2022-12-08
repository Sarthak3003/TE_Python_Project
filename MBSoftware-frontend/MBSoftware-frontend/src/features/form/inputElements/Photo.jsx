import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
// import { ref, uploadBytes , getDownloadURL } from 'firebase/storage'
import ReactImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
// import { setField } from "../formSlice";
import CaptureImage from "./CaptureImage";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

const Photo = ({ question, name, required, errorMsg, error, folder, setFolder }) => {
  let object = folder
  // const dispatch = useDispatch();
  // const { storage } = useSelector(state => state.firebase);
  const { [name]: photo } = useSelector(state => state.form);
  const [image, setImage] = useState(folder[name]);
  const [capturedImage, setCapturedImage] = useState('')
  const [type, setType] = useState('upload')
  const onChange = (imageList, addUpdateIndex) => {
    setImage(imageList[0]);
    object[name] = imageList[0]
    setFolder(object)
  };
  useEffect(() => {
    object[name] = capturedImage
    setFolder(Object)
  }, [capturedImage])
  
  // const uploadImage = (img) => {
  //   if (img === null) return;
  //   const imageRef = ref(storage, `images/${img.file.name}`)
  //   return uploadBytes(imageRef, img.file).then((snapshot) => {
  //     return getDownloadURL(snapshot.ref).then((url) => {
  //       dispatch(setField([name, url]))
  //     })
  //   })
  // }
   
  return (
    <div className='flex flex-col pt-2'>
      <div className="flex flex-col justify-center items-center">
        <h1 className='text-purplegray-400 mb-2'>{question}{required && '*'}</h1>
        <div className={`flex gap-4 mb-2`}>
          <label class={`flex items-center gap-1 text-sm text-purplezinc`}>
            <input type="radio" checked={type==='upload'} onChange={e => {
                const object = {...folder, [name]: null}
                setFolder(object)
                setType(e.target.value)
              }} value='upload' class="w-4 h-4 accent-purplegray-600 bg-gray-100 border-gray-300" />
            Upload Photo
          </label>
          <label class={`flex items-center gap-1 text-sm text-purplezinc`}>
            <input type="radio" checked={type==='click'} onChange={e => {
                const object = {...folder, [name]: null}
                setFolder(object)
                setType(e.target.value)
              }} value='click' class="w-4 h-4 accent-purplegray-600 bg-gray-100 border-gray-300" />
            Click Photo
          </label>
        </div>
        {
          type === 'upload' ?
          <ReactImageUploading
            value={image}
            onChange={onChange}
            dataURLKey="data_url"
          >
            {({
              onImageUpload,
              onImageRemove,
            }) => (
              <div className="upload__image-wrapper">
                {image ? (
                  <div className="h-40 w-28 bg-white relative">
                    <div className="w-full h-full flex justify-center items-center" onClick={onImageUpload}>
                      <img src={image['data_url']} alt="" 
                        className="w-auto h-auto" 
                        onClick={() => {
                          setImage(null)
                          onImageRemove(0)
                        }} 
                      />
                    </div>
                    <div className="absolute top-[-10px] right-[-10px] p-1 rounded-full bg-purple-200">
                      <AiOutlineClose
                        className="text-red-500 text-sm"
                        onClick={() => {
                          setImage(null)
                          onImageRemove(0)
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-40 w-28 bg-white flex justify-center items-center" onClick={onImageUpload}>
                    <MdAddCircleOutline className="w-12 h-12 text-gray-600" />
                  </div>
                )}

              </div>
            )}
          </ReactImageUploading> :
          <CaptureImage capturedImage={capturedImage} setCapturedImage={setCapturedImage} />
        }
        {/* <button className='w-full bg-purplegray-600 rounded p-1 m-1 text-white' onClick={() => uploadImage(image)}>Upload Image</button> */}
      </div>
      {/* {photo && <p className='text-green-500 text-sm mt-1'>Uploaded</p>} */}
      {(error && !photo) ? <p className='text-red-500 text-sm mt-1'>{errorMsg}</p> : '‎'}
    </div>
  )
}

export default Photo