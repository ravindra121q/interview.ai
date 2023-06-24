import axios from "axios";
import React, { useEffect, useState } from "react";
import { Timer } from "../Components/timer";

export const InterviewPage = () => {
  const API_KEY_Initial = "sk";
  const API_KEY = `${API_KEY_Initial}-TE2TIVj8Y2Bv3rOQcAsIT3BlbkFJw9967AOyibgmWNEifHEj`;
  const initialPrompt =
    " random 10 simple  questions related to javascript. The questions asked to the user and the user has to answer them. There is a timer to keep track of time. There is a question number also. The user has to answer the question in 2minutes and after replaying, it asks another question to user and after completion of 10 questions it ai gives feed back on the basis of answer and how user is confident and what special things it need to improve and gives score to the user.";
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState(initialPrompt);
  const [textInput, setTextInput] = useState("");
  const initialQuestion = localStorage.getItem("questions");
  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState(initialQuestion || []);
  const [answer, setAnswer] = useState([]);
  const [attempt, setAttempt] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: prompt,
          max_tokens: 150,
          temperature: 0.5,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const responseData = res.data.choices[0].text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line !== "");
        setResponse(responseData);
        localStorage.setItem("questions", JSON.stringify(responseData));
        setQuestion(localStorage.getItem("questions"));
      })

      .catch((error) => {
        setLoading(false);
        console.error("Error fetching response:", error);
      });
  }, [prompt]);
  const answerHandler = () => {
    const questions = JSON.parse(localStorage.getItem("questions"));
    console.log(textInput);
    setAnswer([...answer, textInput]);
    setTextInput("");
    console.log(answer);

    if (answer.length === 9) {
      let totalScore = 0;

      const newPrompt = `You are a teacher and you have been given the task of assigning marks to the students based on the given questions and answers.\n\nQuestions:\n${questions} and  answers:\n ${answer} \n\n.The total score is ${totalScore}/10. The feedback provided will motivate you to improve your performance.\n\nPlease wait while we calculate your score and provide feedback...`;

      axios
        .post(
          "https://api.openai.com/v1/engines/text-davinci-003/completions",
          {
            prompt: newPrompt,
            max_tokens: 150,
            temperature: 0.5,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          const score = res.data.choices[0].text;
          console.log(score);
          console.log(newPrompt);
          alert(score);
        })
        .catch((error) => {
          console.error("API request error:", error);
        });
    } else {
      setCount(count + 1);
    }
  };

  return (
    <div>
      {" "}
      <h1 className="font-bold mb-4">Interview Page</h1>
      <div style={{ display: attempt ? "none" : "block" }}>
        <div
          style={{
            width: "40%",
            margin: "auto",
            border: "1px solid black",
            borderRadius: "10px",
          }}
        >
          <h3 className="font-bold underline">Instructions</h3>

          <p>Don't Refresh the page</p>
          <p>You Have Only 1 Attempt Left</p>
          <p>Every Question has 2 minutes to be solved</p>
          <p>
            If you are not able to solve the question in 2 minutes then current
            answer will be skipped and you get zero mark
          </p>
          <button onClick={() => setAttempt(true)}>Start</button>
        </div>
      </div>
      <div style={{ display: attempt ? "block" : "none" }}>
        <h5 className="font-italic underline">
          Note:- You have Only two minutes to Solve a particular question
        </h5>
        <div className="border-black border-2 custom-width-39 mb-10">
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                {question.length > 0 ? (
                  <div className="flex flex-row justify-around">
                    <div>
                      {response[`${count}`]}
                      <div>
                        <Timer count={count} setCount={setCount} />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
          {question.length > 0 ? (
            <div className="mt-10">
              <div className="flex flex-row justify-center  gap-1">
                <input
                  type="text"
                  className="border-black border-2"
                  onChange={(e) => setTextInput(e.target.value)}
                />
                <button
                  className="border-black border-2 border-Radius-5"
                  onClick={answerHandler}
                  value={textInput}
                  disabled={count === 10}
                >
                  Submit
                </button>{" "}
              </div>
              <div className="mt-10 mb-10 justify-between">
                <button
                  className="border-1 border-r-8"
                  disabled={count === 9}
                  onClick={answerHandler}
                >
                  Next
                </button>
                {/* <button
                disabled={count === 0}
                onClick={() => setCount(count - 1)}
              >
                Previous
              </button> */}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
