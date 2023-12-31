import React, { useState, useMemo } from 'react';
import Router from 'next/router';

import useSWR from 'swr';
import { postFetcher, getFetcher } from '@/lib/fetcher';
import { textIsValid, permissionsAreValid } from '@/utils/validator';

import ModalMain from '@/components/modalMain';
import ModalContainer from '@/components/modalContainer';

import Container from '@/components/container';
import ContainerCol_2 from '@/components/containerCol_2';
import Divider from '@/components/divider';

import BtnPopClose from '@/components/btnPopClose';
import Btn from '@/components/btn';

import TextH1 from '@/components/textH1';
import TextH2 from '@/components/textH2';
import TitleIcon from '@/components/titleIcon';

import FormAssetLabel from '@/components/formAssetLabel';
import FormItemCheckbox from '@/components/formItemCheckbox';
import FormItemInput from '@/components/formItemInput';

import FeedbackMsg from '@/components/feedbackMsg';
import Spinner from '@/components/spinner';

import ModalMedium from '@/components/modalMedium';

import { mockedData } from '@/utils/mockedData';


export default function ModalRoleAdd({ user }) {

  // Defaults states
  const defaultFeedback = { isFeedback: false, message: '', type: '' };
  const defaultRole = { name: '', permissions: [] };

  // States
  const [feedback, setFeedback] = useState(defaultFeedback);
  const [role, setRole] = useState(defaultRole);
  const [showModal, setShowModal] = useState(false);

  // States handlers
  const handleRole = (id, value) => {
    setRole({ ...role, [id]: value });
  }
  const handlePermissions = (id, value, checked) => setRole({ ...role, [id]: checked ? [...role[id], value] : [...role[id].filter(p => p !== value)]});

  // API calls
  const rolesLoadRes = { data: { result: mockedData.roles }, error: null } // useSWR('/jcb/getUsersRole', postFetcher({}));
  
  const allPermissions = useMemo(() => {
    if (rolesLoadRes?.data)
      return rolesLoadRes?.data?.result?.allPermissions;

    if (rolesLoadRes?.error)
      setFeedback({ isFeedback: true, message: 'Ops! error loading roles.', type: 'error' });
    
    return null;
  }, [rolesLoadRes?.data?.result?.allPermissions, rolesLoadRes?.error]);

  // Form handler
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      
      if (!textIsValid(role["name"]))
        return window.scrollTo(0,0);
      if (!permissionsAreValid(role["permissions"]))
        return setFeedback({ isFeedback: true, message: 'Check that there is at least one permission selected.', type: 'warn' });

      
      return setShowModal(true);
    } catch (error) {
      window.scrollTo(0,0)
      return setFeedback({ isFeedback: true, message: error?.message, type: 'error' });
    }
  }

  const handleConfirm = async () => {
    try {
      setShowModal(false);
      // const roleCreateRes = await postFetcher({ userId: user?.id, name: role?.name, permissionIds: role?.permissions?.toString() })('/pp/users/roles/create');
      setFeedback({ isFeedback: true, message: 'Role created successfully!', type: 'success' });
      setTimeout(() => setFeedback(defaultFeedback), 5000);
      return setRole(defaultRole);
    } catch (error) {
      return setFeedback({ isFeedback: true, message: error?.message, type: 'error' });
    }
  }

  return (
    <>
    {
      !!showModal
        ? 
          <ModalMedium 
            title={"JCB User Roles"}
            text={"Are you completely sure to perform this action?"}
            onSubmit={() => handleConfirm()}
            onCancel={() => setShowModal(false)}
          />
        : 
          <ModalMain>
            <ModalContainer>

                <BtnPopClose onClick={() => Router.push('/user-management')} />

                <div className="mb-3 flex items-center">
                  <TitleIcon ico="manage" />
                  <TextH1 text="Define" highliteText="New Roles" />
                </div>

                <Container className="-mt-6 md:mt-3" hasBorder >

                  <TextH1 text="Role Name and Permissions" />
                  <TextH2 isInfo text="Enter a new Role name, then check the portal functions you want this role to Access. Click on SUBMIT to complete" />
                  <Divider />

                  <form onSubmit={e => handleSubmit(e)}>
                    <ContainerCol_2>
                      <div>
                        <FormItemInput
                          onChange={e => handleRole(e.target.id, e.target.value)}
                          label="Role Name*"
                          id="name"
                          placeholder="e.g. Manager"
                          value={role["name"]}
                          error={!textIsValid(role["name"])}
                          errorMsg={!textIsValid(role["name"]) ? 'Characters not allowed: /[`!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?~]/' : null}
                          isRequired 
                        />

                        <FormAssetLabel label="Portal Functions" />
                        <div className="border border-b-250 px-3 py-4 bg-white rounded-xl mb-4 lg:mb-0">
                          {
                            allPermissions
                              ? allPermissions.map((permission, i) => (
                                  <FormItemCheckbox 
                                    onChange={e => handlePermissions(e.target.id, e.target.value, e.target.checked)}
                                    key={permission.order}
                                    id="permissions"
                                    name={permission.name}
                                    value={permission.id}
                                    label={permission.name}
                                  />
                                )
                              )
                              :
                                <div className="justify-center">
                                  <Spinner isLoading />
                                </div>
                          }
                        </div>
                      </div>

                      {/* Feedback */}
                      <div className="w-full flex flex-col justify-between items-end">
                        <div className="w-full lg:mt-1.5 mb-2 lg:mb-0">
                          {
                            feedback.isFeedback 
                            ? 
                              <Container>
                                <FeedbackMsg type={feedback.type} text={feedback.message} />
                              </Container>
                            : null
                          }
                        </div>

                        <Btn type="submit" ico="submit" label="Save" />
                      </div>
                    </ContainerCol_2>
                  </form>

                </Container>

            </ModalContainer>
          </ModalMain>
    }
    </>
  )
}