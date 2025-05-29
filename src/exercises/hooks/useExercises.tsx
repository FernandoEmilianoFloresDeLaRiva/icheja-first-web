import { useEffect, useState } from "react";
import exercises from "../../../exercises.json";

export const useExercises = () => {
  const exerciseList = exercises[0].exercise;
  const [exercise, setExercise] = useState(exerciseList[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLastExercise, setIsLastExercise] = useState(false);
  const [isFirstExercise, setIsFirstExercise] = useState(true);

  useEffect(() => {
    setExercise(exerciseList[currentIndex]);
  }, [currentIndex, exerciseList]);

  const nextExercise = () => {
    if (currentIndex < exerciseList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFirstExercise(false);
      setIsLastExercise(currentIndex + 1 === exerciseList.length - 1);
    } else {
      setIsLastExercise(true);
    }
  };

  const previousExercise = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsLastExercise(false);
      setIsFirstExercise(currentIndex - 1 === 0);
    } else {
      setIsFirstExercise(true);
    }
  };

  return {
    chapter: exercises[0].chapter,
    subject: exercises[0].subject,
    exercise,
    previousExercise,
    nextExercise,
    isFirstExercise,
    isLastExercise,
  };
};
