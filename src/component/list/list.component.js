import React from "react";
import moment from "moment";
import firebase from "../../firebase.utils";
import "./list.styles.css";
import Upload from "../../page/upload to fb -test/upload.component";
class ListConfessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      cfsLoaded: [],
    };
    this.handleChoice = this.handleChoice.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.addListeners();
  }
  addListeners = () => {
    let data = [];
    firebase
      .database()
      .ref("messages")
      .child("coffessions")
      .orderByChild("timestamp")
      .limitToLast(5)
      .on("child_added", (snapshot) => {
        data.push(snapshot.val());
        this.setState({ cfsLoaded: data });
      });
  };
  handleSubmit = () => {
    console.log(this.state.value);
  };
  handleChoice = (cfs) => {
    var joined = this.state.value.concat(cfs);
    this.setState({ value: [...new Set(joined)] });
  };
  render() {
    const { cfsLoaded } = this.state;
    return (
      <div>
        {cfsLoaded &&
          Array.from(cfsLoaded).map((cfs, index) => (
            <div key={index}>
              <blockquote>
                <p>{cfs.content}</p>;
                <footer>
                  <p>-Send by: {cfs.user.name}</p>
                  <cite>
                    <p>{moment(cfs.timestamp).fromNow()}</p>{" "}
                  </cite>
                </footer>
                {cfs.fileURL &&
                  cfs.fileURL.map((srcImg) => {
                    return (
                      <React.Fragment key={index}>
                        <img src={srcImg} alt="Img" />
                      </React.Fragment>
                    );
                  })}
                <div className="button">
                  <button
                    onClick={() => this.handleChoice(cfs)}
                    className="btn btn-approve"
                  >
                    OK
                  </button>
                  <button className="btn btn-cancel">Cancel</button>
                </div>
              </blockquote>
            </div>
          ))}
        {this.state.value.length > 0 ? <Upload data={this.state.value} /> : ""}
      </div>
    );
  }
}

export default ListConfessions;
