import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postFetcher, fetcher } from '@/lib/fetcher';
import useUser from '@/lib/useUser';
import useSWR from 'swr';

import cloneDeep from 'lodash/cloneDeep';

import Nav from '@/components/nav';
import Header from '@/components/header';
import UserThumb from '@/components/userThumb';

import TextH1 from '@/components/textH1';
import TextH5 from '@/components/textH5';

import Divider from '@/components/divider';

import BtnUp from '@/components/btnUp';
import Btn from '@/components/btn';

import TableRowSwitchs4 from '@/components/tableRowSwitchs4';
import TableRowSwitchs3 from '@/components/tableRowSwitchs3';

import FormItemInput from '@/components/formItemInput';
import FormItemSelect from '@/components/formItemSelect';

import Switch from '@/components/switch';
import SwitchGroup from '@/components/switchGroup';

import Container from '@/components/container';
import ContainerCol_3 from '@/components/containerCol_3';
import ContainerCol_2 from '@/components/containerCol_2';

import FeedbackMsg from '@/components/feedbackMsg';

import Breadcrumb from '@/components/breadcrumb';
import BreadcrumbItem from '@/components/breadcrumbItem';

import ModalMedium from '@/components/modalMedium';

import Footer from '@/components/footer';
import Spinner from '@/components/spinner';

export default function ProductSetup({ props }) {
  const router = useRouter();
  const { productId } = router.query;
  const { user } = useUser({ redirectTo: '/login' });

  const { data: dataComponents, error: errorComponents } = useSWR(
    '/jcb/getAllComponent',
    postFetcher()
  );
  const components = dataComponents?.result?.components;

  const { data: dataProtocolsVersion, error: errorProtocolsVersion } = useSWR(
    '/jcb/getAllProtocolVersion',
    postFetcher()
  );
  const protocolsVersion = dataProtocolsVersion?.result?.protocolVersions;

  const { data: dataProduct, error: errorProduct } = useSWR(
    '/tester/product/getInfo',
    postFetcher({ productId: productId })
  );
  const product = dataProduct?.result?.product;

  const { data: dataDashboard, error: errorDashboard } = useSWR(
    '/jcb/dashboard',
    fetcher
  );
  const statusId = dataDashboard?.result?.data[0]?.statusId;

  const [body, setBody] = useState({});

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [switchChanged, setSwitchChanged] = useState(false);

  if (Object.values(body).length === 0 && product) {
    setBody(cloneDeep(product));
    setSwitchChanged(true);
  }

  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  useEffect(() => {
    setSwitchChanged(false);
  }, [switchChanged]);

  if (!dataProduct && !errorProduct)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner isLoading={true} color="text-b-320" size="10" />
      </div>
    );

  return (
    <main className="relative flex w-full min-h-screen 2xl:min-h-main m-auto max-w-1688 2xl:my-8 2xl:pl-8">
      {/*  Sidebar  */}
      <Nav
        status={isSideBarOpen}
        setStatus={setIsSideBarOpen}
        activeSection={'product-profile'}
        productId={productId}
      />

      {/*  Content  */}
      <div className="relative z-0 w-full p-2 pt-20 lg:pt-2 lg:ml-menu-lg 2xl:ml-menu 2xl:ml-0 py:0 lg:px-8">
        <Header setStatus={setIsSideBarOpen}>
          {/*  Breadcrumbs  */}

          <Breadcrumb>
            <BreadcrumbItem isFirst label="dashboard" />
            <BreadcrumbItem label="product setup" />
          </Breadcrumb>

          {/*  User info  */}

          <div>
            {/* User UI  img="/images/user-fake.jpg"   */}
            <UserThumb alt={!!user ? user?.fullName : ''} />
          </div>
        </Header>

        {/*  Content per PAGE  */}
        <section>
          <Container>
            {/*  PRODUCT INFORMATION  */}

            <TextH1 text="Product Information" />
            <Divider />

            {/*  INFO  */}
            {(!product?.component || !product?.protocolVersion) &&
              !errorProduct &&
              dataProduct?.rtnCode === 1 && (
                <div className="my-3">
                  <ContainerCol_2>
                    <FeedbackMsg
                      type="info"
                      text="Select the Product Type and Protocol Version to show all fields"
                    />
                  </ContainerCol_2>
                </div>
              )}
            {/*  ERROR  */}
            {(errorProduct || dataProduct?.rtnCode != 1) && (
              <div className="my-3">
                <ContainerCol_2>
                  <FeedbackMsg
                    type="error"
                    text="Error loading the product. Please try later"
                    important
                  />
                </ContainerCol_2>
              </div>
            )}
            <ContainerCol_3 xtra="mb-12">
              <FormItemInput
                isDisabled
                id="pi0"
                label="Product Name"
                placeholder="Sample ACS"
                value={body ? body.name : ''}
              />

              <FormItemInput
                isDisabled
                id="pi5"
                label="Server URL"
                placeholder="https://test-url.com/acs/autentication"
                value={body ? body.serverUrl : ''}
              />

              <div className="hidden lg:block" />

              <FormItemSelect
                id="pi1"
                name="pi1"
                label="Product Type"
                isDisabled
              >
                {product &&
                  product.component.length > 0 &&
                  components &&
                  Object.values(components).map((data, index) => (
                    <option
                      value={data}
                      selected={product.component.includes(data)}
                    >
                      {data}
                    </option>
                  ))}
              </FormItemSelect>

              <FormItemSelect
                id="pi2"
                name="pi2"
                label="Protocol Version"
                isDisabled
              >
                {product &&
                  product.protocolVersion.length > 0 &&
                  protocolsVersion &&
                  protocolsVersion.map((data, index) => (
                    <option
                      value={data}
                      selected={product.protocolVersion.includes(data)}
                    >
                      {data}
                    </option>
                  ))}
              </FormItemSelect>

              <div className="hidden lg:block" />
            </ContainerCol_3>

            {product?.component &&
              product?.protocolVersion &&
              protocolsVersion &&
              components && (
                <div>
                  {product.component === components[2] && (
                    <div>
                      {/*  OPERATOR INFORMATION FOR ISSUER  */}
                      <TextH1 text="Operator Information for Issuer" />
                      <Divider />

                      <ContainerCol_3 xtra="mb-12">
                        <FormItemInput
                          isDisabled
                          id="oi0"
                          label="ACS Server Operator ID"
                          placeholder="0123456789"
                          value={body ? body.acsOperatorId : ''}
                          maxlength="32"
                          info={`${
                            body ? body.acsOperatorId?.length || 0 : 0
                          }/32`}
                        />
                        <FormItemInput
                          isDisabled
                          id="oi1"
                          label="ACS Reference Number"
                          placeholder="0123456789"
                          value={body ? body.acsRefNo : ''}
                          info={`${body ? body.acsRefNo?.length || 0 : 0}/32`}
                          maxlength="32"
                        />
                        <FormItemInput
                          isDisabled
                          id="oi2"
                          label="Issuer Managed ID"
                          placeholder="Super issuer Ltd."
                          value={body ? body.issuerManagedId : ''}
                        />
                      </ContainerCol_3>

                      {/*  Acquirer TEST CARD DECLARATION  */}
                      <TextH1 text="Issuer Test Card Declaration" />
                      <Divider />

                      <div className="columns-2 p mb-14">
                        Please refer to the latest J/Secure™ 2.0 Confidence Test
                        Procedures (for issuers) document Test Case Card Status
                        table to ensure you have the relevant Card Ranges
                        declared. <br />
                        The Card Ranges and declared here will be used during
                        the confidence tests and their expected card behaviors
                        will affected the test results.
                      </div>

                      <ContainerCol_3 xtra="mb-12">
                        <FormItemInput
                          isDisabled
                          id="c0"
                          label="Card A"
                          placeholder="0123456789"
                          value={body ? body.cardA : ''}
                          info={`${body ? body.cardA?.length || 0 : 0}/19`}
                          maxlength="19"
                        />
                        <FormItemInput
                          isDisabled
                          id="c1"
                          label="Card B"
                          placeholder="0123456789"
                          value={body ? body.cardB : ''}
                          info={`${body ? body.cardB?.length || 0 : 0}/19`}
                          maxlength="19"
                        />
                        <FormItemInput
                          isDisabled
                          id="c2"
                          label="Card C"
                          placeholder="0123456789"
                          value={body ? body.cardC : ''}
                          info={`${body ? body.cardC?.length || 0 : 0}/19`}
                          maxlength="19"
                        />
                        <FormItemInput
                          isDisabled
                          id="c3"
                          label="Card D"
                          placeholder="0123456789"
                          value={body ? body.cardD : ''}
                          info={`${body ? body.cardD?.length || 0 : 0}/19`}
                          maxlength="19"
                        />
                        <FormItemInput
                          isDisabled
                          id="c4"
                          label="Card F"
                          placeholder="0123456789"
                          value={body ? body.cardF : ''}
                          info={`${body ? body.cardF?.length || 0 : 0}/19`}
                          maxlength="19"
                        />
                      </ContainerCol_3>

                      {/*  IMPLEMENTATION INFORMATION */}
                      <TextH1 text="ACS Implemenation Information" />
                      <Divider />

                      <div>
                        <ContainerCol_3 xtra="mt-10 lg:my-10">
                          <Switch
                            id="acs_s0"
                            label="Issuer provide RBA for all card members"
                            isActive={body ? body['issuerProvideRBA'] : false}
                          />

                          <Switch
                            id="acs_s1"
                            label="Issuer conduct CAVV verification during Authorization process"
                            isActive={body ? body['issuerProvideCAVV'] : false}
                          />

                          <Switch
                            id="acs_s2"
                            label="Issuer provide ACS Attempt"
                            isActive={body ? body['issuerProvideACS'] : false}
                          />
                        </ContainerCol_3>

                        <ContainerCol_3 xtra="lg:my-10">
                          {/* Switch Group  */}
                          <SwitchGroup
                            title="Device Channel which issuer support"
                            xtra="mt-4 lg:mt-0"
                          >
                            <Switch
                              id="mc_s0"
                              label="01-APP"
                              isActive={body ? body['issuerApp'] : false}
                            />
                            <Switch
                              id="mc_s1"
                              label="02-BRW"
                              isActive={body ? body['issuerBrw'] : false}
                            />
                            <Switch
                              id="mc_s2"
                              label="03-3RI"
                              isActive={body ? body['issuer3ri'] : false}
                            />
                          </SwitchGroup>

                          <SwitchGroup
                            title="Message Category which issuer support"
                            xtra="mt-4 lg:mt-0"
                          >
                            <Switch
                              id="mc_s3"
                              label="01-PA"
                              isActive={body ? body['issuerPa'] : false}
                            />
                            <Switch
                              id="mc_s4"
                              label="02-NPA"
                              isActive={body ? body['issuerNpa'] : false}
                            />
                          </SwitchGroup>

                          <SwitchGroup
                            title="ACS UI Type which issuer support"
                            xtra="mt-4 lg:mt-0"
                          >
                            <Switch
                              id="mc_s5"
                              label="01=Text"
                              isActive={body ? body['issuerUi01'] : false}
                            />
                            <Switch
                              id="mc_s6"
                              label="02=Single Select"
                              isActive={body ? body['issuerUi02'] : false}
                            />
                            <Switch
                              id="mc_s7"
                              label="03=Multi Select"
                              isActive={body ? body['issuerUi03'] : false}
                            />
                            <Switch
                              id="mc_s8"
                              label="04=OOB"
                              isActive={body ? body['issuerUi04'] : false}
                            />
                            <Switch
                              id="mc_s9"
                              label="05=HTML"
                              isActive={body ? body['issuerUi05'] : false}
                            />
                          </SwitchGroup>
                        </ContainerCol_3>
                      </div>

                      {product?.protocolVersion.includes(
                        protocolsVersion[1]
                      ) && (
                        <ContainerCol_3 xtra="lg:mb-12">
                          <SwitchGroup
                            title="2.2.0 Specific"
                            xtra="mt-4 lg:mt-0"
                          >
                            <Switch
                              id="mc_s10"
                              label="Acquirer TRA"
                              isActive={
                                body ? body['issuerAcquirerTRA'] : false
                              }
                            />
                            <Switch
                              id="mc_s11"
                              label="Decouple Authentication"
                              isActive={
                                body ? body['issuerDecoupleAuth'] : false
                              }
                            />
                            <Switch
                              id="mc_s12"
                              label="Decouple Authentication supports 3RI"
                              isActive={
                                body ? body['issuerDecoupleAuth3ri'] : false
                              }
                            />
                            <Switch
                              id="mc_s13"
                              label="Whitelisting support"
                              isActive={
                                body ? body['issuerWhitelistingSup'] : false
                              }
                            />
                          </SwitchGroup>
                        </ContainerCol_3>
                      )}
                    </div>
                  )}
                  {product?.component === components[1] && (
                    <div>
                      <TextH1 text="Operator Information for Acquirer" />
                      <Divider />

                      <ContainerCol_3 xtra="mb-12">
                        <FormItemInput
                          isDisabled
                          id="oi0"
                          label="3DS Server Operator ID"
                          placeholder="0123456789"
                          value={body ? body['threeDsOperatorId'] : ''}
                          info={`${
                            body ? body['threeDsOperatorId']?.length || 0 : 0
                          }/32`}
                          maxlength="32"
                        />
                        <FormItemInput
                          isDisabled
                          id="oi2"
                          label="Merchant Category Code"
                          placeholder="0123"
                          value={body ? body['merchantCategoryCode'] : ''}
                          info={`${
                            body ? body['merchantCategoryCode']?.length || 0 : 0
                          }/4`}
                          maxlength="4"
                        />
                        <div className="hidden lg:block" />
                        <FormItemInput
                          isDisabled
                          id="oi1"
                          label="Acquirer Merchant ID"
                          placeholder="0123456789"
                          value={body ? body['acquirerMerchantId'] : ''}
                          info={`${
                            body ? body['acquirerMerchantId']?.length || 0 : 0
                          }/32`}
                          maxlength="32"
                        />
                        <FormItemInput
                          isDisabled
                          id="oi3"
                          label="Merchant Country Code"
                          placeholder="012"
                          value={body ? body['merchantCountryCode'] : ''}
                          info={`${
                            body ? body['merchantCountryCode']?.length || 0 : 0
                          }/3`}
                          maxlength="3"
                        />
                        <div className="hidden lg:block" />
                        <FormItemInput
                          isDisabled
                          id="oi4"
                          label="3DS Server Reference Number"
                          placeholder="0123456789"
                          value={body ? body['threeDSServerRefNumber'] : ''}
                          info={`${
                            body
                              ? body['threeDSServerRefNumber']?.length || 0
                              : 0
                          }/32`}
                          maxlength="32"
                        />
                      </ContainerCol_3>

                      <TextH1 text="Acquirer Test Card Declaration" />
                      <Divider />

                      <div className="columns-2 p mb-14">
                        Please refer to the latest J/Secure™ 2.0 Confidence Test
                        Procedures (for issuers) document Test Case Card Status
                        table to ensure you have the relevant Card Ranges
                        declared. <br />
                        The Card Ranges and declared here will be used during
                        the confidence tests and their expected card behaviors
                        will affected the test results.
                      </div>

                      <ContainerCol_3 xtra="mb-12">
                        <FormItemInput
                          isDisabled
                          id="c0"
                          label="Card A"
                          placeholder="0123456789"
                          value={body ? body.cardA : ''}
                          info={`${body ? body.cardA?.length || 0 : 0}/19`}
                          maxlength="19"
                        />
                        <FormItemInput
                          isDisabled
                          id="c1"
                          label="Card B"
                          placeholder="0123456789"
                          value={body ? body.cardB : ''}
                          info={`${body ? body.cardB?.length || 0 : 0}/19`}
                          maxlength="19"
                        />
                        <FormItemInput
                          isDisabled
                          id="c2"
                          label="Card C"
                          placeholder="0123456789"
                          value={body ? body.cardC : ''}
                          info={`${body ? body.cardC?.length || 0 : 0}/19`}
                          maxlength="19"
                        />
                        <FormItemInput
                          isDisabled
                          id="c3"
                          label="Card D"
                          placeholder="0123456789"
                          value={body ? body.cardD : ''}
                          info={`${body ? body.cardD?.length || 0 : 0}/19`}
                          maxlength="19"
                        />
                        <FormItemInput
                          isDisabled
                          id="c4"
                          label="Card F"
                          placeholder="0123456789"
                          value={body ? body.cardF : ''}
                          info={`${body ? body.cardF?.length || 0 : 0}/19`}
                          maxlength="19"
                        />
                        <FormItemInput
                          isDisabled
                          id="c5"
                          label="Card G"
                          placeholder="0123456789"
                          value={body ? body.cardG : ''}
                          info={`${body ? body.cardG?.length || 0 : 0}/19`}
                          maxlength="19"
                        />
                      </ContainerCol_3>

                      {/* 2.1.0 AND 2.2.0 SUPPORTED TRANSACTIONS TYPES */}
                      <TextH1 text="Supported Transaction Types" />
                      <Divider />

                      <div className="mb-12">
                        <div className="grid grid-cols-4 lg:grid-cols-switchs-4 gap-0 border-b border-gr-400 mt-12 text-center">
                          <div className="hidden lg:block" />
                          <TextH5 text="01-APP (Native)" />
                          <TextH5 text="01-APP (HTML)" />
                          <TextH5 text="02-BRW" />
                          <TextH5 text="03-3RI" />
                        </div>

                        <TableRowSwitchs4 title="Mandatory">
                          <Switch
                            id="m0"
                            isActive={body ? body.mandatoryNative : false}
                            xtra="m-n justify-center"
                          />
                          <Switch
                            id="m1"
                            isActive={body ? body.mandatoryHtml : false}
                            xtra="m-n justify-center"
                          />
                          <Switch
                            id="m2"
                            isActive={body ? body.mandatoryBrw : false}
                            xtra="m-n justify-center"
                          />
                          {product?.protocolVersion.includes(
                            protocolsVersion[1]
                          ) && (
                            <Switch
                              isActive={body ? body.mandatory3ri : false}
                              id="m3"
                              xtra="m-n justify-center"
                            />
                          )}
                        </TableRowSwitchs4>

                        <TableRowSwitchs4 title="Supports Approval according to the Merchants decision">
                          <Switch
                            id="m0"
                            isActive={
                              body ? body.merchantsDecisionNative : false
                            }
                            xtra="m-n justify-center"
                          />
                          <Switch
                            id="m1"
                            isActive={body ? body.merchantsDecisionHtml : false}
                            xtra="m-n justify-center"
                          />
                          <Switch
                            id="m2"
                            isActive={body ? body.merchantsDecisionBrw : false}
                            xtra="m-n justify-center"
                          />
                          {product?.protocolVersion.includes(
                            protocolsVersion[1]
                          ) && (
                            <Switch
                              id="m3"
                              isActive={
                                body ? body.merchantsDecision3ri : false
                              }
                              xtra="m-n justify-center"
                            />
                          )}
                        </TableRowSwitchs4>

                        {product?.protocolVersion.includes(
                          protocolsVersion[1]
                        ) && (
                          <TableRowSwitchs4 title="Supports Acquirer TRA">
                            <Switch
                              id="m0"
                              isActive={body ? body.supTraNative : false}
                              xtra="m-n justify-center"
                            />
                            <Switch
                              id="m1"
                              isActive={body ? body.supTraHtml : false}
                              xtra="m-n justify-center"
                            />
                            <Switch
                              id="m2"
                              isActive={body ? body.supTraBrw : false}
                              xtra="m-n justify-center"
                            />
                          </TableRowSwitchs4>
                        )}

                        <TableRowSwitchs4 title="Supports NPA">
                          <Switch
                            id="m0"
                            isActive={body ? body.supNpaNative : false}
                            xtra="m-n justify-center"
                          />
                          <Switch
                            id="m1"
                            isActive={body ? body.supNpaHtml : false}
                            xtra="m-n justify-center"
                          />
                          <Switch
                            id="m2"
                            isActive={body ? body.supNpaBrw : false}
                            xtra="m-n justify-center"
                          />
                          <Switch
                            id="m3"
                            isActive={body ? body.supNpa3ri : false}
                            xtra="m-n justify-center"
                          />
                        </TableRowSwitchs4>

                        {product?.protocolVersion.includes(
                          protocolsVersion[1]
                        ) && (
                          <div>
                            <TableRowSwitchs4 title="Supports NPA + Acquirer TRA">
                              <Switch
                                isActive={body ? body.supNpaTraNative : false}
                                id="m0"
                                xtra="m-n justify-center"
                              />
                              <Switch
                                isActive={body ? body.supNpaTraHtml : false}
                                id="m1"
                                xtra="m-n justify-center"
                              />
                              <Switch
                                isActive={body ? body.supNpaTraBrw : false}
                                id="m2"
                                xtra="m-n justify-center"
                              />
                              <Switch
                                isActive={body ? body.supNpaTra3ri : false}
                                id="m3"
                                xtra="m-n justify-center"
                              />
                            </TableRowSwitchs4>

                            <TableRowSwitchs4 title="Supports NPA + Decoupled">
                              <Switch
                                isActive={
                                  body ? body.supNpaDecoupleNative : false
                                }
                                id="m0"
                                xtra="m-n justify-center"
                              />
                              <Switch
                                isActive={
                                  body ? body.supNpaDecoupleHtml : false
                                }
                                id="m1"
                                xtra="m-n justify-center"
                              />
                              <Switch
                                isActive={body ? body.supNpaDecoupleBrw : false}
                                id="m2"
                                xtra="m-n justify-center"
                              />
                              <Switch
                                isActive={body ? body.supNpaDecouple3ri : false}
                                id="m3"
                                xtra="m-n justify-center"
                              />
                            </TableRowSwitchs4>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

            <div className="w-full flex flex-col items-end mb-6">
              <div className="w-full lg:w-auto flex">
                <Btn
                  label="complete review"
                  ico="review"
                  color="bg-b-500"
                  xtra="w-full md:w-auto"
                  onClick={() =>
                    router.push('/product-validation/' + productId)
                  }
                />
              </div>
            </div>
          </Container>
        </section>

        <BtnUp />

        <Footer />
      </div>
    </main>
  );
}
