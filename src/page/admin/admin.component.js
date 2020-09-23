import React from "react";
import Header from "../../component/header/header.component";
import ListConfessions from "../../component/list/list.component";
class AdminPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ListConfessions />
      </div>
    );
  }
}
export default AdminPage;
