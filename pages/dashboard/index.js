import Breadcrumb from '@/components/breadcrumb';
import BreadcrumbItem from '@/components/breadcrumbItem';
import BtnAction from '@/components/btnAction';
import BtnTableTitle from '@/components/btnTableTitle';
import BtnUp from '@/components/btnUp';
import Container from '@/components/container';
import Divider from '@/components/divider';
import FeedbackMsg from '@/components/feedbackMsg';
import Footer from '@/components/footer';
import Header from '@/components/header';
import HomeHighlite from '@/components/homeHighlite';
import HomeTableRow from '@/components/homeTableRow';
import { IcoArwPull, IcoSearch, IcoSubmitted } from '@/components/icons';
import InputSelect from '@/components/inputSelect';
import Nav from '@/components/nav';
import Spinner from '@/components/spinner';
import TablePaginate from '@/components/tablePaginate';
import TextH1 from '@/components/textH1';
import TextH2 from '@/components/textH2';
import TextH3 from '@/components/textH3';
import UserThumb from '@/components/userThumb';
import { fetcher } from '@/lib/fetcher';
import useUser from '@/lib/useUser';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import toString from 'lodash/toString';
import upperCase from 'lodash/upperCase';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CSVLink } from 'react-csv';
import useSWR from 'swr';

export default function DashboardPage() {
  const { user } = useUser({ redirectTo: '/login' });
  const router = useRouter();

  const defaultInfo = {
    serverInfo: {
      threeDSTotal: 0,
      acsTotal: 0,
      threeDSStep1: 0,
      acsStep1: 0,
      threeDSStep2: 0,
      acsStep2: 0,
    },
    serviceOverview: {
      'New Operators': 0,
      Testing: 0,
      'Access Expiring': 0,
      'Information Update': 0,
      'Results Submited': 0,
      'Access Expired': 0,
      'New Protocol': 0,
      'Reviewing Results': 0,
      'Compliance Renewal': 0,
    },
    threeDSCompliance: {
      'Compliance Active': 0,
      'Compliance Expiring': 0,
      'Compliance Expired': 0,
    },
    acsCompliance: {
      'Compliance Active': 0,
      'Compliance Expiring': 0,
      'Compliance Expired': 0,
    },
  };

  const [panelInfo, setPanelInfo] = useState(defaultInfo);
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [start, setStart] = useState(0);
  const [filterStr, setFilterStr] = useState('');

  const listProduct = products
    ? products.slice(start, start + itemPerPage)
    : [];
  const [listFiltered, setListFiltered] = useState(null);

  const [sortedBy, setSortedBy] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [tableCurrentItem, setTableCurrentItem] = useState('');

  const [busy, setBusy] = useState(true);

  const { data, error } = useSWR('/jcb/dashboard', fetcher);

  useEffect(() => {
    if (error) {
      setErrorMsg('Error loading list');
      localStorage.setItem('isIdle', false);
      if (error?.response?.data?.rtnCode === '9897') {
        router.reload();
      }
    }
  }, [error]);

  useMemo(() => {
    setBusy(!data);

    const serviceOverview = {
      'New Operators': 0,
      Testing: 0,
      'Access Expiring': 0,
      'Information Update': 0,
      'Results Submited': 0,
      'Access Expired': 0,
      'New Protocol': 0,
      'Reviewing Results': 0,
      'Compliance Renewal': 0,
    };

    const serverInfo = {
      threeDSTotal: 0,
      acsTotal: 0,
      threeDSStep1: 0,
      acsStep1: 0,
      threeDSStep2: 0,
      acsStep2: 0,
    };

    const threeDSCompliance = {
      'Compliance Active': 0,
      'Compliance Expiring': 0,
      'Compliance Expired': 0,
    };

    const acsCompliance = {
      'Compliance Active': 0,
      'Compliance Expiring': 0,
      'Compliance Expired': 0,
    };

    if (data && data?.result?.data) {
      const productFilter = data.result.data;
      setProducts(handleSortDefault(productFilter, 'createDate'));

      productFilter.map(p => {
        switch (toString(p?.productStatus)) {
          case '2':
            serviceOverview['Testing'] = serviceOverview['Testing'] + 1;
            break;
          case '3':
            serviceOverview['Results Submited'] =
              serviceOverview['Results Submited'] + 1;
            break;
          case '4':
            serviceOverview['Reviewing Results'] =
              serviceOverview['Reviewing Results'] + 1;
            break;
        }

        switch (toString(p?.operatorStatus)) {
          case '1':
            serviceOverview['New Operators'] =
              serviceOverview['New Operators'] + 1;
            break;
          case '2':
            serviceOverview['Compliance Renewal'] =
              serviceOverview['Compliance Renewal'] + 1;
            break;
          case '3':
            serviceOverview['New Protocol'] =
              serviceOverview['New Protocol'] + 1;
            break;
          case '101':
            serviceOverview['Information Update'] =
              serviceOverview['Information Update'] + 1;
            break;
          case '202':
            serviceOverview['Access Expiring'] =
              serviceOverview['Access Expiring'] + 1;
            break;
          case '203':
            serviceOverview['Access Expired'] =
              serviceOverview['Access Expired'] + 1;
            break;
        }

        if (p?.productType === '3DS') {
          serverInfo.threeDSTotal = serverInfo.threeDSTotal + 1;
          switch (toString(p?.productStatus)) {
            case '7':
              threeDSCompliance['Compliance Active'] =
                threeDSCompliance['Compliance Active'] + 1;
              break;
            case '8':
              threeDSCompliance['Compliance Expiring'] =
                threeDSCompliance['Compliance Expiring'] + 1;
              break;
            case '9':
              threeDSCompliance['Compliance Expired'] =
                threeDSCompliance['Compliance Expired'] + 1;
              break;
          }
        }

        if (p?.productType === 'ACS') {
          serverInfo.acsTotal = serverInfo.acsTotal + 1;
          switch (toString(p?.productStatus)) {
            case '7':
              acsCompliance['Compliance Active'] =
                acsCompliance['Compliance Active'] + 1;
              break;
            case '8':
              acsCompliance['Compliance Expiring'] =
                acsCompliance['Compliance Expiring'] + 1;
              break;
            case '9':
              acsCompliance['Compliance Expired'] =
                acsCompliance['Compliance Expired'] + 1;
              break;
          }
        }
      });

      setIsSorted(true);
    }

    if (data && data?.result?.avg_sla && data?.result?.data) {
      serverInfo.acsStep1 =
        data?.result?.avg_sla?.['ACSReview Product Information'] || 0;
      serverInfo.acsStep2 =
        data?.result?.avg_sla?.['ACSConfidence Test Review'] || 0;
      serverInfo.threeDSStep1 =
        data?.result?.avg_sla?.['3DSReview Product Information'] || 0;
      serverInfo.threeDSStep2 =
        data?.result?.avg_sla?.['3DSConfidence Test Review'] || 0;

      setPanelInfo({
        serverInfo,
        serviceOverview,
        threeDSCompliance,
        acsCompliance,
      });
    }
  }, [data, error]);

  useEffect(() => setIsSorted(false), [isSorted]);

  const paginationHandler = ({ selected }) => {
    setPage(selected);
    setStart(selected * itemPerPage);
    // window.scrollTo(0, 500);
  };

  const handleItemPerPage = value => {
    setItemPerPage(parseInt(!value.match('all') ? value : products.length), 10);
    setPage(0);
    setStart(0);
  };

  function handleSortBy(value) {
    if (sortedBy === value) {
      setProducts(products.reverse());
    } else {
      setSortedBy(value);
      if (value !== 'createDate') {
        setProducts(
          products.sort((a, b) =>
            upperCase(a[value]) >= upperCase(b[value]) ? 1 : -1
          )
        );
      } else {
        setProducts(products.sort((a, b) => (a[value] >= b[value] ? 1 : -1)));
      }
    }
    setIsSorted(true);
  }

  function handleSortDefault(products, value) {
    setSortedBy(value);
    return products && value.match('createDate')
      ? [...products.sort((a, b) => (a[value] >= b[value] ? -1 : 1))]
      : [...products.sort((a, b) => (a[value] >= b[value] ? 1 : -1))];
  }

  function filterList(value) {
    setFilterStr(value);
    setListFiltered(
      products.filter(
        item =>
          upperCase(item?.productName).includes(upperCase(value)) ||
          upperCase(item?.companyName).includes(upperCase(value)) ||
          upperCase(item?.productType).includes(upperCase(value)) ||
          upperCase(item?.protocolVersion).includes(upperCase(value)) ||
          // upperCase(item.trackingNumber).includes(upperCase(value)) ||
          upperCase(item?.productStatusName).includes(upperCase(value)) ||
          upperCase(item?.operatorStatusName).includes(upperCase(value)) ||
          upperCase(item?.createDate).includes(upperCase(value)) ||
          upperCase(item?.owner).includes(upperCase(value))
      )
    );
  }

  function exportPDF() {
    const unit = 'pt';
    const size = 'A1';
    const orientation = 'portrait';

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);

    const headers = [
      Object.keys(products[0])
        .filter(
          e =>
            e !== 'productId' &&
            e !== 'activate' &&
            e !== 'statusLabel' &&
            e !== 'color' &&
            e !== 'iteration'
        )
        .map(e => e),
    ];
    const body = products?.map((product, index) => Object.values(product));

    doc.autoTable({ body });
    doc.save('products.pdf');
  }

  function showCopyModal() {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1800);
  }

  return (
    <main className="relative flex w-full min-h-screen 2xl:min-h-main m-auto max-w-1688 2xl:my-8 2xl:pl-8">
      <Nav
        status={isSideBarOpen}
        setStatus={setIsSideBarOpen}
        activeSection={'home'}
      />
      <div className="relative z-0 w-full p-2 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu py:0 lg:px-8">
        <Header setStatus={setIsSideBarOpen}>
          <Breadcrumb>
            <BreadcrumbItem isFirst label="DASHBOARD" fontSize="text-base" />
            <BreadcrumbItem label="HOME" fontSize="text-base" />
          </Breadcrumb>
          <UserThumb alt={!!user ? user?.fullName : ''} />
        </Header>
        <section>
          <div className="grid lg:grid-cols-2 lg:gap-4 lg:mb-4">
            <HomeHighlite
              title="3DS Servers"
              secondTitle="ACS"
              panelInfo={panelInfo.serverInfo}
              panelType="serverInfo"
            />
            <HomeHighlite
              title="Service Overview"
              panelInfo={panelInfo.serviceOverview}
              panelType="serviceOverview"
            />
            <HomeHighlite
              title="3DS Server Compliance Overview"
              panelInfo={panelInfo.threeDSCompliance}
              panelType="complianceOverview"
            />
            <HomeHighlite
              title="ACS Compliance Overview"
              panelInfo={panelInfo.acsCompliance}
              panelType="complianceOverview"
            />
          </div>
          {errorMsg ? (
            <FeedbackMsg type="error" text={errorMsg} />
          ) : (
            <Container>
              <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center">
                <div>
                  <TextH1 text="All 3DS Products" />
                  <TextH2
                    text="Copy or Export data to CSV, PDF & Print"
                    style="-mt-1"
                    isInfo
                  />
                </div>
                <Divider style="lg:hidden" />
                <div className="flex justify-between flex-wrap gap-4">
                  <CopyToClipboard
                    text={products?.map((product, index) =>
                      Object.values(product)
                    )}
                  >
                    <div className="relative" onClick={() => showCopyModal()}>
                      <BtnAction
                        ico="copy"
                        color="bg-y-400"
                        buttonStyle="bg-y-400"
                        colorLabel="text-white"
                        label="Copy"
                      />
                      {showModal && (
                        <div className="absolute bg-black flex flex-1 leading-0 p-2 rounded-lg text-sm text-white left-3 -top-10 animate-bounce">
                          <div className="bg-black h-3 absolute left-1/3 right-4 rotate-45 transform w-3 top-7"></div>
                          <IcoSubmitted className="w-3 h-4 text-g-400 fill-current mr-1 mt-0" />
                          <p>Done!</p>
                        </div>
                      )}
                    </div>
                  </CopyToClipboard>
                  <CSVLink
                    data={
                      products
                        ? products.map(
                            ({
                              productId,
                              activate,
                              statusId,
                              status,
                              productStatus,
                              operatorStatus,
                              iteration,
                              stage,
                              locApprovalDate,
                              ...product
                            }) => product
                          )
                        : []
                    }
                    headers={[
                      { label: 'Product Name', key: 'productName' },
                      { label: 'Company', key: 'companyName' },
                      { label: 'Product', key: 'productType' },
                      { label: 'Protocol', key: 'protocolVersion' },
                      { label: 'Tracking #', key: 'trackingNumber' },
                      { label: 'Product Status', key: 'productStatusName' },
                      { label: 'Account Status', key: 'operatorStatusName' },
                      { label: 'Time Created', key: 'createDate' },
                      { label: 'SLA', key: 'sla' },
                      { label: 'Owner', key: 'owner' },
                    ]}
                    filename={`ALL_3DS_PRODUCTS_${moment().format(
                      'YYYYMMDD_HHmmss'
                    )}`}
                  >
                    <BtnAction
                      ico="download"
                      color="bg-g-300"
                      buttonStyle="bg-g-300"
                      colorLabel="text-white"
                      label=".CSV"
                    />
                  </CSVLink>
                  <div onClick={() => exportPDF()}>
                    <BtnAction
                      ico="download"
                      color="bg-g-300"
                      buttonStyle="bg-g-300"
                      colorLabel="text-white"
                      label=".PDF"
                    />
                  </div>
                  <div onClick={() => print(['toPrint'])}>
                    <BtnAction
                      ico="print"
                      color="bg-b-310"
                      buttonStyle="bg-b-310"
                      colorLabel="text-white"
                      label="Print"
                    />
                  </div>
                </div>
              </div>
              <Divider />
              <div className="w-full flex flex-col-reverse lg:flex-row justify-between mb-6 lg:mb-4">
                <div className="flex justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="relative text-b-600">
                      <IcoArwPull className="absolute top-2.5 right-2.5 w-3 h-3 fill-current" />
                      <select
                        className="input pr-9 no-sel bg-transparent cursor-pointer focus:border-b-300 leading-none"
                        onChange={e => handleItemPerPage(e.target.value)}
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value="all">All</option>
                      </select>
                    </div>
                    <TextH3 text="Entries / page" style="text-sm" />
                  </div>
                  <div className="lg:hidden">
                    <InputSelect
                      id="sel2"
                      name="selSort"
                      onChange={e => handleSortBy(e.target.value)}
                    >
                      <option selected={!!sortedBy.match('')} value="">
                        Sort By
                      </option>
                      <option
                        selected={!!sortedBy.match('productName')}
                        value="productName"
                      >
                        Product Name
                      </option>
                      <option
                        selected={!!sortedBy.match('companyName')}
                        value="companyName"
                      >
                        Company
                      </option>
                      <option
                        selected={!!sortedBy.match('productType')}
                        value="productType"
                      >
                        Product
                      </option>
                      <option
                        selected={!!sortedBy.match('protocolVersion')}
                        value="protocolVersion"
                      >
                        Protocol
                      </option>
                      <option
                        selected={!!sortedBy.match('trackingNumber')}
                        value="trackingNumber"
                      >
                        Tracking#
                      </option>
                      <option
                        selected={!!sortedBy.match('productStatusName')}
                        value="productStatusName"
                      >
                        Product Status
                      </option>
                      <option
                        selected={!!sortedBy.match('operatorStatusName')}
                        value="operatorStatusName"
                      >
                        Account Status
                      </option>
                      <option selected={!!sortedBy.match('sla')} value="sla">
                        SLA
                      </option>
                      <option
                        selected={!!sortedBy.match('createDate')}
                        value="createDate"
                      >
                        Time Created
                      </option>
                      <option
                        selected={!!sortedBy.match('owner')}
                        value="owner"
                      >
                        Owner
                      </option>
                    </InputSelect>
                  </div>
                </div>
                <div className="relative text-b-600 mb-4">
                  <IcoSearch className="absolute top-2 left-2 w-4.5 h-4.5 fill-current" />
                  <input
                    className="w-full relative input no-sel bg-transparent cursor-pointer pl-9 pr-2 placeholder-b-300 focus:border-b-300 leading-none"
                    type="text"
                    value={filterStr}
                    onChange={e => filterList(e.target.value)}
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="overflow-auto mb-4" id="toPrint">
                <div className="mb-2" style={{ minWidth: '1200px' }}>
                  <div className="grid grid-cols-home-table pb-2.5 border-b border-gr-400">
                    <BtnTableTitle
                      onClick={() => handleSortBy('productName')}
                      active={!!sortedBy.match('productName')}
                      label="Product Name"
                    />
                    <BtnTableTitle
                      onClick={() => handleSortBy('companyName')}
                      active={!!sortedBy.match('companyName')}
                      label="Company"
                      justify="right"
                    />
                    <BtnTableTitle
                      onClick={() => handleSortBy('productType')}
                      active={!!sortedBy.match('productType')}
                      label="Product"
                      justify="right"
                    />
                    <BtnTableTitle
                      onClick={() => handleSortBy('protocolVersion')}
                      active={!!sortedBy.match('protocolVersion')}
                      label="Protocol"
                      justify="right"
                    />
                    <BtnTableTitle
                      onClick={() => handleSortBy('trackingNumber')}
                      active={!!sortedBy.match('trackingNumber')}
                      label="Tracking #"
                      justify="right"
                    />
                    <BtnTableTitle
                      onClick={() => handleSortBy('productStatusName')}
                      active={!!sortedBy.match('productStatus')}
                      label="Product Status"
                      justify="right"
                    />
                    <BtnTableTitle
                      onClick={() => handleSortBy('operatorStatusName')}
                      active={!!sortedBy.match('operatorStatusName')}
                      label="Account Status"
                      justify="right"
                    />
                    <BtnTableTitle
                      onClick={() => handleSortBy('createDate')}
                      active={!!sortedBy.match('createDate')}
                      label="Time Created"
                      justify="right"
                    />
                    <BtnTableTitle label="SLA" justify="right" noOrder />
                    <BtnTableTitle
                      onClick={() => handleSortBy('owner')}
                      active={!!sortedBy.match('owner')}
                      label="Owner"
                      justify="right"
                    />
                    <BtnTableTitle label="Action" justify="right" noOrder />
                  </div>
                  {busy ? (
                    <div className="animate-pulse mt-10 text-center">
                      <Spinner isLoading />
                    </div>
                  ) : filterStr !== '' ? (
                    listFiltered.map((product, index) => (
                      <HomeTableRow
                        data={[
                          product?.productName,
                          product?.companyName,
                          product?.productType,
                          product?.protocolVersion,
                          `${product?.trackingNumber}`,
                          `${product?.productStatusName}`,
                          `${product?.operatorStatusName}`,
                          product?.createDate,
                          `${product?.sla}`,
                          product?.owner,
                        ]}
                        statusLabel={product?.productStatusName}
                        key={index}
                        onClick={() =>
                          setTableCurrentItem(product?.productId) &
                          router.push(
                            `product-validation/${product?.productId}`
                          )
                        }
                        isLoading={product?.productId === tableCurrentItem}
                      />
                    ))
                  ) : (
                    listProduct.map((product, index) => (
                      <HomeTableRow
                        data={[
                          product?.productName,
                          product?.companyName,
                          product?.productType,
                          product?.protocolVersion,
                          `${product?.trackingNumber}`,
                          `${product?.productStatusName}`,
                          `${product?.operatorStatusName}`,
                          product?.createDate,
                          `${product?.sla}`,
                          product?.owner,
                        ]}
                        statusLabel={product?.productStatusName}
                        key={index}
                        onClick={() =>
                          setTableCurrentItem(product?.productId) &
                          router.push(
                            `product-validation/${product?.productId}`
                          )
                        }
                        isLoading={product?.productId === tableCurrentItem}
                      />
                    ))
                  )}
                </div>
              </div>
              {busy ? null : (
                <TablePaginate
                  initialPage={page}
                  pageCount={filterStr === '' && products.length / itemPerPage}
                  onPageChange={paginationHandler}
                />
              )}
            </Container>
          )}
        </section>
        <Footer />
        <BtnUp />
      </div>
    </main>
  );
}
