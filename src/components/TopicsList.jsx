import React from "react";
import SingleTopic from "./SingleTopic";

const TopicsList = ({ topics }) => {
  return (
    <div>
      <ul className="cards">
        {topics.map(topic => {
          return <SingleTopic key={topic.slug} topic={topic} />;
        })}
      </ul>
    </div>
  );
};

export default TopicsList;
