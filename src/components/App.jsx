// import React from 'react';
// import Statistics from './Statistics/Statistics';
// import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
// import Section from './Section/Section';
// import Notification from './Notification/Notification';
// import PropTypes from 'prop-types';

// export class App extends React.Component {
//   static defaultProps = {
//     goodValue: 0,
//     neutralValue: 0,
//     badValue: 0,
//   };

//   static propTypes = {
//     goodValue: PropTypes.number.isRequired,
//     neutralValue: PropTypes.number.isRequired,
//     badValue: PropTypes.number.isRequired,
//   };

//   state = {
//     good: this.props.goodValue,
//     neutral: this.props.neutralValue,
//     bad: this.props.badValue,
//   };

//   onLeaveFeedback = option => {
//     this.setState(prevState => ({
//       ...prevState,
//       [option]: prevState[option] + 1,
//     }));
//   };

//   countTotalFeedback = () => {
//     const { good, neutral, bad } = this.state;
//     return good + neutral + bad;
//   };

//   countPositiveFeedbackPercentage = () => {
//     const { good } = this.state;
//     const total = this.countTotalFeedback();
//     if (total === 0) {
//       return 0;
//     }
//     return (good / total) * 100;
//   };

//   render() {
//     const options = ['good', 'neutral', 'bad'];
//     const total = this.countTotalFeedback();

//     return (
//       <>
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={options}
//             onLeaveFeedback={this.onLeaveFeedback}
//           />
//         </Section>

//         <Section title="Statistics">
//           {total === 0 ? (
//             <Notification message="There is no feedback" />
//           ) : (
//             <Statistics
//               good={this.state.good}
//               neutral={this.state.neutral}
//               bad={this.state.bad}
//               total={this.countTotalFeedback()}
//               positivePercentage={this.countPositiveFeedbackPercentage()}
//             />
//           )}
//         </Section>
//       </>
//     );
//   }
// }
import React, { useState , useEffect} from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

export default function App(){
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    
    const options = ['good', 'neutral', 'bad'];

   const onLeaveFeedback = (option) => {
    switch (option) {
      case 'good':
        setGood((prevGood) => prevGood + 1);
        break;
      case 'neutral':
        setNeutral((prevNeutral) => prevNeutral + 1);
        break;
      case 'bad':
        setBad((prevBad) => prevBad + 1);
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
    const countPositiveFeedbac = (good / total)* 100;
    setCountTotalFeedback(countPositiveFeedbac);
  }, [total, good]);
  
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={onLeaveFeedback}
          />
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

