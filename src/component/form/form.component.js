import React from "react";
import mime from "mime-types";
import firebase from "../../firebase.utils";
import uuidv4 from "uuid-v4";
import "./form.styles.css";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content: "",
      isLoading: false,
      files: [],
    };
  }
  addFile = (event) => {
    const files = Array.from(event.target.files);
    if (files) {
      this.setState({ files });
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  uploadFile = async () => {
    const { files } = this.state;
    const filePath = `${uuidv4()}.jpg`;
    const imageRef = firebase.database().ref("images");
    const urlArr = [];
    this.setState({ isLoading: true });
    files.forEach((file) => {
      const metadata = { contentType: mime.lookup(file.name) };
      firebase
        .storage()
        .ref()
        .child(filePath)
        .put(file, metadata)
        .on(
          "state_changed",
          (snap) => {
            // console.log(snap);
          },
          (err) => {
            console.error(err);
          },
          () => {
            firebase
              .storage()
              .ref()
              .child(filePath)
              .put(file, metadata)
              .snapshot.ref.getDownloadURL()
              .then((downloadURL) => {
                urlArr.push(downloadURL);
              })
              .then(() => {
                if (urlArr.length === files.length) {
                  this.sendFileMessage(urlArr);
                  this.setState({ isLoading: false });
                }
              });
          }
        );
    });
  };
  sendFileMessage = (urlArr) => {
    firebase
      .database()
      .ref("messages")
      .child("coffessions")
      .push()
      .set({
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          id: "xxx",
          name: "default",
        },
        name: this.state.name,
        content: this.state.content,
        fileURL: urlArr,
      })
      .then(() => {
        console.log("Done");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.uploadFile();
  };
  render() {
    const { content, name, files, isLoading } = this.state;
    return (
      <React.Fragment>
        {isLoading ? <h3>Loading.....</h3> : ""}
        <form className="form" onSubmit={this.handleSubmit}>
          <select
            type="text"
            name="name"
            placeholder="Tên bạn là gì ?"
            onChange={this.handleChange}
            value={name}
          >
            <option value="Tam su">Tâm sự</option>
            <option value="Lich hoc">Lịch học</option>
            <option value="Crush">Crush</option>
            <option value="Hoc phi">Học phí</option>
            <option value="Tro">Trọ</option>
          </select>
          <textarea
            type="text"
            name="content"
            placeholder="Viết gì đó..."
            onChange={this.handleChange}
            value={content}
            required
          />
          <input type="file" name="image" onChange={this.addFile} multiple />

          <input type="submit" value="Gửi" />
        </form>
      </React.Fragment>
    );
  }
}
export default Form;
