import React from "react";
import fb from "fb";
import "./upload.styles.css";
class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ACCESS_TOKEN:
        "EAAE5ZC7lkd74BAAN1qGEspzfbTYVAB6VPbjmRJ9JvvVETNMCpiQOWfjgIhlOJxBtFnVSj8eSqH1Lza4HB8e6ZCPvuCCDnIYRzYfRDxLqZCE9QWfuGXcZAYQ1gwFxXoCushhCdf7ElXiFAayCLXwwlUviLXD110pL8FZCJO4ZCjWOG2tPSS2hq3ZCK5X8Ef5iUTc3OTqGEtI4wZDZD",
      active: false,
      idString: "",
      content: "",
      linkImg:
        "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/IMG_%28business%29.svg/1200px-IMG_%28business%29.svg.png",
    };
    this.mapImageToString = this.mapImageToString.bind(this);
    this.handleActive = this.handleActive.bind(this);
  }
  mapImageToString = (index, id) => {
    const string = `attached_media[${index}] media_fbid: ${id}`;
    return string;
  };
  handleSubmit = async (data) => {
    const content = [];
    const attached_media = [];
    var i = 0;
    var count = 0;
    await data.map(async (dt, index) => {
      content.push(`${index}. ${dt.content}`);
      this.setState({ content: content });
      await dt.image.map(async (imgSrc) => {
        count += imgSrc.length;
        var self = this;
        await fb.api(
          "/1687175514946393/photos",
          "POST",
          {
            url:
              "https://firebasestorage.googleapis.com/v0/b/spdn-cfs.appspot.com/o/4ffb3ae1-e3d8-44f3-a69a-a5786c3e57d2.jpg?alt=media&token=cec6869f-73bd-4f74-b900-5db6731c3706",
            published: "false",
            access_token: this.state.ACCESS_TOKEN,
          },
          function (response) {
            attached_media.push(`{"media_fbid": "${response.id}"}`);
            if (attached_media.length === count / 160) {
              self.uploadPostWithMultiImg(attached_media);
            }
            i++;
          }
        );
      });
    });
  };
  uploadPostWithMultiImg = (attached_media) => {
    const attachedString = `[${attached_media.join()}]`;
    fb.api(
      "/v8.0/1687175514946393/feed",
      "POST",
      {
        message: this.state.content,
        attached_media: attachedString,
        access_token: this.state.ACCESS_TOKEN,
      },
      function (response) {
        console.log(response);
      }
    );
  };

  handleActive = () => {
    this.setState({ active: !this.state.active });
  };
  render() {
    const { data } = this.props;
    const { active } = this.state;
    return (
      <div className={`preview`}>
        <div className="preview-header" onClick={this.handleActive}>
          <h3 className="count">Confession Selected : {data.length}</h3>
        </div>
        <div className={`${active ? "active" : ""} upload`}>
          {data.map((dt, index) => {
            return (
              <React.Fragment key={index}>
                <span className="content">
                  {index}.{dt.content}
                </span>
              </React.Fragment>
            );
          })}
          <br></br>
          <button
            className="btn-submit"
            onClick={() => this.handleSubmit(data)}
          >
            Post
          </button>
        </div>
      </div>
    );
  }
}
export default Upload;
