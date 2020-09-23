import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment as farComment } from "@fortawesome/free-regular-svg-icons";
import "./button.styles.css";
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }
  render() {
    return (
      <div className="like-btn">
        <i
          onClick={() => {
            this.setState({ isActive: !this.state.isActive });
          }}
          className={this.state.isActive ? "active" : "none-active"}
        >
          {this.state.isActive ? (
            <FontAwesomeIcon icon={faHeart} />
          ) : (
            <FontAwesomeIcon icon={farHeart} />
          )}
        </i>
        <i>
          <FontAwesomeIcon icon={farComment} />
        </i>
      </div>
    );
  }
}
export default Button;
