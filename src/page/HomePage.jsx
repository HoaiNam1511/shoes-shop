// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";

function HomePage() {
  // const [userInfo, setuserInfo] = useState({
  //   file: [],
  //   filepreview: null,
  // });

  // const [imageData, setImageData] = useState([]);
  // const handleInputChange = (event) => {
  //   setuserInfo({
  //     ...userInfo,
  //     file: event.target.files[0],
  //     filepreview: URL.createObjectURL(event.target.files[0]),
  //   });
  // };

  // const [isSucces, setSuccess] = useState(null);

  // const test = "Success";
  // const submit = async () => {
  //   const formdata = new FormData();
  //   formdata.append("avatar", userInfo.file);
  //   formdata.append("test", test);

  //   axios.post("http://localhost:8080/product/imageUpload/", formdata, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  //   // .then((res) => {
  //   //   // then print response status
  //   //   //console.warn(res);
  //   //   if (res.data.success === 1) {
  //   //     setSuccess("Image upload successfully");
  //   //   }
  //   // });
  // };

  // useEffect(() => {
  //   axios.get("http://localhost:8080/product/getImage/").then((res) => {
  //     setImageData(res.data);
  //   });
  // }, []);

  return (
    // <div className="container mr-60">
    //   <h3 className="text-white">
    //     React Image Upload And Preview Using Node Js -{" "}
    //     <span> codeat21.com </span>{" "}
    //   </h3>

    //   <div className="formdesign">
    //     {isSucces !== null ? <h4> {isSucces} </h4> : null}
    //     <div className="form-row">
    //       <label className="text-white">Select Image :</label>
    //       <input
    //         type="file"
    //         className="form-control"
    //         name="upload_file"
    //         onChange={handleInputChange}
    //       />
    //     </div>

    //     <div className="form-row">
    //       <button
    //         type="submit"
    //         className="btn btn-dark"
    //         onClick={() => submit()}
    //       >
    //         {" "}
    //         Save{" "}
    //       </button>
    //     </div>
    //   </div>

    //   {userInfo.filepreview !== null ? (
    //     <img
    //       className="previewimg"
    //       src={userInfo.filepreview}
    //       alt="UploadImage"
    //     />
    //   ) : null}

    //   {imageData.map((item) => (
    //     <img
    //       key={item.id}
    //       width={"100px"}
    //       height={"100px"}
    //       src={`http://localhost:8080/images/${item.image}`}
    //       alt=""
    //     />
    //   ))}
    // </div>
    <div>Home</div>
  );
}
export default HomePage;
