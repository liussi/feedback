import React, { useState, useEffect } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = ['good', 'neutral', 'bad'];

  const onLeaveFeedback = option => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        break;
    }
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = good + neutral + bad;
    setTotal(total);
  }, [good, neutral, bad]);

  const [countTotalFeedback, setCountTotalFeedback] = useState(0);

  useEffect(() => {
    const countPositiveFeedbac = (good / total) * 100;
    setCountTotalFeedback(countPositiveFeedbac);
  }, [total, good]);

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={countTotalFeedback}
          />
        )}
      </Section>
    </>
  );
}
