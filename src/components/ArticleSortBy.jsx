import React, { Component } from "react";

class ArticleSortBy extends Component {
  state = {
    sort_by: "created_at",
    order: "desc"
  };
  render() {
    return (
      <div className="sortBy">
        <form onSubmit={this.handleSubmit}>
          Sort By{" "}
          <select
            className="select-box"
            onChange={this.handleChange}
            id="sort_by"
          >
            <option value="created_at" id="created">
              Date Created
            </option>
            <option value="comment_count" id="count">
              No. Of Comments
            </option>
            <option value="votes" id="votes">
              Votes
            </option>
          </select>
          <select
            className="select-box"
            onChange={this.handleChange}
            id="order"
          >
            <option value="desc" id="default" defaultValue>
              Sort Order
            </option>
            <option value="desc" id="desc">
              Descending
            </option>
            <option value="asc" id="asc">
              Ascending
            </option>
          </select>
          <button className="button">Go</button>
        </form>
      </div>
    );
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { handleSort } = this.props;
    const { sort_by, order } = this.state;
    handleSort(sort_by, order);
  };
}

export default ArticleSortBy;
