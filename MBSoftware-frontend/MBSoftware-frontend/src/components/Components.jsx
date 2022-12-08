import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setField } from "../features/form/formSlice";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdAddCircleOutline } from "react-icons/md";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";
import ReactImageUploading from "react-images-uploading";
import { TextField } from "../features/form/inputElements/TextField";
import { DropDown } from "../features/form/inputElements/DropDown";
import Checkbox from "../features/form/inputElements/Checkbox";
import Radio from "../features/form/inputElements/Radio";
import File from "../features/form/inputElements/File";
import Photo from "../features/form/inputElements/Photo";

const Components = () => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.form)
  const fname = form['fname']
  console.log(fname)
  const [image, setImage] = useState(null)
  const onChange = (imageList, addUpdateIndex) => {
    setImage(imageList[0]);
  };
  return (
    <div className='p-6 flex flex-col gap-4 bg-purple-50'>
      <TextField question='Enter Name' name='fname' type='text' reegx='' />
      <DropDown question='Select any one' name='' options={['1', '2']} />
      <Radio question='Choose one' name='' row={false} options={['1', '2']} />
      <Radio question='Choose one' name='' row={true} options={['1', '2']} />
      <Checkbox question='Check this' name='' label='123' />
      {/* <div class="flex justify-center items-center w-96">
        <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
          <div class="flex flex-col justify-center items-center pt-5 pb-6">
            <AiOutlineCloudUpload className="w-10 h-10 text-gray-500" />
            <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div> */}
      <Photo question='Upload your Photo' name='' />
      <File question='Upload File' name='' />

    </div>
  )
}

export default Components