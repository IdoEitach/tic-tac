import React, { useState } from "react";
import "./Board.css";
import { hover } from "@testing-library/user-event/dist/hover";

function BordChange() {
  const bordSize: number = 3; //gives u option to change bord size(bord size is)
  const [board, setBord] = useState(
    new Array(bordSize).fill("").map(() => new Array(bordSize).fill(""), String)
  );

  const [isGameEnd, setGameEnd] = useState(false);
  const [isTie, setTie] = useState(false);
  const Player = {//choosing for type of players
    X: "X",
    O: "O",
  };
  const msgXWon = Player.X + " won";
  const msgOWon = Player.O + " won";
  const msgTie = "tie";

  const [isXTurn, setTurn] = useState(true);
  const [msg, setMsg] = useState("no one won yet");

  function isWon(row, coll, turn) {
    if (!isGameEnd) {
      for (let i = 0; i < bordSize; i++) {
        if (board[row][i] != turn) break;
        if (i == bordSize - 1) {
          if (turn == Player.X) {
            setMsg(msgXWon);
          } else {
            setMsg(msgOWon);
          }
          setGameEnd(true);
        }
      }

      for (let i = 0; i < bordSize; i++) {
        if (board[i][coll] != turn) break;
        if (i == bordSize - 1) {
          if (turn == Player.X) {
            setMsg(msgXWon);
          } else {
            setMsg(msgOWon);
          }
          setGameEnd(true);
        }
      }

      if (row == coll) {
        for (let i = 0; i < bordSize; i++) {
          if (board[i][i] != turn) break;
          if (i == bordSize - 1) {
            if (turn == Player.X) {
              setMsg(msgXWon);
            } else {
              setMsg(msgOWon);
            }
            setGameEnd(true);
          }
        }
      }

      if (row + coll == bordSize - 1) {
        for (let i = 0; i < bordSize; i++) {
          if (board[i][bordSize - 1 - i] != turn) break;
          if (i == bordSize - 1) {
            if (turn == Player.X) {
              setMsg(msgXWon);
            } else {
              setMsg(msgOWon);
            }
            setGameEnd(true);
          }
        }
      }
    }
  }

  function click(row: number, coll: number) {
    const bordToChange = [...board];

    if (!isGameEnd) {
      if (board[row][coll] == "") {
        if (isXTurn) {

          setTurn(false);
          bordToChange[row][coll] = Player.X;
          isWon(row, coll, Player.X);
        } else {

          setTurn(true);
          bordToChange[row][coll] = Player.O;
          isWon(row, coll, Player.O);
        }
        setBord(bordToChange);
        if (!board.some(row => row.includes(""))) {
          setTie(true);
          setMsg(msgTie);
        }
      }
    }
  }

  return (
    <div>
      {board.map((row, i) => (<div className="container">{row.map((cell, j) => (<button onClick={() => click(i, j)}>{cell}</button>))}</div>))}
      <div><h1>{msg}</h1></div>
    </div>
  );
}

export default BordChange;
