import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import user from "../../assets/userIcon.png";
import Grid from "@mui/material/Grid";
// import "./profile.css";
import "./profilep.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import data from "./data.json";
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
export default function Profile() {
  const [name, setName] = useState(data[0].cname);
  const [type, setType] = useState(data[0].ctype);
  const email = data[0].cemail;
  const [address1, setAddress1] = useState(data[0].caddress1);
  const [address2, setAddress2] = useState(data[0].caddress2);
  const wallet = data[0].cwallet;
  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState(user);
  const [image, setImage] = useState<string | null>(
    localStorage.getItem("image") || null
  );
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    convertToBase64(file).then((base64String) => {
      localStorage.setItem("image", base64String);
      setImage(base64String);
    });
  };
  function handleChange(e: any) {
    console.log(e.target.files);
    const image = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(image);
    setFiles(URL.createObjectURL(e.target.files[0]));
    console.log(files);
  }
  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleSave = () => {
    console.log(name, type, email, address1, address2, wallet);
    setEdit(!edit);
  };
  return (
    <div>
      <>{Sidebar(1)}</>
      <div className="Profile">
        <Box>
          <div className="profileTitle">Profile</div>
          {!edit && (
            <Box className="profileBox">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <div className="profileImage">
                    {image ? (
                      <img
                        src={image}
                        alt="user"
                        className="img"
                        id="profilePicture"
                      />
                    ) : (
                      <img
                        src={files}
                        alt="user"
                        className="img"
                        id="profilePicture"
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={7} sm={3}>
                  <div className="profileEntries">
                    <div className="profileEntriesData">Company Name </div>
                    <div className="profileEntriesData">Company Type </div>
                    <div className="profileEntriesData">Company Email </div>
                    <div className="profileEntriesData">Company Address 1 </div>
                    <div className="profileEntriesData">Company Address 2 </div>
                    <div className="profileEntriesData">Wallet Address </div>
                  </div>
                </Grid>
                <Grid item xs={0.5} sm={0.5}>
                  <div className="semiColon">
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                  </div>
                </Grid>
                <Grid item xs={5} sm={5.5}>
                  <div className="profileDetails">
                    <div className="profileDetailsData">{name}</div>
                    <div className="profileDetailsData">{type}</div>
                    <div className="profileDetailsData">{email}</div>
                    <div className="profileDetailsData">{address1}</div>
                    <div className="profileDetailsData">{address2}</div>
                    <div className="profileDetailsData">{wallet}</div>
                  </div>
                </Grid>
              </Grid>
              <button className="editButton" onClick={() => handleEdit()}>
                Edit
              </button>
            </Box>
          )}
          {edit && (
            <Box className="profileBox">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <div className="profileImage">
                    {image ? (
                      <img src={image} alt="Stored" className="imgInEditMode" />
                    ) : (
                      <img src={files} alt="user" className="imgInEditMode" />
                    )}
                    <div className="editIMG">
                      <label className="editIcon" htmlFor="files">
                        <CreateOutlinedIcon />
                      </label>
                      <input
                        type="file"
                        className="hidden"
                        id="files"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={7} sm={3}>
                  <div className="profileEntries">
                    <div className="profileEntriesData">Company Name </div>
                    <div className="profileEntriesData">Company Type </div>
                    <div className="profileEntriesData">Company Email </div>
                    <div className="profileEntriesData">Company Address 1 </div>
                    <div className="profileEntriesData">Company Address 2 </div>
                    <div className="profileEntriesData">Wallet Address </div>
                  </div>
                </Grid>
                <Grid item xs={0.5} sm={0.5}>
                  <div className="semiColon">
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                    <div className="colonIcon">:</div>
                  </div>
                </Grid>
                <Grid item xs={5} sm={4.2}>
                  <div className="profileDetailsEdit">
                    <input
                      className="profileDetailsDataEdit1"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="profileDetailsDataEdit1"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                    <div className="profileDetailsDataEditState">{email}</div>
                    <input
                      className="profileDetailsDataEdit1"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                    <input
                      className="profileDetailsDataEdit1"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                    <div className="profileDetailsDataEditState">{wallet}</div>
                  </div>
                </Grid>
              </Grid>
              <button className="editButton" onClick={() => handleSave()}>
                Save
              </button>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
}
