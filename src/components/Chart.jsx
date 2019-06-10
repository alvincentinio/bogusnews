import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { getArticles } from "../api";
import { navigate } from "@reach/router";
import loader from "../images/loader.gif";
import ShowError from "./ShowError";

class Chart extends Component {
  state = {
    articles: null,
    loading: true,
    errorMsg: null,
    errorStatus: null
  };

  componentDidMount() {
    getArticles({ sort_by: "votes" })
      .then(({ data }) => {
        this.setState({ articles: data.articles, loading: false });
      })
      .catch(({ response: { data, status } }) => {
        this.setState({
          errorMsg: data.msg,
          errorStatus: status,
          loading: false
        });
      });
  }
  render() {
    const legendOptions = {
      onClick: (event, article) => {
        this.navigateFromLegend(article.index);
      },
      onHover: (event, article) => {
        event.target.style.cursor = "pointer";
      }
    };
    const { loading, errorMsg, errorStatus } = this.state;
    if (errorMsg)
      return <ShowError errorMsg={errorMsg} errorStatus={errorStatus} />;
    return loading ? (
      <img alt="" src={loader} width="30px" />
    ) : (
      <div className="chart-container">
        <h4>Top Voted Articles</h4>
        <h6>Please Click on An Article To View</h6>
        <br />
        <Doughnut
          onElementsClick={article => {
            this.navigatetoArticle(article);
          }}
          data={this.populateData()}
          options={{
            maintainAspectRatio: true,
            responsive: true,
            cutoutPercentage: 40,
            legend: {
              position: "top",
              fullWidth: true,
              onClick: legendOptions.onClick,
              onHover: legendOptions.onHover,
              itemWrap: true,
              labels: {
                fontColor: "#191970",
                boxWidth: 10,
                fontSize: 12,
                fontStyle: "bold"
              }
            },
            layout: {
              padding: 6
            }
          }}
        />
      </div>
    );
  }
  navigateFromLegend = articleIndex => {
    const { articles } = this.state;
    const article_id = articles[articleIndex].article_id;
    navigate(`/articles/${article_id}`);
  };
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
            "#191970",
            "#191970",
            "#191970",
            "#191970",
            "#191970",
            "#191970",
            "#191970",
            "#191970",
            "#191970",
            "#191970"
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
