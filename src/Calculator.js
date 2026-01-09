import React, { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator = () => {
    const [input, setInput] = useState("");

    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleClear = () => {
        setInput("");
    };

    const handleCalculate = () => {
        try {
            const result = eval(input);
            if (isNaN(result) || !isFinite(result)) {
                setInput("Error");
            } else {
                setInput(result.toString());
            }
        } catch {
            setInput("Error");
        }
    };

    // ✅ Keyboard input support
    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;

            if (!isNaN(key) || key === ".") {
                handleClick(key);
            } else if (["+", "-", "*", "/"].includes(key)) {
                handleClick(key);
            } else if (key === "Enter" || key === "=") {
                // 🔑 Enter acts as equal
                event.preventDefault(); // prevent form submission side effects
                handleCalculate();
            } else if (key === "Backspace") {
                setInput((prev) => prev.slice(0, -1));
            } else if (key.toLowerCase() === "c") {
                handleClear();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="calculator">
            <div className="display">{input || "0"}</div>
            <div className="buttons">
                <button className="clear" onClick={handleClear}>C</button>
                <button className="operator" onClick={() => handleClick("/")}>/</button>
                <button className="operator" onClick={() => handleClick("*")}>*</button>
                <button className="operator" onClick={() => handleClick("-")}>-</button>
                <button onClick={() => handleClick("7")}>7</button>
                <button onClick={() => handleClick("8")}>8</button>
                <button onClick={() => handleClick("9")}>9</button>
                <button className="operator" onClick={() => handleClick("+")}>+</button>
                <button onClick={() => handleClick("4")}>4</button>
                <button onClick={() => handleClick("5")}>5</button>
                <button onClick={() => handleClick("6")}>6</button>
                <button className="equal" onClick={handleCalculate}>=</button>
                <button onClick={() => handleClick("1")}>1</button>
                <button onClick={() => handleClick("2")}>2</button>
                <button onClick={() => handleClick("3")}>3</button>
                <button onClick={() => handleClick("0")}>0</button>
                <button onClick={() => handleClick(".")}>.</button>
            </div>
        </div>
    );
};

export default Calculator;