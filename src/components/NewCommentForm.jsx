import React, { Component } from "react";
import { addAComment } from "../api";
// import { navigate } from "@reach/router";

class NewCommentForm extends Component {
  state = {
    bodyInput: ""
  };

  render() {
    return this.props.loggedinuser ? (
      <form id="addCommentForm" onSubmit={this.handleSubmit}>
        Comment:
        <br />
        <textarea
          id="bodyInput"
          type="text"
          placeholder="comment"
          required={true}
          onChange={this.handleInput}
          value={this.state.bodyInput}
        />
        <br />
        <button className="button" id="submit">
          Add Comment
        </button>
      </form>
    ) : (
      <p>Please Sign In To Comment</p>
    );
  }
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      loggedinuser,
      article_id,
      refreshComments,
      refreshCommentCount
    } = this.props;
    const { bodyInput } = this.state;
    addAComment(loggedinuser.username, bodyInput, article_id).then(comment => {
      this.setState({ bodyInput: "" });
      refreshComments(comment);
      refreshCommentCount();
    });
  };
}

export default NewCommentForm;
