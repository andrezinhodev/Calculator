import React, { useState, useEffect } from "react";
import "./Calculator.css";

import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaDeleteLeft } from "react-icons/fa6";


const Calculator = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [pendingOperation, setPendingOperation] = useState(null);
  const [pendingValue, setPendingValue] = useState(null);
  const [completeOperation, setCompleteOperation] = useState("");

  const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operations = ["+", "-", "x", "÷"];

  const handleClick = (val) => {
    setCurrentValue((prevValue) => {
      if (prevValue === "0") {
        return val;
      } else {
        return prevValue + val;
      }
    });
    setCompleteOperation((prevOperation) => prevOperation + val);
  };

  const handleOperation = (operation) => {
    setCompleteOperation(`${currentValue} ${operation}`);
    setPendingOperation(operation);
    setPendingValue(currentValue);
    setCurrentValue("0");
  };

  const handleClear = () => {
    setCurrentValue("0");
    setPendingOperation(null);
    setPendingValue(null);
    setCompleteOperation(" ");
  };

  const handleCalculate = () => {
    if (!pendingOperation || !pendingValue) {
      return;
    }

    const num1 = parseFloat(pendingValue);
    const num2 = parseFloat(currentValue);

    let result;

    switch (pendingOperation) {
      case "+":
        result = num1 + num2;
        break;
      case "x":
        result = num1 * num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "÷":
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          setCurrentValue("Error");
          setCompleteOperation("Error");
          setPendingOperation(null);
          setPendingValue(null);
          return;
        }
        break;
      default:
        break;
    }

    setCompleteOperation(
      `${pendingValue} ${pendingOperation} ${currentValue} = ${result}`
    );
    setCurrentValue(result.toString());
    setPendingOperation(null);
    setPendingValue(null);
  };

  const handleDelete = () => {
    setCurrentValue((prevValue) => {
      if (prevValue.length === 1) {
        return "0";
      } else {
        return prevValue.slice(0, -1);
      }
    });
    setCompleteOperation((prevOperation) => prevOperation.slice(0, -1));
  };

  useEffect(() => {
    //    Função que vai capturar a tela pricionada
    const handleKeyDown = (event) => {
      if (!isNaN(parseInt(event.key))) {
        setCurrentValue((prevValue) =>
          prevValue === "0" ? event.key : prevValue + event.key
        );
        setCompleteOperation((prevOperation) => prevOperation + event.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentValue]);

  return (
    <div className="calculator">
      <div className="completeoperation">{completeOperation}</div>
      <div className="display">{currentValue}</div>
      <div className="buttons">
        <button className="buttonClear" onClick={handleClear}>
          AC
        </button>
        {keypadNumbers.map((num) => (
          <button key={num} onClick={() => handleClick(num)}>
            {num}
          </button>
        ))}
        {operations.map((operation) => (
          <button key={operation} onClick={() => handleOperation(operation)}>
            {operation}
          </button>
        ))}
        <button onClick={handleCalculate}>=</button>
        <button onClick={handleDelete}>
        <FaDeleteLeft />
        </button>
      </div>

      {/*REDES SOCIAIS*/}
      <div className="baseboard">
        <div className="icons">
          <a href="https://www.linkedin.com/in/andr%C3%A9-oliver-a20393261/">
            <FaLinkedin size={30} color="white" />
          </a>
          <a href="https://www.instagram.com/andregttr/">
            <RiInstagramFill size={30} color="white" />
          </a>
          <a href="https://github.com/andrezinhodev">
            <FaGithub size={30} color="white" />
          </a>
        </div>
      </div>
      <div className="credits">
        <span>@AndreDev</span>
      </div>
    </div>
  );
};

export default Calculator;
