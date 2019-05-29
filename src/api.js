import axios from "axios";
const url = "https://alcrewe-news.herokuapp.com/api";
// const url = "https://localhost:9090/api";

export const getUser = username => {
  return axios
    .get(`${url}/users/${username}`)
    .then(({ data: { user } }) => {
      return user;
    })
    .catch(error => {
      console.log(error, "error");
    });
};
export const getUsers = () => {
  return axios.get(`${url}/users`).then(({ data: { users } }) => {
    return users;
  });
};
export const addAUser = (username, avatar_url, name) => {
  return axios
    .post(`${url}/users`, {
      username: `${username}`,
      avatar_url: `${avatar_url}`,
      name: `${name}`
    })
    .then(({ data: { user } }) => {
      return user;
    });
};
export const deleteAUser = user => {
  return axios
    .delete(`${url}/users`, {
      data: {
        username: `${user}`
      }
    })
    .then(res => {
      console.log("deleted user");
    });
};
export const getArticles = query => {
  console.log(query, "in api");
  return axios.get(`${url}/articles`, { params: query }).then(data => {
    return data;
  });
};

export const getArticle = id => {
  return axios.get(`${url}/articles/${id}`).then(({ data: { article } }) => {
    return article;
  });
};

export const submitArticle = (username, title, body, topic) => {
  return axios
    .post(`${url}/articles`, {
      username: `${username}`,
      title: `${title}`,
      body: `${body}`,
      topic: `${topic}`
    })
    .then(({ data: { article } }) => {
      return article;
    });
};

export const getComments = id => {
  return axios
    .get(`${url}/articles/${id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const getTopics = () => {
  return axios.get(`${url}/topics`).then(({ data: { topics } }) => {
    return topics;
  });
};

export const addATopic = (slug, description) => {
  return axios
    .post(`${url}/topics`, {
      slug: `${slug}`,
      description: `${description}`
    })
    .then(({ data: { topic } }) => {
      return topic;
    });
};
export const deleteATopic = slug => {
  return axios
    .delete(`${url}/topics`, {
      data: {
        slug: `${slug}`
      }
    })
    .then(res => {
      console.log("deleted topic");
    });
};

export const patchArticleVotes = (id, voteIncrement) => {
  return axios
    .patch(`${url}/articles/${id}`, { inc_votes: `${voteIncrement}` })
    .then(({ data: { article } }) => {
      return article;
    });
};

export const patchCommentVotes = (id, voteIncrement) => {
  return axios
    .patch(`${url}/comments/${id}`, { inc_votes: `${voteIncrement}` })
    .then(({ data: { comment } }) => {
      return comment;
    });
};
export const addAComment = (username, body, id) => {
  return axios
    .post(`${url}/articles/${id}/comments`, {
      username: `${username}`,
      body: `${body}`
    })
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const formatDate = date => {
  const newDate = new Date(date).toString();
  const back = newDate.slice(0, 15);
  const front = newDate.slice(16, 25);
  return front + " on " + back;
};

export const deleteAComment = commment_id => {
  return axios.delete(`${url}/comments/${commment_id}`).then(res => {});
};

export const deleteAnArticle = article_id => {
  console.log(article_id, "articleid in api");
  return axios.delete(`${url}/articles/${article_id}`).then(res => {
    console.log(res);
  });
};
