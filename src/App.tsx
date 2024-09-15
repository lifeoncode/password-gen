import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import "./css/index.css";

const App = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCopied, setPasswordCopied] = useState(false);

  const handlePasswordCopy = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        console.log("Password copied");
        setPasswordCopied(true);
        setTimeout(() => {
          setPasswordCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy password: ", err);
        setPasswordCopied(false);
      });
  };

  const shuffleOrder = (str: string) => {
    const a: string[] = str.split(""),
      n = a.length;

    for (let i = n - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      const tmp: string = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  };

  const handleGeneratePassword = useCallback(() => {
    let newPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (symbolsAllowed) str += "~`!@#$%^&*()_+=|<>?,.[]{}";

    str = shuffleOrder(str);

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * passwordLength + 1);
      newPassword += str.charAt(randomIndex);
    }
    setPassword(newPassword);
  }, [passwordLength, numbersAllowed, symbolsAllowed]);

  useEffect(() => {
    handleGeneratePassword();
  }, [passwordLength, numbersAllowed, symbolsAllowed]);

  return (
    <div className="container">
      <h1>Password generator</h1>
      <div className="card">
        <div className="password-field">
          <span className="password">{password}</span>
          <FontAwesomeIcon
            icon={passwordCopied ? fas.faCopy : far.faCopy}
            onClick={handlePasswordCopy}
          />
        </div>
        <div className="numbers-and-symbols">
          <div>
            <input
              type="range"
              id="length"
              min="8"
              max="32"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
            />
            <label htmlFor="length">{passwordLength}</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="numbers"
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="symbols"
              onChange={() => setSymbolsAllowed((prev) => !prev)}
            />
            <label htmlFor="symbols">Symbols</label>
          </div>
        </div>
        <button onClick={handleGeneratePassword}>Generate password</button>
      </div>
    </div>
  );
};

export default App;
