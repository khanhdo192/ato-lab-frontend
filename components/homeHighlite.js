import HomeHighliteItem from '../components/homeHighliteItem';
import TextH1 from '../components/textH1';

export default function HomeHighlite({
  children,
  title,
  secondTitle,
  panelInfo,
  panelType,
}) {
  return (
    <div className="bg-b-800 rounded-2xl p-2 pt-4 mb-4 lg:mb-0">
      <div
        className={`grid ${
          panelType !== 'serverInfo' ? '' : 'grid-cols-2'
        } ml-2`}
      >
        <TextH1 color="text-white" text={title} />
        {secondTitle && <TextH1 color="text-white" text={secondTitle} />}
      </div>
      <div className="p-4 pt-4 bg-white rounded-lg">
        <div
          className={`grid ${
            panelType !== 'serverInfo' ? 'md:grid-cols-3' : 'md:grid-cols-2'
          } grid-cols-2 mb-3 gap-4 md:gap-8 lg:mt-4`}
        >
          {panelInfo && panelType === 'serverInfo' && (
            <>
              <HomeHighliteItem
                val={panelInfo?.threeDSTotal}
                label="Total Products"
              />
              <HomeHighliteItem
                val={panelInfo?.acsTotal}
                label="Total Products"
              />
              <HomeHighliteItem
                val={panelInfo?.threeDSStep1}
                label="Avg. STEP 1 Review Days"
              />
              <HomeHighliteItem
                val={panelInfo?.acsStep1}
                label="Avg. STEP 1 Review Days"
              />
              <HomeHighliteItem
                val={panelInfo?.threeDSStep2}
                label="Avg. STEP 2 Review Days"
              />
              <HomeHighliteItem
                val={panelInfo?.acsStep2}
                label="Avg. STEP 2 Review Days"
              />
            </>
          )}
          {panelInfo &&
            (panelType === 'serviceOverview' ||
              panelType === 'complianceOverview') &&
            Object.keys(panelInfo).map((key, index) => {
              const value = panelInfo[key];

              return (
                <HomeHighliteItem
                  key={`homeitem-${index}`}
                  val={value}
                  label={key}
                  subString={
                    key === 'Compliance Active' ? "Inc. Expiring JCB LoC's" : ''
                  }
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
