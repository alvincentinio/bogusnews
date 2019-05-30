import React from "react";
import { Link } from "@reach/router";
import { formatDate } from "../utils/formatData";
import ArticleSortBy from "./ArticleSortBy";

const TopicArticleList = ({ articles, loggedinuser, handleSort }) => {
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
              <li className="card">
                <div>
                  <p>
                    {article.title}
                    <br />
                    Written By {article.author} @{" "}
                    {formatDate(article.created_at)} in the {article.topic}{" "}
                    topic <br />
                    Votes: {article.votes} Comments: {article.comment_count}
                  </p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default TopicArticleList;
