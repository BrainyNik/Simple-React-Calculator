import { useReducer } from "react";
import "./App.css";

const initialState = {
  prevExpression: "",
  currExpression: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "OPERATOR":
      // if current expression is empty don't allow
      if (!state.currExpression) {
        return {
          ...state,
        };
      } else {
        if (
          state.currExpression[state.currExpression.length - 1] === "+" ||
          state.currExpression[state.currExpression.length - 1] === "-" ||
          state.currExpression[state.currExpression.length - 1] === "*" ||
          state.currExpression[state.currExpression.length - 1] === "/"
        ) {
          return {
            ...state,
          };
        } else {
          let prev = state.currExpression;
          return {
            ...state,
            prevExpression: prev.concat(action.data),
            currExpression: "",
          };
        }
      }

    case "NUMBER":
      return {
        ...state,
        currExpression: state.currExpression.concat(action.data),
      };

    case "DELETE":
      return {
        ...state,
        currExpression: action.data.slice(0, -1),
      };

    case "ALL_CANCEL":
      return {
        ...state,
        prevExpression: "",
        currExpression: "",
      };

    case "EQUALS_TO":
      if (!action.data && !state.prevExpression) {
        return {
          ...state,
        };
      }
      else if (!action.data && state.prevExpression) {
        if (state.prevExpression.includes("=")) {

          const concat_exp = `${state.prevExpression}`;
          const sanitizedExp = concat_exp.replace(/[^-()\d/*+.]/g, "");
          
          
          return {
            ...state,
            currExpression: eval(sanitizedExp).toString(),
          };
        }
        else {
          return {
            ...state,
            prevExpression: "",
            currExpression:"",
          }
        }
      }
      else {
        if (state.prevExpression.includes("=")) {
          return {
            ...state,
          };
        }
        const concat_exp = `${state.prevExpression} ${action.data}`;
        const sanitizedExp = concat_exp.replace(/[^-()\d/*+.]/g, "");

        return {
          ...state,
          prevExpression: concat_exp.concat(" = "),
          currExpression: eval(sanitizedExp).toString(),
        };
      }

    case "DOT":
      if (!action.data) {
        return {
          ...state,
          currExpression: "0.",
        };
      } else {
        if (action.data.includes(".")) {
          return {
            ...state,
          };
        }
      }
      return {
        ...state,
        currExpression: action.data.concat("."),
      };

    case "PLUS_MINUS":
      break;

    default:
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const HandleNumbers = (e) => {
    dispatch({
      type: "NUMBER",
      data: e.target.innerText,
    });
  };

  const HandleDel = () => {
    dispatch({ type: "DELETE", data: state.currExpression });
  };

  const AllCancel = () => {
    dispatch({ type: "ALL_CANCEL" });
  };

  const HandleOp = (e) => {
    dispatch({
      type: "OPERATOR",
      data: e.target.innerText,
    });
  };

  const HandlePlusMinus = (e) => {};

  const HandleEql = (e) => {
    dispatch({
      type: "EQUALS_TO",
      data: state.currExpression,
    });
  };
  const HandleDot = () => {
    dispatch({ type: "DOT", data: state.currExpression });
  };
  // console.log(eval(""));

  return (
    <div className="App">
      <div className="calculator">
        <div className="head">
          <h1>Calculator</h1>
        </div>

        <div className="prev-operand operand">{state.prevExpression}</div>

        <div className="curr-operand operand">{state.currExpression}</div>

        <div className="btns">
          <div className="row-1">
            <button className="bg-grey" onClick={AllCancel}>
              AC
            </button>
            <button className="bg-grey" onClick={HandleDel}>
              DEL
            </button>
            <button className="bg-grey" onClick={HandlePlusMinus}>
              +/-
            </button>
            <button className="operator" onClick={HandleOp}>
              /
            </button>
          </div>
          <div className="row-2">
            <button onClick={HandleNumbers}>1</button>
            <button onClick={HandleNumbers}>2</button>
            <button onClick={HandleNumbers}>3</button>

            <button className="operator" onClick={HandleOp}>
              +
            </button>
          </div>
          <div className="row-3">
            <button onClick={HandleNumbers}>4</button>
            <button onClick={HandleNumbers}>5</button>
            <button onClick={HandleNumbers}>6</button>
            <button className="operator" onClick={HandleOp}>
              -
            </button>
          </div>

          <div className="row-4">
            <button onClick={HandleNumbers}>7</button>
            <button onClick={HandleNumbers}>8</button>
            <button onClick={HandleNumbers}>9</button>
            <button className="operator" onClick={HandleOp}>
              *
            </button>
          </div>

          <div className="row-5">
            <button className="zero-btn" onClick={HandleNumbers}>
              0
            </button>

            <button onClick={HandleDot}> . </button>
            <button className="operator" onClick={HandleEql}>
              {" "}
              ={" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
