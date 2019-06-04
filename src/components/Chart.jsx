import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { getArticles } from "../api";
import { navigate } from "@reach/router";
import loader from "../images/loader.gif";

class Chart extends Component {
  state = {
    articles: null,
    loading: true
  };

  componentDidMount() {
    getArticles({ sort_by: "votes" }).then(({ data }) => {
      this.setState({ articles: data.articles, loading: false });
    });
  }
  render() {
    const { loading } = this.state;
    return loading ? (
      <img alt="" src={loader} width="40px" />
    ) : (
      <div>
        <h4>Top Voted Articles</h4>
        <Doughnut
          onElementsClick={article => {
            this.navigatetoArticle(article);
          }}
          // height={300}
          data={this.populateData()}
        />
      </div>
    );
  }
  navigatetoArticle = article => {
    const { articles } = this.state;
    if (article.length !== 0) {
      const article_id = articles[article[0]["_index"]].article_id;
      navigate(`/articles/${article_id}`);
    }
  };

  populateData = () => {
    const { articles } = this.state;
    let labels = [];
    let articleids = [];
    let votes = [];
    for (let key in articles) {
      labels.push(articles[key].title);
      articleids.push(articles[key].article_id);
      votes.push(articles[key].votes);
    }

    const data = {
      labels: [
        "red",
        "orange",
        "yellow",
        "lime",
        "green",
        "cyan",
        "blue",
        "purple",
        "magenta",
        "grey"
      ],
      datasets: [
        {
          data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          articleids: [],
          backgroundColor: [
            "#e6194b",
            "#f58231",
            "#ffe119",
            "#bcf60c",
            "#3cb44b",
            "#46f0f0",
            "#4363d8",
            "#911eb4",
            "#f032e6",
            "#808080"
          ],
          hoverBackgroundColor: [
            "#d6dbe3",
            "#d6dbe3",
            "#d6dbe3",
            "#d6dbe3",
            "#d6dbe3",
            "#d6dbe3",
            "#d6dbe3",
            "#d6dbe3",
            "#d6dbe3",
            "#d6dbe3"
          ]
        }
      ]
    };
    data.labels = labels;
    data.datasets[0].articleids = articleids;
    data.datasets[0].data = votes;
    return data;
  };
}

export default Chart;
