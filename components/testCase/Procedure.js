import Divider from '@/components/divider';
import ProceduresItem from '@/components/proceduresItem';
import ContainerCol_3 from '@/components/containerCol_3';
import { useEffect, useState } from 'react';

export default function Procedure({ testCaseResults, testCaseId }) {
  const [steps, setSteps] = useState('');

  const stepsToArray = () => {
    let steps = testCaseResults?.testProcedure?.steps;
    if (!!steps) {
      steps = steps.filter(a => !(a.description.indexOf('STEP') != -1));
      steps = steps.map((step, index) => {
        step.step = index + 1;
        return step;
      });
    }

    setSteps(steps);
  };

  useEffect(() => {
    stepsToArray();
  }, [testCaseId]);

  const removeOrdinalNumbersSequence = text => {
    return text.replaceAll(
      /(\d{1,2}(?:st|nd|rd|th)+ message (?:index |index)|A sequence number is (?:skipped |skipped))/gi,
      ''
    );
  };

  const addLineBreakAtWordsStartedWithMiddleDashAndFinishedIn2Punts = text => {
    return removeOrdinalNumbersSequence(text).replaceAll(
      /[-]+ +(([a-zA-Z_0-9])|([a-zA-Z_0-9]+ +[a-zA-Z_0-9])|([a-zA-Z_0-9]+ +[a-zA-Z_0-9]+ +[a-zA-Z_0-9])|([a-zA-Z_0-9]+ +[a-zA-Z_0-9]+ +[a-zA-Z_0-9]+ +[a-zA-Z_0-9]))+:/gi,
      wordMatched => '\n' + wordMatched
    );
  };

  return (
    <div className="border border-gray-400 mb-3 lg:mb-6 p-7 pr-2 lg:p-7 lg:pr-3 bg-white rounded-xl">
      <div className="h-test scroll overflow-y-scroll overflow-x-hidden  box-border pr-4">
        {!testCaseId || !testCaseResults ? (
          <div className="text-center">
            <ProceduresItem title="Select a Test!" />
            <Divider />
          </div>
        ) : (
          <div>
            <ContainerCol_3 xtra={'grid-cols-2'}>
              <ProceduresItem title="TC ID" text={testCaseId} />
              <ProceduresItem
                title="Message Category"
                text={messageCategoryWordMapping(
                  testCaseResults?.testProcedure?.messageCategory
                )}
              />
              <ProceduresItem
                title="Channel"
                text={deviceChannelWordMapping(
                  testCaseResults?.testProcedure?.deviceChannel
                )}
              />
            </ContainerCol_3>

            <Divider />

            <ProceduresItem
              title="Test Objective"
              text={testCaseResults?.testProcedure?.testObjective}
            />
            <div className="text-gr-600 text-sm mb-4 mt-4">
              {!!steps &&
                steps?.map(step => {
                  return (
                    <div className="mb-5 ">
                      <Divider />
                      <p className="text-blue-500 font-semibold mb-3">
                        Step {step.step}
                      </p>
                      <div className="text-sm text-gr-600">
                        {addLineBreakAtWordsStartedWithMiddleDashAndFinishedIn2Punts(
                          step.description
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <Divider />

            <ProceduresItem
              title="Reference"
              text={testCaseResults?.testProcedure?.reference}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const messageCategoryWordMapping = word => {
  switch (word) {
    case '01':
      return '01-PA';
    case '02':
      return '02-NPA';
    default:
      return word;
  }
};

const deviceChannelWordMapping = word => {
  switch (word) {
    case '01':
      return '01-APP';
    case '02':
      return '02-BRW';
    case '03':
      return '03-3RI';
    default:
      return word;
  }
};
