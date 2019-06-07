import React from "react";
import { Link } from "@reach/router";

const SingleTopic = ({ topic }) => {
  return (
    <div>
      <li className="topicCard" key={topic.slug}>
        <h2>{topic.slug}</h2>
        <p>Description: {topic.description}</p>

        <button className="button">
          <Link to={`/topics/${topic.slug}/articles`}>
            View {topic.slug} articles
          </Link>
        </button>
      </li>
    </div>
  );
};

export default SingleTopic;
