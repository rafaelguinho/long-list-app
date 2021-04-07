import React, { useEffect, useState } from "react";
import {
  List,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";

const generateNames = (count) => {
  const temp = [];
  for (let i = 0; i <= count; i++) temp.push(`Test Name- ${i}`);
  return temp;
};

export const LongList = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    setNames(generateNames(300));
  }, []);

  const cache = new CellMeasurerCache({
    defaultWidth: 500,
    defaultHeight: 900,
  });

  const renderRow = ({ index, key, style, parent }) => {
    console.log(`rendered ${names[index]}`);
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={{ height: "200px" }}>
          Name is: {names[index]}
          <p>
            <img src="https://picsum.photos/200.webp" />
          </p>
        </div>
      </CellMeasurer>
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <List
              width={width}
              height={height}
              rowRenderer={renderRow}
              rowCount={names.length}
              rowHeight={cache.rowHeight}
              deferredMeasurementCache={cache}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
};

const ListItem = ({ name }) => {
  return (
    <div style={{ height: "200px" }}>
      Name is: {name}
      <p>
        <img src="https://picsum.photos/200.webp" />
      </p>
    </div>
  );
};
