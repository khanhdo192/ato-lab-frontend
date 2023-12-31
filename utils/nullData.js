export const nullDataTestResult = Array.from({ length: 20 }, () => ({
  id: null,
  testCaseId: null,
  protocol: null,
  runTime: null,
  channel: null,
  category: null,
  result: 'Null Data',
  waiverTesterComment: null,
  waiverJcbComment: null,
}));

export const nullDataTestSession = Array.from({ length: 20 }, () => ({
  id: null,
  createdTime: null,
  testSetLength: null,
  session: null,
}));

export const nullDataTestSessionDetail = Array.from({ length: 20 }, () => ({
  tcResultId: null,
  tcId: null,
  category: null,
  result: 'Null Data',
  channel: null,
}));
