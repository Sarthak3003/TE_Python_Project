import { useState } from "react"
// import { ref, uploadBytes , getDownloadURL } from 'firebase/storage'
import { useDispatch, useSelector } from "react-redux";
// import { setField } from "../formSlice";

const File = ({ question, name, required, errorMsg, error, folder, setFolder }) => {
  let object = folder
  // const dispatch = useDispatch();
  // const { storage } = useSelector(state => state.firebase);
  const { [name]: fileLink } = useSelector(state => state.form);
  const [file, setFile] = useState(folder[name])
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const onChange = (e) => {
    getBase64(e.target.files[0])
      .then(base64 => {
        const data = {data_url: base64, file:e.target.files[0]}
        setFile(data)
        object[name] = data
        setFolder(object)
      })
  };
  // const uploadFile = (file) => {
  //   if (file === null) return;
  //   const imageRef = ref(storage, `images/${file.file.name}`)
  //   return uploadBytes(imageRef, file.file).then((snapshot) => {
  //     return getDownloadURL(snapshot.ref).then((url) => {
  //       dispatch(setField([name, url]))
  //     })
  //   })
  // }
  return (
    <div className='flex flex-col pt-2'>
      <h1 className='text-purplegray-400 mb-2'>{question}{required && '*'}</h1>
      <input onChange={e => onChange(e)} accept="application/pdf" className="block py-1 px-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none" type="file" />
      {/* <button className='w-full bg-purplegray-600 rounded p-1 m-1 text-white' onClick={() => uploadFile(file)}>Upload File</button> */}
      {/* {fileLink && <p className='text-green-500 text-sm mt-1'>Uploaded</p>} */}
      {(error && !fileLink) ? <p className='text-red-500 text-sm mt-1'>{errorMsg}</p> : '‎'}
    </div>
  )
}

export default File