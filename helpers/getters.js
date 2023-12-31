const currJobState = state => {
  const currJob = state.currJob;
  if (
    !currJob ||
    !currJob.hasOwnProperty('isRunning') ||
    !currJob.hasOwnProperty('result')
  ) {
    return 'available';
  }

  const exeResult = currJob.result.toLowerCase();
  if (
    !currJob.isRunning &&
    (exeResult == 'success' || exeResult == 'failure')
  ) {
    return 'finished';
  } else if (currJob.isRunning) {
    return 'runing';
  }
  return 'other';
};

export { currJobState };
