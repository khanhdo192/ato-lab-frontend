import Breadcrumb from '@/components/breadcrumb';
import BreadcrumbItem from '@/components/breadcrumbItem';
import BtnUp from '@/components/btnUp';
import CommonText from '@/components/commonText';
import Container from '@/components/container';
import ContainerCol4 from '@/components/containerCol_4';
import FeedbackMsg from '@/components/feedbackMsg';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { IcoSelectArrow, IcoSelectArrowUp } from '@/components/icons';
import InputSearch from '@/components/inputSearch';
import InputSelect from '@/components/inputSelect';
import Nav from '@/components/nav';
import OperatorTable from '@/components/operatorTable/operatorTable';
import Spinner from '@/components/spinner';
import TextH1 from '@/components/textH1';
import TextH2 from '@/components/textH2';
import UserThumb from '@/components/userThumb';
import { fetcher } from '@/lib/fetcher';
import useUser from '@/lib/useUser';
import 'jspdf-autotable';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import useSWR from 'swr';

export default function OperatorPage() {
  const { user } = useUser({ redirectTo: '/login' });
  const router = useRouter();
  const [operators, setOperators] = useState([]);
  const [operatorsFiltered, setOperatorsFiltered] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cantSelectMsg, setCantSelectMsg] = useState('');

  // filters
  const [productStatusData, setProductStatusData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [companyNameData, setCompanyNameData] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [versionData, setVersionData] = useState([]);
  const [componentData, setComponentData] = useState([]);

  // filter data
  const [productStatus, setProductStatus] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [component, setComponent] = useState('');
  const [vendor, setVendor] = useState('');
  const [version, setVersion] = useState('');
  const [country, setCountry] = useState('');
  const [operatorId, setOperatorId] = useState('');
  const [productVersion, setProductVersion] = useState('');
  const [email, setEmail] = useState('');
  const [productName, setProductName] = useState('');
  const [referenceNumbre, setReferenceNumbre] = useState('');
  const [operatorSelected, setOperatorSelected] = useState('');
  const [approvalDate, setApprovalDate] = useState('');
  const [complianceExpirationDate, setComplianceExpirationDate] = useState('');
  const [historicalRecords, setHistoricalRecors] = useState([]);

  const { data: dataOperators, error: errorOperators } = useSWR(
    '/jcb/operator',
    fetcher,
    { refreshInterval: 10000, dedupingInterval: 60000 * 60 }
  );

  const uniqueObjects = (arr, field) =>
    [...new Map(arr.map(item => [item[field], item[field]])).values()].filter(
      i => !!i
    );

  const switchProductStatus = element => {
    switch (element?.toString()) {
      case '1':
        return 'New Product';
      case '101':
        return 'Testing';
      case '102':
        return 'Results Submitted';
      case '203':
        return 'Reviewing Results';
      case '204':
        return 'Retest Requested';
      case '205':
        return 'Results Approved';
      case '301':
        return 'Compliance Letter Issued';
      case '302':
        return 'Compliance Expiring';
      case '303':
        return 'Compliance Expired';
      default:
        return 'Not Found';
    }
  };

  const switchAccountStatus = element => {
    switch (element?.toString()) {
      case '1':
        return 'New Operator';
      case '2':
        return 'Compliance Renewal';
      case '3':
        return 'New Protocol';
      case '4':
        return 'Re Certify';
      case '101':
        return 'Information Update';
      case '102':
        return 'Update Requested';
      case '201':
        return 'Access Approved';
      case '202':
        return 'Access Expiring';
      case '203':
        return 'Access Expired';
      case '204':
        return 'Access Rejected';
      case '205':
        return 'Renew Access Requested';
      case '301':
        return 'Account Closed';
      default:
        return 'Not Found';
    }
  };

  const switchLoaStatus = element => {
    switch (element?.toString()) {
      case '101':
        return 'LoA Valid';
      case '102':
        return 'LoA Expiring';
      case '103':
        return 'LoA Expired';
      default:
        return 'Not Found';
    }
  };

  const action = (arr, d, set, filter, field) => {
    if (d == '') {
      set(d);
      return arr;
    } else if (d) {
      set(d);
      return arr.filter(i => i[field] == d);
    } else if (filter) {
      return arr.filter(i => i[field] == filter);
    } else {
      return arr;
    }
  };

  const actionString = (arr, d, set, filter, field) => {
    if (d == '') {
      set(d);
      return arr;
    } else if (d || d == '') {
      set(d);
      return arr.filter(i =>
        i[field]
          ? i[field].toLowerCase().indexOf(d.toLowerCase()) !== -1
          : false
      );
    } else if (filter) {
      return arr.filter(i =>
        i[field]
          ? i[field].toLowerCase().indexOf(filter.toLowerCase()) !== -1
          : false
      );
    } else {
      return arr;
    }
  };
  const filter = [
    {
      name: 'productStatus',
      action: (arr, d) =>
        action(
          arr,
          d,
          i => setProductStatus(i),
          productStatus,
          'productStatus'
        ),
    },
    {
      name: 'companyName',
      action: (arr, d) =>
        action(arr, d, i => setCompanyName(i), companyName, 'companyName'),
    },
    {
      name: 'component',
      action: (arr, d) =>
        action(arr, d, i => setComponent(i), component, 'component'),
    },
    {
      name: 'operatorId',
      action: (arr, d) =>
        actionString(arr, d, i => setOperatorId(i), operatorId, 'operatorId'),
    },
    {
      name: 'vendor',
      action: (arr, d) => action(arr, d, i => setVendor(i), vendor, 'vendor'),
    },
    {
      name: 'productVersion',
      action: (arr, d) =>
        actionString(
          arr,
          d,
          i => setProductVersion(i),
          productVersion,
          'productVersion'
        ),
    },
    {
      name: 'email',
      action: (arr, d) =>
        actionString(arr, d, i => setEmail(i), email, 'email'),
    },
    {
      name: 'productName',
      action: (arr, d) =>
        actionString(
          arr,
          d,
          i => setProductName(i),
          productName,
          'productName'
        ),
    },
    {
      name: 'referenceNumbre',
      action: (arr, d) =>
        actionString(
          arr,
          d,
          i => setReferenceNumbre(i),
          referenceNumbre,
          'referenceNumbre'
        ),
    },
    {
      name: 'approvalDate',
      action: (arr, d) =>
        actionString(
          arr,
          d,
          i => setApprovalDate(i),
          approvalDate,
          'approvalDate'
        ),
    },
    {
      name: 'complianceExpirationDate',
      action: (arr, d) =>
        actionString(
          arr,
          d,
          i => setComplianceExpirationDate(i),
          complianceExpirationDate,
          'complianceExpirationDate'
        ),
    },
    {
      name: 'country',
      action: (arr, d) =>
        action(arr, d, i => setCountry(i), country, 'country'),
    },
    {
      name: 'version',
      action: (arr, d) =>
        action(arr, d, i => setVersion(i), version, 'version'),
    },
  ];

  const handleFilter = (fil, data) => {
    let newArr = operators;
    filter.forEach(element => {
      if (fil != element.name) newArr = element.action(newArr);
      else newArr = element.action(newArr, data);
    });
    setOperatorsFiltered(newArr);
  };
  const handleSubmit = () => {
    setProductStatus('');
    setCompanyName('');
    setComponent('');
    setVendor('');
    setVersion('');
    setCountry('');
    setOperatorId('');
    setProductVersion('');
    setEmail('');
    setProductName('');
    setReferenceNumbre('');
    setApprovalDate('');
    setComplianceExpirationDate('');
    setOperatorsFiltered(operators);
  };

  useEffect(() => {
    if (dataOperators && dataOperators?.result?.data) {
      const operatorData = [...dataOperators?.result?.data].reverse();
      setOperators(
        operatorData.map(
          ({
            productVersion,
            testScheduleFrom,
            testScheduleTo,
            launchDate,
            acquirerName,
            ...keepAttr
          }) => keepAttr
        )
      );
      setOperatorsFiltered(operatorData);
      setProductStatusData(uniqueObjects(operatorData, 'productStatus'));
      setCountryData(uniqueObjects(operatorData, 'country'));
      setCompanyNameData(uniqueObjects(operatorData, 'companyName'));
      setVendorData(uniqueObjects(operatorData, 'vendor'));
      setVersionData(uniqueObjects(operatorData, 'version'));
      setComponentData(uniqueObjects(operatorData, 'component'));
    }
    if (errorOperators) {
      setOperators([]);
      setErrorMsg('Error loading list');
      localStorage.setItem('isIdle', false);
      if (errorOperators?.response?.data?.rtnCode === '9897') {
        router.reload();
      }
    }
  }, [dataOperators, errorOperators]);

  let classIco = 'w-8 h-8 text-b-300 stroke-current';

  useEffect(() => {
    const fetchHistoricalRecords = async () => {
      try {
        if (!!operatorSelected) {
          const res = await fetcher(`/jcb/projectlog/${operatorSelected}`);
          if (!!res && !!res.result && res.rtnCode == '1') {
            const data = res.result.data.map(data => {
              data.version = undefined;
              data.productStatus = switchProductStatus(data.productStatus);
              data.loaStatus = switchLoaStatus(data.loaStatus);
              return data;
            });
            setHistoricalRecors(data);
          }
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.rtnCode === '9897') {
          router.push('/login');
        }
      }
    };

    fetchHistoricalRecords();
  }, [operatorSelected]);

  const recordsCSV = useMemo(() => {
    if (!!historicalRecords && historicalRecords.length > 0) {
      return historicalRecords.map((record, index) => {
        const {
          vendor,
          productName,
          productStatus,
          updateStatus,
          locApprovalDate,
          locExpirationDate,
          loaExpiration,
          loaStatus,
          referenceNumbre,
        } = record;

        return {
          no: index + 1,
          vendor,
          productName,
          productStatus,
          updateStatus,
          locApprovalDate,
          locExpirationDate,
          loaExpiration,
          loaStatus,
          referenceNumbre,
        };
      });
    }

    return [];
  }, [historicalRecords]);

  return (
    <main className="relative flex w-full min-h-screen 2xl:min-h-main m-auto max-w-1688 2xl:my-8 2xl:pl-8">
      <Nav
        status={isSideBarOpen}
        setStatus={setIsSideBarOpen}
        activeSection={'operators'}
      />
      <div className="section-operator relative z-0 p-2 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu py:0 lg:px-8">
        <Header setStatus={setIsSideBarOpen}>
          <Breadcrumb>
            <BreadcrumbItem
              isFirst
              label="Dashboard"
              fontSize="text-base"
              link="/dashboard"
            />
            <BreadcrumbItem label="Operator Management" fontSize="text-base" />
          </Breadcrumb>
          <UserThumb alt={!!user ? user?.fullName : ''} />
        </Header>
        <section>
          {errorMsg ? (
            <FeedbackMsg type="error" text={errorMsg} />
          ) : (
            <Container>
              <ContainerCol4 xtra="gap-4">
                <div className="flex items-center">
                  <CommonText xtra="mr-2 w-1/2 " text="Product Status" />
                  <InputSelect
                    onChange={e =>
                      handleFilter('productStatus', e.target.value)
                    }
                    xtra="w-1/2"
                    value={productStatus}
                  >
                    <option defaultValue="">Select Status</option>
                    {productStatusData.map((status, index) => (
                      <option value={status} key={`productStatus-${index}`}>
                        {switchProductStatus(status)}
                      </option>
                    ))}
                  </InputSelect>
                </div>
                <div className="flex items-center">
                  <CommonText xtra="mr-2 w-1/2" text="Operator Name" />
                  <InputSelect
                    onChange={e => handleFilter('companyName', e.target.value)}
                    xtra="w-1/2"
                    value={companyName}
                  >
                    <option defaultValue="">Select Operator</option>
                    {companyNameData.map((d, i) => (
                      <option defaultValue={d} key={`companyName-${i}`}>
                        {d}
                      </option>
                    ))}
                  </InputSelect>
                </div>
                <div className="flex items-center">
                  <CommonText xtra="mr-2 w-1/2" text="Component" />
                  <InputSelect
                    onChange={e => handleFilter('component', e.target.value)}
                    xtra="w-1/2"
                    value={component}
                  >
                    <option defaultValue="">Select Component</option>
                    {componentData.map((d, i) => (
                      <option defaultValue={d} key={`component-${i}`}>
                        {d}
                      </option>
                    ))}
                  </InputSelect>
                </div>
                <div className="flex items-center">
                  <CommonText xtra="mr-2 w-1/2" text="Operator ID" />
                  <InputSearch
                    onChange={e => handleFilter('operatorId', e.target.value)}
                    value={operatorId}
                    nonIcon
                    xtra="w-1/2"
                    placeholder="Enter ID"
                  />
                </div>
              </ContainerCol4>
              {active && (
                <>
                  <ContainerCol4 xtra="gap-4">
                    <div className="flex items-center">
                      <CommonText xtra="mr-2 w-1/2" text="Vendor" />
                      <InputSelect
                        onChange={e => handleFilter('vendor', e.target.value)}
                        xtra="w-1/2"
                        value={vendor}
                      >
                        <option defaultValue="">Select Vendor</option>
                        {vendorData.map((d, i) => (
                          <option defaultValue={d} key={`vendor-${i}`}>
                            {d}
                          </option>
                        ))}
                      </InputSelect>
                    </div>
                    <div className="flex items-center">
                      <CommonText xtra="mr-2 w-1/2" text="LoA No." />
                      <InputSearch
                        onChange={e =>
                          handleFilter('referenceNumbre', e.target.value)
                        }
                        nonIcon
                        xtra="w-1/2"
                        value={referenceNumbre}
                        placeholder="Enter LoA"
                      />
                    </div>
                    <div className="flex items-center">
                      <CommonText xtra="mr-2 w-1/2" text="Email" />
                      <InputSearch
                        onChange={e => handleFilter('email', e.target.value)}
                        nonIcon
                        xtra="w-1/2"
                        value={email}
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="flex items-center">
                      <CommonText xtra="mr-2 w-1/2" text="Product Name" />
                      <InputSearch
                        onChange={e =>
                          handleFilter('productName', e.target.value)
                        }
                        nonIcon
                        xtra="w-1/2"
                        value={productName}
                        placeholder="Enter Product"
                      />
                    </div>
                  </ContainerCol4>
                  <ContainerCol4 xtra="gap-4">
                    <div className="flex items-center">
                      <CommonText xtra="mr-2 w-1/2" text="Country" />
                      <InputSelect
                        onChange={e => handleFilter('country', e.target.value)}
                        xtra="w-1/2"
                        value={country}
                      >
                        <option defaultValue="">Select Country</option>
                        {countryData.map((d, i) => (
                          <option defaultValue={d} key={`country-${i}`}>
                            {d}
                          </option>
                        ))}
                      </InputSelect>
                    </div>
                    <div className="flex items-center">
                      <CommonText xtra="mr-2 w-1/2" text="Message Ver." />
                      <InputSelect
                        onChange={e => handleFilter('version', e.target.value)}
                        xtra="w-1/2"
                        value={version}
                      >
                        <option defaultValue="">Select Message</option>
                        {versionData.map((d, i) => (
                          <option defaultValue={d} key={`version-${i}`}>
                            {d}
                          </option>
                        ))}
                      </InputSelect>
                    </div>
                    <div className="flex items-center">
                      <CommonText xtra="mr-2 w-1/2" text="Approval Date " />
                      <input
                        type="date"
                        value={approvalDate}
                        onChange={e =>
                          handleFilter('approvalDate', e.target.value)
                        }
                        className="w-1/2 input placeholder-b-300 focus:border-b-300 leading-none"
                      />
                    </div>
                    <div className="flex items-center">
                      <CommonText
                        xtra="mr-2 w-1/2 leading-none"
                        text="Compliance Expiration Date"
                      />
                      <input
                        type="date"
                        value={complianceExpirationDate}
                        onChange={e =>
                          handleFilter(
                            'complianceExpirationDate',
                            e.target.value
                          )
                        }
                        className="w-1/2 input placeholder-b-300 focus:border-b-300 leading-none"
                      />
                    </div>
                  </ContainerCol4>
                </>
              )}
              <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between my-6 gap-4">
                <button
                  className="flex items-center rounded-md px-2"
                  onClick={() => setActive(!active)}
                >
                  <TextH2
                    text={`${
                      active ? 'Show less filters' : 'Show more filters'
                    }`}
                  />
                  {active ? (
                    <IcoSelectArrowUp className={classIco} />
                  ) : (
                    <IcoSelectArrow className={classIco} />
                  )}
                </button>
                <button
                  className="bg-b-300 hover:bg-b-500 text-sm leading-none rounded-lg text-white py-2.5 text-center"
                  style={{ width: '150px' }}
                  onClick={() => handleSubmit()}
                >
                  Clear filters
                </button>
              </div>
              {!!cantSelectMsg && (
                <div className="py-3 text-center bg-red-400 rounded-lg font-medium text-white mb-6">
                  <p>{cantSelectMsg}</p>
                </div>
              )}
              {operatorsFiltered ? (
                operatorsFiltered ? (
                  operatorsFiltered && (
                    <OperatorTable
                      operators={operatorsFiltered}
                      switchProductStatus={switchProductStatus}
                      switchLoaStatus={switchLoaStatus}
                      setOperatorSelected={setOperatorSelected}
                      operatorSelected={operatorSelected}
                      setCantSelectMsg={setCantSelectMsg}
                      switchAccountStatus={switchAccountStatus}
                    />
                  )
                ) : (
                  <TextH1 text="There are no 3DS test cards." />
                )
              ) : (
                <div className="animate-pulse mt-10 text-center">
                  <Spinner isLoading />
                </div>
              )}
              <div className="mt-10">
                <h1 className="text-xl mb-1 font-semibold tracking-wide">
                  Operator Historical Records
                </h1>
                <p className="text-lg mb-2">
                  All historical records for this Operator ID.
                </p>
                {!!historicalRecords && historicalRecords.length > 0 ? (
                  <div>
                    <div
                      className="overflow-y-auto overflow-x-auto"
                      style={{ maxHeight: '500px' }}
                    >
                      <table
                        className="table-auto w-full"
                        style={{ minWidth: '1200px' }}
                      >
                        <thead>
                          <tr className="bg-blue-900 text-sm">
                            <th className="text-center text-white font-medium  border-r border-gray-300 px-4">
                              No.
                            </th>
                            <th className="text-center text-white font-medium  border-r border-gray-300">
                              Vendor
                            </th>
                            <th className="text-center text-white font-medium  border-r border-gray-300">
                              Product Name
                            </th>
                            <th className="text-center text-white font-medium  border-r border-gray-300">
                              Product Status
                            </th>
                            <th className="text-center text-white font-medium  border-r border-gray-300">
                              Date of Status Update
                            </th>
                            <th className="text-center text-white font-medium  border-r border-gray-300">
                              JCB Approval Date
                            </th>
                            <th className="text-center text-white font-medium  border-r border-gray-300">
                              JCB Compliance Expiration
                            </th>
                            <th className="text-center text-white font-medium  border-r border-gray-300">
                              EMVCo LoA Expiration
                            </th>
                            <th className="text-center text-white font-medium  border-r border-gray-300">
                              EMVCo Loa Status
                            </th>
                            <th className="text-center text-white font-medium  ">
                              EMVCo Reference Number
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {historicalRecords.map((record, index) => {
                            return (
                              <tr
                                className={`${
                                  index % 2 == 0 ? 'bg-gray-50' : 'bg-gray-100'
                                } text-sm`}
                                key={`historical-${index}`}
                              >
                                <td className="text-center border-r border-gray-500 px-4 py-2">
                                  {index + 1}
                                </td>
                                <td className="text-center border-r border-gray-500 px-4 py-2">
                                  {record.vendor}
                                </td>
                                <td className="text-center border-r border-gray-500 px-4 py-2">
                                  {record.productName}
                                </td>
                                <td className="text-center border-r border-gray-500 px-4 py-2">
                                  {record.productStatus}
                                </td>
                                <td className="text-center border-r border-gray-500 px-4 py-2">
                                  {record.updateStatus?.replace('T', ' ')}
                                </td>
                                <td className="text-center border-r border-gray-500 px-4 py-2">
                                  {record.locApprovalDate}
                                </td>
                                <td className="text-center border-r border-gray-500 px-4 py-2">
                                  {record.locExpirationDate}
                                </td>
                                <td className="text-center border-r border-gray-500 px-4 py-2">
                                  {record.loaExpiration}
                                </td>
                                <td className="text-center border-r border-gray-500 px-4 py-2">
                                  {record.loaStatus}
                                </td>
                                <td className="text-center px-4 py-2">
                                  {record.referenceNumbre}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-end mt-10">
                      <CSVLink
                        data={recordsCSV}
                        headers={[
                          { label: 'No.', key: 'no' },
                          { label: 'Vendor', key: 'vendor' },
                          { label: 'Product Name', key: 'productName' },
                          { label: 'Product Status', key: 'productStatus' },
                          {
                            label: 'Date of Status Update',
                            key: 'updateStatus',
                          },
                          {
                            label: 'JCB Approval Date',
                            key: 'locApprovalDate',
                          },
                          {
                            label: 'JCB Compliance Expiration',
                            key: 'locExpirationDate',
                          },
                          {
                            label: 'EMVCo LoA Expiration',
                            key: 'loaExpiration',
                          },
                          { label: 'EMVCo Loa Status', key: 'loaStatus' },
                          {
                            label: 'EMVCo Reference Number',
                            key: 'referenceNumbre',
                          },
                        ]}
                        filename={`${operatorSelected}_historical_records_${
                          new Date().toISOString().split('T')[0]
                        }`}
                      >
                        <button className="bg-blue-600 text-white font-medium px-5 py-2 rounded-lg">
                          Export to Excel
                        </button>
                      </CSVLink>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <p className="font-medium text-xl">
                      The operator historical records is empty for now.
                    </p>
                  </div>
                )}
              </div>
            </Container>
          )}
        </section>
        <Footer />
        <BtnUp />
      </div>
    </main>
  );
}
