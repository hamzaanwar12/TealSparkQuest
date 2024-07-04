import React, { useState } from "react";
import useFetchQuestions from "../hooks/useFetchQuestions";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
import { FaCommentSms } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { CiShare2 } from "react-icons/ci";

const getInstitute = (bise) =>
  bise.startsWith("LHR") ? "Lahore Board" : "Unknown Board";
const getGroupType = (type) => (type === "MCQ" ? "Objective" : "Subjective");
const getYearFromBISE = (bise) => bise.slice(-4);

const QuestionPaper = () => {
  const { questions, loading, error } = useFetchQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const year = currentQuestion.Year;
  const subject = currentQuestion.Subject;
  const bise = currentQuestion.BISE;
  const groupType = getGroupType(currentQuestion.Type);
  const institute = getInstitute(bise);
  const yearFromBISE = getYearFromBISE(bise);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleViewAll = () => {
    setViewAll(!viewAll);
  };

  // Function to get option number in format (i), (ii), (iii), (iv)
  const getOptionNumber = (index) => {
    const optionNumbers = ["(i)", "(ii)", "(iii)", "(iv)"];
    return optionNumbers[index];
  };

  return (
    <div className="flex flex-col md:flex-row justify-between w-[97%] mx-auto overflow-x-hidden">
      <div className="bg-white rounded-xl mt-[4%] min-w-[65%] p-[5px] m-[5px] box-border">
        <MathJaxContext>
          <h1 className="text-2xl py-[2px] font-bold border-b-2 border-[#394b5d] title">{`${year}th Class ${subject} Past Paper ${yearFromBISE} ${institute} Board Group ${groupType}`}</h1>
          <div className="question-paper">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-[#343a45]">
                  <th className="p-[10px] text-[14px] font-bold">Institute</th>
                  <td className="p-[10px] text-[14px]">{institute}</td>
                </tr>
                <tr className="border-[#343a45]">
                  <th className="p-[10px] text-[14px] font-bold">Grade</th>
                  <td className="p-[10px] text-[14px]">{`${year}th Class`}</td>
                </tr>
                <tr className="border-[#343a45]">
                  <th className="p-[10px] text-[14px] font-bold">Subject</th>
                  <td className="p-[10px] text-[14px]">{subject}</td>
                </tr>
                <tr className="border-[#343a45]">
                  <th className="p-[10px] text-[14px] font-bold">Year</th>
                  <td className="p-[10px] text-[14px]">{yearFromBISE}</td>
                </tr>
              </tbody>
            </table>
            {viewAll ? (
              <div className="mt-4 space-y-4">
                {questions.map((question, index) => (
                  <div key={index} className="question">
                    <h2 className="question-number text-lg font-semibold">
                      Question {index + 1}
                    </h2>
                    <MathJax dynamic className="mt-2 font-bold">
                      {question.Quest}
                    </MathJax>
                    <MathJax dynamic className="text-right font-bold mt-2">
                      {question.UQuest}
                    </MathJax>
                    <ul className="mt-4 space-y-2">
                      {["Op1", "Op2", "Op3", "Op4"].map(
                        (option, opIndex) =>
                          question[option] && (
                            <li
                              key={opIndex}
                              className="flex items-center justify-between"
                            >
                              <div className="flex">
                                <span className="font-bold">
                                  {getOptionNumber(opIndex)}{" "}
                                </span>
                                <MathJax dynamic>{question[option]}</MathJax>
                              </div>
                              <div className="flex">
                                {question["U" + option] && (
                                  <MathJax dynamic className="text-right">
                                    <span>
                                      {question["U" + option]}{" "}
                                      {getOptionNumber(opIndex)}
                                    </span>
                                  </MathJax>
                                )}
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4">
                <h2 className="question-number text-lg font-semibold">
                  Question {currentQuestionIndex + 1}
                </h2>
                <div className="flex justify-between mt-2">
                  <MathJax dynamic className="w-1/2 font-bold">
                    {currentQuestion.Quest}
                  </MathJax>
                  <MathJax dynamic className="w-1/2 text-right font-bold">
                    {currentQuestion.UQuest}
                  </MathJax>
                </div>
                <ul className="options mt-4 space-y-2">
                  {["Op1", "Op2", "Op3", "Op4"].map(
                    (option, opIndex) =>
                      currentQuestion[option] && (
                        <li
                          key={opIndex}
                          className="flex items-center justify-between"
                        >
                          <div className="flex">
                            <span>{getOptionNumber(opIndex)} </span>
                            <MathJax dynamic>{currentQuestion[option]}</MathJax>
                          </div>
                          <div className="flex">
                            {currentQuestion["U" + option] && (
                              <MathJax dynamic className="text-right">
                                <span>
                                  {currentQuestion["U" + option]}{" "}
                                  {getOptionNumber(opIndex)}
                                </span>
                              </MathJax>
                            )}
                          </div>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
            <div className="navigation-buttons flex flex-wrap justify-between mt-4">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="text-xl rounded-3xl py-2 px-4 border border-[#008000] text-[#000] disabled:bg-gray-400 disabled:text-white"
              >
                {"<< "}Back
              </button>
              <button
                onClick={handleViewAll}
                className="text-xl rounded-3xl py-2 px-4 border border-[#0263ca] text-[#000] disabled:bg-gray-400 disabled:text-white"
              >
                {viewAll ? "Single View" : "View List"}
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
                className="text-xl rounded-3xl py-2 px-4 border border-[#008000] text-[#000] disabled:bg-gray-400 disabled:text-white"
              >
                Next{" >>"}
              </button>
            </div>
          </div>
        </MathJaxContext>
      </div>

      <div className="block p-4 m-10 bg-white rounded-xl">
        <h1 className="font-bold border-b-2 border-red-500">
          FGSTUDY® - A Community Based Website:
        </h1>
        <p>
          FGStudy® team provide 100% original Exams Past Paper. Our image
          quality clear and very good. Easy to read and understand the question.
          FGStudy® is a Community based website. We need your support (Not
          Financial). Please Guide us what content or information your need. We
          can try to best provide the information as soon as possible. FGStudy®
          team always try to best performance. We always provide best unique and
          useful content’ for our respected members. Remember that FGStudy®
          website resources are very limited. We could not get grant for any
          government or Non government organization. If you found this page
          informative, share it now!
        </p>
        <div className="flex space-x-2 mt-4">
          <FaWhatsapp
            size="2.5em"
            className="rounded bg-green-600 text-white p-1"
          />
          <FaFacebook
            size="2.5em"
            className="rounded bg-blue-700 text-white p-1"
          />
          <FaTwitter
            size="2.5em"
            className="rounded bg-cyan-600 text-white p-1"
          />
          <FaCommentSms
            size="2.5em"
            className="rounded bg-green-400 text-white p-1"
          />
          <SiGmail size="2.5em" className="rounded bg-red-600 text-white p-1" />
          <CiShare2
            size="2.5em"
            className="rounded bg-blue-700 text-white p-1"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionPaper;
