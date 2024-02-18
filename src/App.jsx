import Die from "./Die";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  function allNewDice() {
    let dieArr = [];
    for (let i = 0; i < 10; i++) {
      const die = Math.floor(Math.random() * 6) + 1;
      dieArr.push({
        value: die,
        isHeld: false,
        key: nanoid(),
      });
    }
    return dieArr;
  }

  useEffect(() => {
    const heldDice = dice.filter((die) => die.isHeld);
    const allHeldDiceAreTheSame = heldDice.every(
      (die, i, arr) => die.value === arr[0].value
    );
    if (allHeldDiceAreTheSame && heldDice.length === 10) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [dice]);

  const diceElements = dice.map((die) => {
    return (
      <Die
        holdDice={() => holdDice(die.key)}
        value={die.value}
        key={die.key}
        isHeld={die.isHeld}
      />
    );
  });

  function handleRoll() {
    if (tenzies) {
      setDice(allNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.floor(Math.random() * 6) + 1 };
        })
      );
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.key === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{diceElements}</div>

      <button onClick={handleRoll} className="roll-button">
        {tenzies ? "New game" : "Roll"}
        {tenzies ? <Confetti /> : null}
        {/* {tenzies ? setDice(allNewDice()) : null} */}
      </button>
    </main>
  );
}
