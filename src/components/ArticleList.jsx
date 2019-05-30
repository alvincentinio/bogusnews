import React from "react";
import { Link } from "@reach/router";
import { formatDate } from "../utils/formatData";
import ArticleSortBy from "./ArticleSortBy";

const ArticleList = ({ articles, loggedinuser, handleSort }) => {
  return (
    <div>
      <ArticleSortBy handleSort={handleSort} />
      <ul className="cards">
        {articles.map(article => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              key={article.article_id}
              loggedinuser={loggedinuser}
            >
              <li className="articleCard">
                <h2>{article.title}</h2>
                <br />
                <h5>
                  By {article.author} @ {formatDate(article.created_at)}
                  <br /> in
                  <br />
                  the {article.topic} topic
                </h5>{" "}
                <br />
                Votes: {article.votes} Comments: {article.comment_count}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
