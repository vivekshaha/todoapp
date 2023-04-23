import React, { useEffect, useState } from "react";
import Todorow from "./Todorow";

const Todoapp = () => {
  const a = localStorage.getItem("todo");
  const b = localStorage.getItem("done");
  const data1 = JSON.parse(a);
  const data2 = JSON.parse(b);
  const [todo, setTodo] = useState(false);
  const [tododata, settodoData] = useState("");
  const [todolist, setTodoList] = useState(data1);
  const [donedata, setdonedata] = useState(data2);

  const removenull = (arr) => {
    return arr.filter((value) => value != null);
  };

  useEffect(() => {
    // const data = removenull(todolist);

    const newdata = JSON.stringify(todolist);
    localStorage.setItem("todo", newdata);
  }, [todolist]);
  useEffect(() => {
    // const data = removenull(donedata);

    const newdata = JSON.stringify(donedata);
    localStorage.setItem("done", newdata);
  }, [donedata]);

  const handletodo = () => {
    setTodo(!todo);
    settodoData("");
  };
  const handeltododata = (event) => {
    settodoData(event.target.value);
  };
  const handleList = () => {
    // console.log("vluse inside tododdat:", tododata);
    const newTodolist = [...todolist, tododata];
    // newTodolist.push(tododata);
    setTodoList(newTodolist);
    // console.log(todolist);
    setTodo(!todo);
    settodoData("");
  };
  const handletodolist = (data) => {
    const newdatalist = [...todolist];
    const index = newdatalist.indexOf(data);
    const newdonedata = [...donedata, data];
    // newdonedata.push(data);
    setdonedata(newdonedata);
    // console.log("index:", index);
    delete newdatalist[index];
    setTodoList(removenull(newdatalist));
  };
  const handeldonelist = (data) => {
    const newdatalist = [...donedata];
    const index = newdatalist.indexOf(data);
    delete newdatalist[index];
    const newdonedata = [...todolist, data];
    // newdonedata.push(data);
    setdonedata(removenull(newdatalist));
    // console.log("index:", index);
    setTodoList(newdonedata);
  };
  const handleremovedatatodo = (data) => {
    const newdatalist = [...todolist];
    const index = newdatalist.indexOf(data);
    // console.log("index:", index);
    delete newdatalist[index];
    setTodoList(removenull(newdatalist));
  };
  const handleremovedatadone = (data) => {
    const newdatalist = [...donedata];
    const index = newdatalist.indexOf(data);
    // console.log("index:", index);
    delete newdatalist[index];
    setdonedata(removenull(newdatalist));
  };

  return (
    <>
      <div className="bg-white">
        <h1 className="p-8 text-2xl font-bold border-b-2">Todo App</h1>
        <h1 className="p-4 text-xl font-bold">Things to get done</h1>
        <h1 className="p-4 text-lg">Things to do</h1>

        <div className="flex flex-col ">
          {todolist.map((data, index) => {
            return (
              <>
                {data && (
                  <Todorow
                    check={false}
                    key={index}
                    data={data}
                    todochnagefun={handletodolist}
                    removefun={handleremovedatatodo}
                  />
                )}
              </>
            );
          })}
        </div>
        {todo == false && (
          <button
            onClick={handletodo}
            className="p-1 font-bold text-white rounded-lg bg-primary"
          >
            + Add a todo
          </button>
        )}
        {todo && (
          <>
            <div className="p-5 m-2 rounded-md bg-gray-light">
              <h1 className="px-4 pb-2 text-lg">Things to do</h1>
              <div>
                <input
                  className="w-1/2 h-10 p-1 rounded-md focus:outline-primary"
                  type=" text"
                  value={tododata}
                  placeholder="write an article"
                  onChange={handeltododata}
                />
                <div className="mt-4">
                  <button
                    className="p-2 text-white rounded-md bg-primary"
                    onClick={handleList}
                  >
                    Save
                  </button>
                  <button
                    className="p-2 ml-4 bg-white rounded-md"
                    onClick={handletodo}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <h1 className="p-4 text-lg">Things done</h1>
        <div className="flex flex-col ">
          {donedata.map((data, index) => {
            return (
              <>
                {data && (
                  <Todorow
                    key={index}
                    data={data}
                    check={true}
                    // checked={false}
                    todochnagefun={handeldonelist}
                    removefun={handleremovedatadone}
                  />
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todoapp;
