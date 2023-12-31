import React, { useState, useMemo } from 'react';
import Router, { useRouter } from 'next/router'

import useSWR from 'swr'
import { postFetcher, getFetcher } from '@/lib/fetcher'
import { textIsValid, permissionsAreValid } from '@/utils/validator'

import Spinner from '@/components/spinner'

import ModalMain from '@/components/modalMain'
import ModalContainer from '@/components/modalContainer'

import Container from '@/components/container'
import ContainerCol_2 from '@/components/containerCol_2'
import Divider from '@/components/divider'

import BtnPopClose from '@/components/btnPopClose'
import Btn from '@/components/btn'
import BtnAction from '@/components/btnAction'

import TextH1 from '@/components/textH1'
import TextH2 from '@/components/textH2'
import TitleIcon from '@/components/titleIcon'

import FormAssetLabel from '@/components/formAssetLabel'
import FormItemCheckbox from '@/components/formItemCheckbox'
import FormItemInput from '@/components/formItemInput'

import FeedbackMsg from '@/components/feedbackMsg'

import { mockedData } from '@/utils/mockedData'


export default function ModalRoleEdit({ user }) {

  let router = useRouter()
  const { id } = router.query

  // Defaults states
  const defaultFeedback = { isFeedback: false, message: '', type: '' }
  const defaultRole = { name: '', permissions: [] }

  // States
  const [feedback, setFeedback] = useState(defaultFeedback)
  const [role, setRole] = useState(defaultRole)
  const [isConfirmed, setIsConfirmed] = useState(false)

  // States handlers
  const handleRole = (id, value) => setRole({ ...role, [id]: value })
  const handlePermissions = (id, value, checked) => setRole({ ...role, [id]: checked ? [...role[id], value] : [...role[id].filter(p => p !== value)]})

  // API calls
  const rolesLoadRes = { data: { result: mockedData.roles }, error: null } // useSWR('/jcb/getUsersRole', postFetcher({}))

  const allPermissions = useMemo(() => {
    if (rolesLoadRes?.data)     
      return rolesLoadRes?.data?.result?.allPermissions

    // if (rolesLoadRes?.error)
    //   setFeedback({ isFeedback: true, message: 'Ops! error loading roles.', type: 'error' })
    
    return null
  }, [rolesLoadRes?.data?.result?.allPermissions, rolesLoadRes?.error])

  const roleToEdit = useMemo(() => {
    if (rolesLoadRes?.data) {
      const roleToEditRes = rolesLoadRes?.data?.result?.companyGroupRoles.find(role => role["id"] === id)
      const roleToEditParsed = { name: roleToEditRes?.name, permissions: [...roleToEditRes?.permissions.map(permission => permission?.id)], id: roleToEditRes?.id }
      setRole(roleToEditParsed)
      return roleToEditParsed
    }

    // if (rolesLoadRes?.error)
    //   setFeedback({ isFeedback: true, message: 'Ops! error loading role to edit.', type: 'error' })
    
    return null
  }, [rolesLoadRes?.data?.result?.companyGroupRoles, rolesLoadRes?.error, id])


  // Form handler
  const handleSubmit = async e => {
    try {
      e.preventDefault()
      
      if (!textIsValid(role["name"]))
        return window.scrollTo(0,0)
      if (!permissionsAreValid(role["permissions"]))
        return setFeedback({ isFeedback: true, message: 'Check that there is at least one permission selected.', type: 'warn' })
      if (!isConfirmed) return setFeedback({ isFeedback: true, message: 'Confirm the action please.', type: 'info' })
      
      // const roleUpdateRes = await postFetcher({ userId: user?.id, id: id, name: role?.name, permissionIds: role?.permissions?.toString() })('/pp/users/roles/update');

      setFeedback({ isFeedback: true, message: 'Role updated successfully!', type: 'success' })
      return setTimeout(() => setFeedback(defaultFeedback), 5000);
    } catch (error) {
      window.scrollTo(0,0)
      return setFeedback({ isFeedback: true, message: error?.message, type: 'error' })
    }
  }

  const handleRemoveRole = async () => {
    try {
      if (!isConfirmed) return setFeedback({ isFeedback: true, message: 'Confirm the action please.', type: 'info' })
      // const roleDeleteRes = await postFetcher({ userId: user?.id, deleteRoleId: id })('/pp/users/roles/delete');

      setFeedback({ isFeedback: true, message: 'Role deleted successfully!', type: 'success' })
      return setTimeout(() => {
        setFeedback(defaultFeedback)
        return Router.push('/user-management')
      }, 5000);
      
    } catch (error) {
      window.scrollTo(0,0)
      return setFeedback({ isFeedback: true, message: error?.message, type: 'error' })
    }
  }

  return (
    <ModalMain>
       <ModalContainer>

          <BtnPopClose onClick={() => Router.push('/user-management')} />

          <div className="mb-3 flex items-center">
            <TitleIcon ico="edit" />
            <TextH1 text="Edit" highliteText="Users Roles" />
          </div>

          <Container className="-mt-6 md:mt-3" hasBorder >
            <div className="w-full flex justify-between">
              <TextH1 text="Role Name and Permissions" />
              <BtnAction onClick={() => handleRemoveRole()} label="REMOVE ROLE" ico="delete" color="bg-r-400" xtra="-mt-1" />
            </div>

            <TextH2 isInfo text="Enter a new Role name, then check the portal functions you want this role to Access. Click on SUBMIT to complete" />
            <Divider />

            <form onSubmit={e => handleSubmit(e)}>
              <ContainerCol_2>
                <div>
                  <FormItemInput 
                    onChange={e => handleRole(e.target.id, e.target.value)} 
                    label="Role Name*" 
                    id="name" 
                    placeholder={roleToEdit ? roleToEdit["name"] : ''}
                    value={role ? role["name"] : ''}
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
                                isChequed={role.permissions.includes(permission.id)}
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

                  <div className="flex flex-col items-end">
                    <FormItemCheckbox isChequed={isConfirmed} onChange={e => setIsConfirmed(e.target.checked)} id="confirm" name="confirm" value="confirm" label="Please Confirm this Action!"  />
                    <Btn type="submit" ico="submit" label="Save" />
                  </div>
                </div>
              </ContainerCol_2>
            </form>

          </Container>

      </ModalContainer>

    </ModalMain>
  )
}