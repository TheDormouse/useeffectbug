"use client";
import { useEffect, useState } from "react";

export const SomeComponent = () => {
  const [runs, setRuns] = useState(0);
  // Notice that the value of runs is set to 1 on page load, however there are 2 logs of "Use Effect Run" in the console.
  useEffect(() => {
    setRuns(runs + 1);
    console.log("Use effect run");
  }, []);

  return <p>Client rendered {runs} times </p>;
};
