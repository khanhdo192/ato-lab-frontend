import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { postFetcher } from '@/lib/fetcher';
import { currJobState } from '@/helpers/getters';
import ModalMain from '@/components/modalMain';
import ModalContainer from '@/components/modalContainer';
import BtnPopClose from '@/components/btnPopClose';
import InputSearch from '@/components/inputSearch';
import FormItemCheckbox from '@/components/formItemCheckbox';
import SwitchFrontLabel from '../switchFrontLabel';
import TestSessionTable from '../testSessionTable.js';
import TestSessionTableDetails from '../testSessionTableDetails.js';
import { padLeft } from '@/helpers/fn';
import useSWR from 'swr';
import ProgressBar from '@/components/progressBar';
import ProgressStatus from '@/components/progressStatus';
import Container from '../container';
import TextH5 from '../textH5';
import BtnAction from '../btnAction';
import { useRouter } from 'next/router';

const filterAndCountResults = tests => {
  if (!tests || tests.length === 0)
    return {
      testResults: [],
      testsTotal: 0,
      testsPassed: 0,
      testsFailed: 0,
      testsNA: 0,
    };

  const newTestList = [tests[0]];
  tests.map(test => {
    if (newTestList.some(t => t.tcId == test.tcId)) return;
    else newTestList.push(test);
    return;
  });

  let testsPassed = 0;
  let testsFailed = 0;
  let testsNA = 0;
  newTestList.map(test => {
    switch (test.result) {
      case 'null':
        testsNA++;
        break;
      case '0':
        testsFailed++;
        break;
      case '1':
        testsPassed++;
        break;
    }
  });
  return {
    testResults: newTestList,
    testsTotal: newTestList.length,
    testsPassed: testsPassed,
    testsFailed: testsFailed,
    testsNA: testsNA,
  };
};

const draftTree = (trees, handlerChangeItemTree) => {
  const labelPass =
    trees.pass === 1 ? 'text-blue-400' : trees.pass === 0 ? 'text-red-500' : '';

  return (
    <FormItemCheckbox
      id={trees.id}
      label={trees.id}
      xtra="m-n pb-2.5"
      isChequed={trees.checked}
      onClick={() => handlerChangeItemTree(trees.id)}
      labelColor={labelPass}
    />
  );
};

export const getTestChecked = (trees, testChecked) => {
  trees.checked = testChecked.some(e => e == trees.id);
  return trees;
};

export default function ModalSelectTestCases({
  isOpen,
  closeModal,
  testSet,
  paginate,
  setPaginate,
  changeTestCaseId,
  setmodalRunning,
  setCurrentStatus,
  statusGeneralProcess,
  setStatusGeneralProcess,
  product,
  productFromDash,
  setIsOpenSummary,
  testSets,
  setTestSets,
  filterTree,
  setFilterTree,
  isSorted,
  setIsSorted,
  isLoading,
  setIsLoading,
  setIndexPaginate,
  setTestCase,
  setTestCaseId,
  testSetLength,
  modalRunning,
  currentStatus,
  statusId,
}) {
  const router = useRouter();
  const [favorites, setFavorites] = useState(null);
  const [activeFavorite, setActiveFavorite] = useState(null);

  const [filterDeviceChannel, setFilterDeviceChannel] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterSelectAll, setFilterSelectAll] = useState(false);

  const [showCreateFavModal, setShowCreateFavModal] = useState(false);
  const [showDeleteFavModal, setShowDeleteFavModal] = useState(false);

  const [limit, setLimit] = useState(2);
  const [buttonStopJob, setButtonStopJob] = useState(false);
  const [buttonExecuteJob, setButtonExecuteJob] = useState(false);
  const favoriteInputTextArea = useRef('');

  const [sortedBy, setSortedBy] = useState('');
  const [searchTestCase, setSearchTestCase] = useState('');
  const [hasAnyFilterBeenActivated, setHasAnyFilterBeenActivated] =
    useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState('');
  const [currTestSet, setCurrTestSet] = useState(
    testSets && testSets.length > 0
      ? {
          sessionId: padLeft(testSets.length - 1, 5),
          testSetId: testSets[0]?.id,
          createdTime: testSets[0]?.createdTime,
          testSetLength: testSets[0]?.testSetLength,
          ...filterAndCountResults(testSets[0]?.testCaseResults),
        }
      : { sessionId: '-', testSetId: '-', ...filterAndCountResults(null) }
  );
  const [testSetSortedBy, setTestSetSortedBy] = useState('');
  const [currTestSetResultSortedBy, setCurrTestSetResultSortedBy] =
    useState('');
  const [isOpenSubmitSession, setIsOpenSubmitSession] = useState(false);
  const [userTestSets, setUserTestSets] = useState([]);
  const [sessionSelected, setSessionSelected] = useState(null);

  const { data: dataTestList, error: errorTestList } = useSWR(
    '/tester/products/tc/getTestSetList',
    postFetcher({
      productId: product,
    }),
    { revalidateOnFocus: true }
  );

  useMemo(() => {
    if (dataTestList?.result) {
      if (dataTestList.rtnCode == '1') {
        const listTestSets = dataTestList.result.userTestSets
          .sort((a, b) => Date.parse(b.createdTime) - Date.parse(a.createdTime))
          .map((item, index) => {
            item.newSession =
              dataTestList.result.userTestSets.length - index - 1;
            return item;
          });
        setUserTestSets(listTestSets);
        setSessionSelected(
          !!dataTestList.result.userTestSets &&
            dataTestList.result.userTestSets.length > 0
            ? dataTestList.result.userTestSets[0].testCaseResults
            : []
        );
      }
    }
    if (errorTestList) {
      setUserTestSets([]);
    }
  }, [dataTestList, errorTestList]);

  const handlerChangeTestCase = ({ testCaseId, tcResultId, index }) => {
    if (!paginate.includes(testCaseId)) {
      const newPaginate = [...paginate, testCaseId];
      setPaginate(newPaginate);
      setFilterTree(
        cloneDeep(testSet).map(tree => getTestChecked(tree, newPaginate))
      );
    }
    setIndexPaginate(index);
    setSelectedTestCase(testCaseId);
    changeTestCaseId(testCaseId);
    setTestCaseId(testCaseId);
    setTestCase({
      id: testCaseId,
      testCaseResultId: tcResultId,
      sessionId: currTestSet?.sessionId,
    });
    closeModal();
  };

  const setCurrTestResults = list => {
    currTestSet.testResults = list;
    setCurrTestSet(currTestSet);
  };

  useEffect(() => {
    if (!paginate || paginate.length === 0) {
      setCurrTestSet({
        sessionId: '-',
        testSetId: '-',
        ...filterAndCountResults(null),
      });
      setSelectedTestCase(null);
    }
  }, [paginate]);

  const getTestList = useCallback(
    channel => {
      return testSet
        .filter(test => test.channel === channel)
        .map(item => item.id);
    },
    [testSet]
  );

  const DEVICE_TEST_CATEGOTY_3DS = {
    '00': getTestList('00'),
    '01': getTestList('01'),
    '02': getTestList('02'),
    '03': getTestList('03'),
  };

  const DEVICE_TEST_CATEGOTY_ACS = {
    '00': getTestList('00'),
    '01': getTestList('01'),
    '02': getTestList('02'),
    '03': getTestList('03'),
  };

  useEffect(() => setIsSorted(false), [isSorted]);

  const handlerChangeSearchTest = q => {
    let filteredTestCasesIds = [];

    if (q !== '') {
      filteredTestCasesIds = cloneDeep(testSet).filter(trees =>
        trees.id.includes(q)
      );

      filteredTestCasesIds =
        filteredTestCasesIds.length > 0 ? filteredTestCasesIds : [];
      setFilterTree(
        cloneDeep(testSet).filter(tree => filterTestsByQuery(tree, q))
      );
    } else {
      setFilterTree(cloneDeep(testSet).map(tree => getTestChecked(tree, [])));
    }

    setSearchTestCase(q);
    setPaginate(filteredTestCasesIds);
    changeTestCaseId(
      (filteredTestCasesIds.length > 0 && filteredTestCasesIds[0].id) || null
    );
  };

  const handlerChangeItemTree = testId => {
    const test = Object.values(filterTree).find(test => test.id == testId);
    let newPaginate;

    if (!test.checked) newPaginate = [...paginate, testId];
    else newPaginate = paginate.filter(t => t !== testId);

    if (!newPaginate || newPaginate.length === 0) {
      setIsLoading(true);
      changeTestCaseId(null);
    } else if (newPaginate.length === 1) {
      setIsLoading(true);
      changeTestCaseId(newPaginate[0]);
    }

    setPaginate(newPaginate);
    test.checked = !test.checked;
    Object.values(testSet).find(test => test.id == testId).checked =
      test.checked;

    setIsSorted(true);
  };

  const updateFavoritesTest = () => {
    try {
      const promise1 = postFetcher({ productId: product })(
        '/tester/products/tc/getProductFavorite'
      );

      promise1.then(result => {
        for (let i = 0; i < result.result.userTcList.length; i++) {
          result.result.userTcList[i].tcList =
            result.result.userTcList[i].tcList[0].split(',');
        }
        setFavorites(result.result.userTcList);
      });
    } catch (e) {
      if (e?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      console.warn(e);
    }
  };

  const filterTestsByQuery = (trees, query) => {
    trees.checked = trees.id.includes(query);
    return trees.id.includes(query);
  };

  const filterTests = (trees, testChecked, statuses) => {
    trees.checked =
      testChecked.some(e => e == trees.id) ||
      statuses.some(e => parseInt(e) == parseInt(trees.pass));
    return (
      testChecked.some(e => e == trees.id) ||
      statuses.some(e => parseInt(e) == parseInt(trees.pass))
    );
  };

  const handlerChangeFilterDevice = value => {
    if (filterDeviceChannel.some(e => e == value)) {
      setFilterDeviceChannel(filterDeviceChannel.filter(e => e != value));
      setFilterSelectAll(false);
    } else {
      setFilterDeviceChannel([...filterDeviceChannel, value]);
    }
    setHasAnyFilterBeenActivated(true);
  };

  const handlerChangeFilterStatus = value => {
    if (filterStatus.some(e => e == value)) {
      setFilterStatus(filterStatus.filter(e => e != value));
      setFilterSelectAll(false);
    } else {
      setFilterStatus([...filterStatus, value]);
    }
    setHasAnyFilterBeenActivated(true);
  };

  const handlerChangeSelectAll = () => {
    setFilterSelectAll(!filterSelectAll);
    setHasAnyFilterBeenActivated(true);
    if (filterSelectAll) {
      setFilterDeviceChannel([]);
      setFilterStatus([]);
    } else {
      console.log('henre');
      setFilterDeviceChannel(['00', '01', '02', '03']);
      setFilterStatus(['0', '1']);
    }
  };

  const jobLoad = async () => {
    const promise1 = await postFetcher({ productId: product })(
      '/tester/products/tc/job/load'
    );
    const runing = currJobState(promise1.result) == 'runing';
    setCurrentStatus(promise1.result.currJob);
    setmodalRunning(runing);

    return runing;
  };

  const executeJob = () => {
    try {
      setButtonExecuteJob(true);
      if (paginate.length === 0 || limit === 0)
        return setButtonExecuteJob(false);
      const promise1 = postFetcher({
        productId: product,
        testCaseIds: paginate,
        limit: limit,
      })('/tester/products/tc/job/execute');

      promise1.then(result => {
        setStatusGeneralProcess('runing');
        setButtonExecuteJob(false);
        setmodalRunning(true);
      });
    } catch (e) {
      console.warn(e);
      if (e?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      setButtonExecuteJob(false);
    }
  };

  const stopExecuteJob = () => {
    try {
      setButtonStopJob(true);
      const promise1 = postFetcher({
        productId: product,
      })('/tester/products/tc/job/stop');

      promise1.then(result => {
        setStatusGeneralProcess('finished');
        setButtonStopJob(false);
        setmodalRunning(false);
      });
    } catch (e) {
      if (e?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      console.warn(e);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    updateFavoritesTest();
    if (!hasAnyFilterBeenActivated) {
      return setFilterTree(
        cloneDeep(testSet).map(tree => getTestChecked(tree, paginate))
      );
    }

    const tcTree = cloneDeep(testSet);
    setSearchTestCase('');
    let testShouldBeChecked = [];

    if (
      filterDeviceChannel.length == 3 &&
      filterStatus.length == 2 &&
      !filterSelectAll
    ) {
      setFilterSelectAll(true);
    }

    if (filterDeviceChannel.length > 0 || filterStatus.length > 0) {
      if (productFromDash.productType === 'ACS')
        filterDeviceChannel.map(category => {
          testShouldBeChecked = [
            ...testShouldBeChecked,
            ...DEVICE_TEST_CATEGOTY_ACS[category],
          ].sort();
        });
      else
        filterDeviceChannel.map(category => {
          testShouldBeChecked = [
            ...testShouldBeChecked,
            ...DEVICE_TEST_CATEGOTY_3DS[category],
          ].sort();
        });
      const testsFilted = cloneDeep(testSet).filter(tree =>
        filterTests(tree, testShouldBeChecked, filterStatus)
      );

      setFilterTree(testsFilted);

      let filteredTestCasesIds = cloneDeep(testSet)
        .filter(
          trees =>
            testShouldBeChecked.some(id => id == trees.id) ||
            filterStatus.some(e => parseInt(e) == parseInt(trees.pass))
        )
        .map(trees => trees.id);

      setPaginate(filteredTestCasesIds);
      changeTestCaseId(
        filteredTestCasesIds.length > 0 ? filteredTestCasesIds[0] : null
      );
    } else {
      setPaginate([]);
      changeTestCaseId(null);
      setFilterTree(tcTree.map(tree => getTestChecked(tree, [])));
    }

    setHasAnyFilterBeenActivated(false);
  }, [filterDeviceChannel, filterStatus]);

  useEffect(() => {
    const promiseJobLoad = jobLoad();

    promiseJobLoad.then(runing => {
      if (runing) {
        const interval = setInterval(() => {
          const promiseInterval = jobLoad();

          promiseInterval.then(result => {
            if (!result) {
              setStatusGeneralProcess('finished');
              setmodalRunning(false);
              return clearInterval(interval);
            }
          });
        }, 3000);
      } else {
        setmodalRunning(false);
      }
    });

    if (statusGeneralProcess === 'finished') {
      const promise1 = postFetcher({ productId: product })(
        '/tester/products/tc/getTestSetList'
      );

      promise1
        .then(data => {
          setStatusGeneralProcess('available');
          setTestSets(
            data?.result?.userTestSets
              ? data.result.userTestSets.reverse().map((set, index) => {
                  set.session = index;
                  return set;
                })
              : null
          );
          closeModal();
          setIsOpenSummary(true);
        })
        .catch(error => {
          if (error?.response?.data?.rtnCode === '9897') {
            router.reload();
          }
        });

      return setmodalRunning(false);
    }
  }, [statusGeneralProcess]);

  const setSession = async id => {
    const session = userTestSets.find(test => test.id == id);
    setIsLoading(true);
    try {
      const res = await postFetcher({
        productId: product,
        testSetId: session.id,
      })('/tester/products/tc/getTcResultsByTestSetId');

      const testCaseResult = res?.result?.testCaseResults;

      setFilterTree(
        cloneDeep(testSet).filter(tree =>
          filterTests(
            tree,
            testCaseResult.map(test => test.tcId),
            filterStatus
          )
        )
      );
      let filteredTestCasesIds = cloneDeep(testSet)
        .filter(
          trees =>
            testCaseResult.map(test => test.tcId).some(id => id == trees.id) ||
            filterStatus.some(e => parseInt(e) == parseInt(trees.pass))
        )
        .map(trees => trees.id);

      setPaginate(filteredTestCasesIds);
      changeTestCaseId(
        filteredTestCasesIds.length > 0 ? filteredTestCasesIds[0] : null
      );
      setSessionSelected(testCaseResult);
      setIsLoading(false);
    } catch (e) {
      if (e?.response?.data?.rtnCode === '9897') {
        router.push('/login');
      }
      console.warn(e);
      setIsLoading(false);
      setPaginate([]);
      changeTestCaseId(null);
      setFilterTree(tcTree.map(tree => getTestChecked(tree, [])));
    }
  };

  const isDisabledButton =
    (statusId != 2 && statusId != 5) ||
    buttonExecuteJob ||
    paginate.length === 0;

  return (
    <ModalMain isOpen={isOpen}>
      <ModalContainer>
        <BtnPopClose onClick={closeModal} />
        <div className="h-full">
          <h1 className="font-semibold text-lg tracking-wide mb-7">
            Select Test Cases
          </h1>
          <div className="flex flex-wrap gap-4 lg:justify-between w-full lg:w-4/5">
            <SwitchFrontLabel
              label="ALL"
              xtra="m-n"
              isActive={filterSelectAll}
              onClick={handlerChangeSelectAll}
              isDisable={isLoading}
            />
            <SwitchFrontLabel
              label="APP"
              xtra="m-n"
              isActive={filterDeviceChannel.some(e => e == '01')}
              onClick={() => handlerChangeFilterDevice('01')}
              isDisable={isLoading}
            />
            <SwitchFrontLabel
              label="BRW"
              xtra="m-n"
              isActive={filterDeviceChannel.some(e => e == '02')}
              onClick={() => handlerChangeFilterDevice('02')}
              isDisable={isLoading}
            />
            <SwitchFrontLabel
              label="3RI"
              xtra="m-n"
              isActive={filterDeviceChannel.some(e => e == '03')}
              onClick={() => handlerChangeFilterDevice('03')}
              isDisable={isLoading}
            />
            <SwitchFrontLabel
              label="PASS"
              xtra="m-n"
              isActive={filterStatus.some(e => e == 1)}
              onClick={() => handlerChangeFilterStatus(1)}
              isDisable={isLoading}
            />
            <SwitchFrontLabel
              label="FAIL"
              xtra="m-n"
              isActive={filterStatus.some(e => e == 0)}
              onClick={() => handlerChangeFilterStatus(0)}
              isDisable={isLoading}
            />
          </div>
          <div className="overflow-x-auto overflow-y-hidden mt-7 pb-0.5">
            <div
              className="flex gap-6 justify-between"
              style={{ minWidth: '1280px' }}
            >
              <div style={{ width: '20%' }}>
                <InputSearch
                  placeholder="Search Test Case"
                  xtra="w-full mb-4 border-gray-400"
                  placeholderStyles="placeholder-black"
                  value={searchTestCase}
                  onChange={e => handlerChangeSearchTest(e.target.value)}
                />
                <div className="relative border border-gray-400 bg-white rounded-xl">
                  <div className="h-modal-test-lg overflow-y-auto overflow-x-hidden px-4 pt-4 pb-1.5">
                    {filterTree.map(tree =>
                      draftTree(tree, handlerChangeItemTree)
                    )}
                  </div>
                </div>
              </div>
              <div style={{ width: '35%' }}>
                <TestSessionTable
                  userTestSets={userTestSets}
                  setSession={setSession}
                />
              </div>
              <div style={{ width: '45%' }}>
                <TestSessionTableDetails
                  testCaseResults={sessionSelected}
                  handlerChangeTestCase={handlerChangeTestCase}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 mt-6 mb-3">
            <p className="font-medium">{paginate.length} test cases selected</p>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium">Concurrent Limit</p>
                <select
                  onChange={e => setLimit(e.target.value)}
                  className="border border-gray-400 bg-white py-2 px-4 rounded-lg"
                >
                  <option value={1}>1</option>
                  <option value={2} selected>
                    2
                  </option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
              <button
                onClick={() => executeJob()}
                className={`${
                  isDisabledButton ? 'bg-gray-400' : 'bg-blue-900'
                } text-white rounded-xl py-2 px-5`}
                disabled={true}
              >
                Execute {paginate.length}/{testSetLength}
              </button>
            </div>
          </div>
          {modalRunning && (
            <div className="fixed lg:absolute top-0 left-0 w-screen lg:w-full h-screen lg:h-full z-50">
              <Container xtra="h-full flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <TextH5
                    text="Executing All "
                    highliteText="Please be patient!"
                  />
                  <ProgressBar percentage={currentStatus.progress} />
                  <ProgressStatus
                    current={currentStatus.tcCount || 0}
                    from={paginate.length}
                  />
                </div>
                <BtnAction
                  label="Stop Executing"
                  ico="stop"
                  color="bg-r-400"
                  xtra="absolute bottom-4 lg:right-4"
                  onClick={() => stopExecuteJob()}
                  isDisable={buttonStopJob}
                />
              </Container>
            </div>
          )}
        </div>
      </ModalContainer>
    </ModalMain>
  );
}
