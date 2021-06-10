import { useCallback, useState } from "react";
import "./styles.css";

export default function App() {
  const data = [
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 }
  ];

  const [bigData, setBigData] = useState(data);
  const [valueFour, setValueFour] = useState(0);
  const { onAddData, onDeleteData } = useEditData(bigData, setBigData);
  const onIncrement = useCallback(
    (item) => {
      var editedData = { id: item?.id, value: item?.value + 1 };
      const dataFinal = bigData?.map((item) =>
        item?.id !== editedData.id ? item : editedData
      );
      setBigData([...dataFinal]);
    },
    [bigData, setBigData]
  );
  const onDecrement = useCallback(
    (item) => {
      var editedData = { id: item?.id, value: item?.value - 1 };
      const dataFinal = bigData?.map((item) =>
        item?.id !== editedData.id ? item : editedData
      );
      setBigData([...dataFinal]);
    },
    [bigData, setBigData]
  );
  const { total } = useGetTotal(bigData, valueFour);
  return (
    <div className="App">
      {bigData?.map((item) => {
        return (
          <Counter
            key={item?.id}
            value={item?.value}
            onCounter={() => {
              onIncrement(item);
            }}
            onExtra={() => {
              onDecrement(item);
            }}
          />
        );
      })}
      <div className="section">
        <button onClick={onAddData} className="is-small">
          Add
        </button>
        <button onClick={onDeleteData} className="is-small">
          Delete
        </button>
      </div>
      <div className="section">
        <b>Component Four</b>
        <Counter
          setValue={setValueFour}
          value={valueFour}
          onExtra={() => {
            setValueFour(valueFour - 1);
          }}
          onCounter={() => {
            setValueFour(valueFour + 1);
          }}
        />
      </div>
      <div className="section">
        <b>Total: {total || 0}</b>
      </div>
    </div>
  );
}

function Counter({ value, onCounter, onExtra }) {
  return (
    <div className="counter">
      <b className="text">{value}</b>
      <div className="counter-controls">
        <button onClick={onExtra} className="button is-danger is-small">
          -
        </button>
        <button onClick={onCounter} className="button is-success is-small">
          +
        </button>
      </div>
    </div>
  );
}

const useEditData = (bigData, setBigData) => {
  const onAddData = useCallback(() => {
    setBigData([...bigData, { id: bigData?.length + 1, value: 0 }]);
  }, [setBigData, bigData]);
  const onDeleteData = useCallback(() => {
    setBigData(bigData.filter((element, index) => index < bigData.length - 1));
  }, [setBigData, bigData]);
  return { onAddData, onDeleteData };
};

const useGetTotal = (bigData, valueFour) => {
  var totalArray = 0;
  for (var i = 0; i < bigData?.length; i++) {
    totalArray += bigData[i]?.value;
  }
  const total = totalArray + valueFour;
  return { total };
};
