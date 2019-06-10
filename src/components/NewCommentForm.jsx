import React, { Component } from "react";
import { addAComment } from "../api";
import ShowError from "./ShowError";

class NewCommentForm extends Component {
  state = {
    bodyInput: "",
    errorMsg: null,
    errorStatus: null
  };

  render() {
    const { loggedinuser } = this.props;
    const { errorMsg, errorStatus } = this.state;
    if (errorMsg)
      return <ShowError errorMsg={errorMsg} errorStatus={errorStatus} />;
    return loggedinuser ? (
      <form id="addCommentForm" onSubmit={this.handleSubmit}>
        <h5>Comment as {loggedinuser.username}</h5>
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
    addAComment(loggedinuser.username, bodyInput.trim(), article_id)
      .then(comment => {
        this.setState({ bodyInput: "" });
        refreshComments(comment);
        refreshCommentCount();
      })
      .catch(({ response: { data, status } }) => {
        this.setState({
          errorMsg: data.msg,
          errorStatus: status
        });
      });
  };
}

export default NewCommentForm;
