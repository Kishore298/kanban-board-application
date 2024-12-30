import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import Task from "./Task";

function Column({ colIndex }) {
  // Predefined colors for columns
  const predefinedColors = [
    "bg-red-500",    // 1st column
    "bg-yellow-500", // 2nd column
    "bg-green-500",  // 3rd column
  ];

  const randomColors = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);

  const [color, setColor] = useState("");

  useEffect(() => {
    // Assign predefined colors to the first three columns or random colors to others
    if (colIndex < predefinedColors.length) {
      setColor(predefinedColors[colIndex]);
    } else {
      const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
      setColor(randomColor);
    }
  }, [colIndex]);

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData("text"));

    if (colIndex !== prevColIndex) {
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]"
    >
      {/* Column Header */}
      <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color}`} />
        {col.name} ({col.tasks.length})
      </p>

      {/* Tasks */}
      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
