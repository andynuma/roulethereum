import React from "react";

class List extends React.Component {
  render() {
    const { users } = this.props;
    const list = users.map((user, index) => {
        return (
          <li key={index}>
            {user}
          </li>
        );
      });

      return (
        <div>
          <h2>List</h2>
          <ul>{list}</ul>
        </div>
      );
    }
}

export default List;