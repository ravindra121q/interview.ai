import axios from "axios";
import React, { useEffect, useState } from "react";
import { Timer } from "../Components/timer";

export const InterviewPage = () => {
  const Initialprompt =
    " random 10 simple questions related to javascript. The questions asked to the user and the user has to answer them. There is a timer to keep track of time. There is a question number also. The user has to answer the question in 2minutes and after replaying, it asks another question to user and after completion of 10 questions it ai gives feed back on the basis of answer and how user is confident and what special things it need to improve and gives score to the user.";
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState(Initialprompt);
  const [textInput, setTextInput] = useState("");
  const initialQuestion = localStorage.getItem("questions");
  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState(initialQuestion || []);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: prompt,
          max_tokens: 60,
          temperature: 0.5,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
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
    setAnswer([...answer, textInput]);
    console.log(answer.length);
    setTextInput("");
    if (answer.length === 9) {
      const newPrompt = `here are some questions and answers.questions are ${question} and answers are in array so starting from zero index ${answer} based on these questions and answers.Give score every question consists one mark.If the answer is short then 20 words or answer is empty give zero to that particular answer or if the answer is relevant to that particular question and something is correct give 0.25 to that particular answer and if the answer is almost 45% correct give 1.give score as output`;
      axios
        .post(
          "https://api.openai.com/v1/engines/text-davinci-003/completions",
          {
            prompt: prompt,
            max_tokens: 60,
            temperature: 0.5,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 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`,
            },
          }
        )
        .then((res) => {
          setLoading(false);

          console.log(answer);
          console.log(res.data.choices[0].text);
          alert(question, answer);
        });
    } else {
      return setCount(count + 1);
    }
  };
  return (
    <div>
      {" "}
      <h1>InterviewPage</h1>
      <h5 className="font-italic underline">
        Note:- You have Only two minutes to Solve a particular question
      </h5>
      <div className="border-black border-2 custom-width-39 mb-10">
        <div>
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
              >
                Submit
              </button>{" "}
            </div>
            <div className="mt-10 mb-10 justify-between">
              <button
                className="border-1 border-r-8"
                disabled={count === 9}
                onClick={() => setCount(count + 1)}
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
  );
};
