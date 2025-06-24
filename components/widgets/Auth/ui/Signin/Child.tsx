import React, { useEffect, useLayoutEffect, useState } from 'react';

const Child = (props) => {
  const [counter, setCounter] = useState(0);

  console.log('child');

  const handleCount = () => {
    setCounter(counter + 1);
  };
  useLayoutEffect(() => {
    console.log('layout');
    return () => {
      console.log('return Layout');
    };
  });
  useEffect(() => {
    console.log('effect');
    return () => {
      console.log('return effect');
    };
  });

  useEffect(() => {
    const data = counter * 2;
    console.log(data, props.input);
  }, [props.input]);

  return (
    <>
      <div>Child: {counter}</div>
      <button onClick={handleCount}>push</button>
    </>
  );
};

export default Child;
