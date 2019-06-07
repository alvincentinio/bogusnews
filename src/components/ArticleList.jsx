import React from "react";
import { Link } from "@reach/router";
import { formatDate } from "../utils/formatData";
import ArticleSortBy from "./ArticleSortBy";

const ArticleList = ({ articles, loggedinuser, handleSort }) => {
  return (
    <div>
      <ArticleSortBy handleSort={handleSort} />
      <ul className="cardList">
        {articles.map(article => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              key={article.article_id}
              loggedinuser={loggedinuser}
            >
              <li className="articleCard">
                <h3>{article.title}</h3>
                <br />
                <h4>
                  by {article.author}
                  <br />@<br /> {formatDate(article.created_at)}
                  <br /> in the {article.topic} topic
                </h4>{" "}
                <br />
                <h5>Votes: {article.votes}</h5>
                <h6>Comments: {article.comment_count}</h6>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
