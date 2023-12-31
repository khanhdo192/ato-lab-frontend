import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { postFetcher } from '@/lib/fetcher';
import CommonText from '@/components/commonText';
import Container from '@/components/container';
import FeedbackMsg from '@/components/feedbackMsg';
import InputPassword from '@/components/inputPassword';
import PasswordMeter from '@/components/passwordMeter';
import TextH1Login from '@/components/textH1Login';
import {
  IcoGreenCheck,
  IcoRedCross,
  IcoSuccess,
  IcoWhiteLeftArrow,
  IcoWhiteRightArrow,
} from '@/components/icons';
import Spinner from '@/components/spinner';
import { emailIsValid } from '@/utils/validator';

const FormProgress = ({ currentStep }) => (
  <div className="flex items-center">
    {
      <input
        type="radio"
        className="p-2 mr-2"
        disabled
        checked={1 <= currentStep}
      />
    }
    {
      <input
        type="radio"
        disabled
        className="p-2 mr-2"
        checked={2 <= currentStep}
      />
    }
  </div>
);

export default function PasswordExpired() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState({
    isFeedback: false,
    message: '',
    type: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [arePasswordsEqual, setArePasswordsEqual] = useState(true);
  const [passwordStrength, setPassowrdStrength] = useState(0);
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  const strongPass = 6;
  const weakPass = 2;

  const handleChangeEmail = useCallback(value => {
    setEmail(value);
  }, []);

  const handleChangePassword = newPass => {
    setNewPassword(newPass);
    passwordChecker(newPass);
    comparePasswords({ pass1: newPass });
  };

  const handleConfirmChangePassword = passToConfirm => {
    setConfirmedPassword(passToConfirm);
    comparePasswords({ pass2: passToConfirm });
  };

  const comparePasswords = ({
    pass1 = newPassword,
    pass2 = confirmedPassword,
  } = {}) => {
    if (pass1 === pass2) {
      setArePasswordsEqual(true);
    } else {
      setArePasswordsEqual(false);
    }
  };
  useEffect(() => {
    let passPoints = 0;
    if (lowerValidated) ++passPoints;
    if (upperValidated) ++passPoints;
    if (numberValidated) ++passPoints;
    if (specialValidated) ++passPoints;
    if (lengthValidated) ++passPoints;
    if (newPassword.length >= 12) ++passPoints;
    setPassowrdStrength(passPoints);
  }, [newPassword]);

  const passwordChecker = value => {
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#$%^&*])');
    const length = new RegExp('(?=.{8,})');
    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
  };

  const getPassMeterXtra = ({ step }) => {
    const bgYellow = 'bg-y-400';
    const bgGray = 'bg-gr-300';
    const bgRed = 'bg-r-400';
    const bgGreen = 'bg-g-400';

    const isPasswordStrong = passwordStrength === strongPass;
    const isPasswordMedium = passwordStrength > weakPass;
    const isPasswordWeak = passwordStrength > 1 && passwordStrength <= weakPass;

    if (isPasswordStrong) return bgGreen;
    if (isPasswordMedium && step <= 2) return bgYellow;
    if (isPasswordWeak && step === 1) return bgRed;

    return bgGray;
  };

  const RequirementIco = ({ isValid }) =>
    isValid ? (
      <span>
        <IcoGreenCheck className="rounded-full" />
      </span>
    ) : (
      <span>
        <IcoRedCross className="rounded-full" />
      </span>
    );

  const RequirementCheck = ({ text, isValid }) => (
    <div className="inline-flex">
      <RequirementIco isValid={isValid} />
      <CommonText text={text} />
    </div>
  );

  const handlePasswordReset = async () => {
    setStatus('busy');
    try {
      const body = {
        email,
        password: newPassword,
        confirmPassword: confirmedPassword,
      };

      const passwordChangeRes = await postFetcher(body)(
        '/jcb/auth/password/change'
      );

      if (passwordChangeRes.rtnCode !== '1') {
        setErrorMsg({
          isFeedback: true,
          message: passwordChangeRes?.message,
          type: 'error',
        });
      } else {
        setErrorMsg({
          isFeedback: true,
          message: 'Your password has been successfully updated!',
          type: 'success',
        });
        setCurrentPage(2);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      setErrorMsg({
        isFeedback: true,
        message: error?.message,
        type: 'error',
      });
      setStatus('error');
    }
  };

  return (
    <main className="flex w-full min-h-screen sm:items-center justify-center flex-col">
      {currentPage == 1 ? (
        <form autoComplete="off">
          <Container
            xtra="flex flex-col w-full max-w-screen-modal-md lg:max-w-login h-mt mt-3 border-b-950 border-t-8 rounded-md shadow-2xl"
            styles={{ minHeight: '90vh', width: '80vh' }}
          >
            {status === 'busy' ? (
              <div className="flex flex-grow items-center justify-center h-full w-full">
                <Spinner isLoading />
              </div>
            ) : (
              <>
                <div className="flex items-right justify-end">
                  <Image
                    width="95"
                    height="55"
                    src="/images/jcb_logo_login.png"
                    alt="JCB"
                  />
                </div>
                <Container
                  xtra="m-n"
                  styles={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div className="flex flex-col px-12">
                    <TextH1Login text="Setup New Password" />
                    {errorMsg.isFeedback ? (
                      <FeedbackMsg
                        type={errorMsg.type}
                        text={errorMsg.message}
                      />
                    ) : null}
                    <CommonText
                      xtra="mb-5 text-xl"
                      text="Your password has expired, please setup a new login password"
                    />
                    <p>Enter Email*</p>
                    <InputPassword
                      id="email"
                      value={email}
                      type="text"
                      placeholder="xxxx@gmail.com"
                      onChange={e => handleChangeEmail(e.target.value)}
                    />
                    <p>Enter New Password*</p>
                    <InputPassword
                      type="password"
                      id="passwordStrength"
                      placeholder="∗∗∗∗∗∗∗∗∗∗"
                      onChange={e => handleChangePassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    <div className="flex justify-start gap-1 items-center -mt-6 mb-4">
                      <PasswordMeter xtra={getPassMeterXtra({ step: 1 })} />
                      <PasswordMeter xtra={getPassMeterXtra({ step: 2 })} />
                      <PasswordMeter xtra={getPassMeterXtra({ step: 3 })} />
                      <CommonText xtra="text-xxs" text={'PASSWORD STRENGTH'} />
                    </div>
                    <p>Confirm New Password*</p>
                    <InputPassword
                      type="password"
                      placeholder="∗∗∗∗∗∗∗∗∗∗"
                      onChange={e =>
                        handleConfirmChangePassword(e.target.value)
                      }
                      error={
                        !!confirmedPassword && !arePasswordsEqual ? true : false
                      }
                    />
                    {!!newPassword &&
                    !!confirmedPassword &&
                    !arePasswordsEqual ? (
                      <div className="flex justify-start gap-1 items-center -mt-6 mb-4">
                        <CommonText
                          xtra="text-xxs text-r-400"
                          text={
                            'New passwords did not match, please check your password.'
                          }
                        />
                      </div>
                    ) : null}
                    <CommonText
                      xtra={'text-xl font-bold'}
                      text="Password Requirements"
                    />
                    <div className="grid grid-cols-1">
                      <div className="text-left grid grid-cols-1 ml-5">
                        <RequirementCheck
                          isValid={lengthValidated}
                          text="At least 8 characters (12+ recommended)"
                        />
                        <RequirementCheck
                          isValid={upperValidated && lowerValidated}
                          text="A mixture of both uppercase and lowercase letters"
                        />
                        <RequirementCheck
                          isValid={numberValidated}
                          text="A mixture of letters and numbers"
                        />
                        <RequirementCheck
                          isValid={specialValidated}
                          text="Inclusion of at least one special character, e.g., ! @ # ? ]"
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flex: '5' }}></div>
                  <div
                    className="flex justify-between mt-10 px-12"
                    style={{ flex: '1' }}
                  >
                    <div className="inline-flex items-center">
                      <div className="inline-flex items-center justify-center w-11 h-11 bg-b-950 rounded-full shadow-icon opacity-40">
                        <IcoWhiteLeftArrow className="w-6 h-6 text-p-500" />
                      </div>
                      <div className="pt-0.5 ml-2">
                        <CommonText
                          xtra="font-medium text-xl text-b-950"
                          text="Back"
                        />
                      </div>
                    </div>
                    <FormProgress currentStep={currentPage} />
                    <div className="inline-flex items-center">
                      <button
                        className="flex items-center focus:outline-none border-none"
                        onClick={() => handlePasswordReset()}
                        disabled={
                          arePasswordsEqual &&
                          passwordStrength >= 5 &&
                          emailIsValid(email)
                            ? false
                            : true
                        }
                      >
                        <div className="pt-0.5 mr-2">
                          <CommonText
                            xtra="font-medium text-xl text-b-950"
                            text="Next"
                          />
                        </div>
                        <div
                          className={
                            'inline-flex items-center justify-center w-11 h-11 bg-b-950 rounded-full shadow-icon ' +
                            (arePasswordsEqual &&
                            passwordStrength >= 5 &&
                            emailIsValid(email)
                              ? ''
                              : 'opacity-40')
                          }
                        >
                          <IcoWhiteRightArrow className="w-6 h-6 text-p-500 fill-current" />
                        </div>
                      </button>
                    </div>
                  </div>
                </Container>
              </>
            )}
          </Container>
        </form>
      ) : currentPage == 2 ? (
        <Container xtra="w-full max-w-screen-modal-md lg:max-w-login h-m mt-3 border-b-950 border-t-8 rounded-md shadow-2xl">
          <div style={{ minHeight: `${window.innerHeight * 0.73}px` }}>
            <div className="flex items-right justify-end">
              <Image
                width="95"
                height="55"
                src="/images/jcb_logo_login.png"
                alt="JCB"
              />
            </div>
            <Container>
              <TextH1Login text="Setup New Password" />
              <div className="flex flex-col justify-center">
                <div className="flex justify-center pl-1 mt-5">
                  <IcoSuccess className="text-g-400 fill-current w-12 h-12" />
                </div>
                <div className="flex justify-center mt-6 text-xl w">
                  <CommonText
                    xtra=" font-bold text-center"
                    text="Thanks you!"
                  />
                </div>
                <div className="flex justify-center mt-3 text-lg">
                  <CommonText
                    xtra="text-center w-3/5"
                    text="Your new password was accepted, please login with your new password."
                  />
                </div>
                <div className="flex justify-center mt-10 text-lg">
                  <CommonText
                    xtra="flex justify-center text-b-310 text-center underline"
                    text="Redirecting you to login page..."
                  />
                </div>
              </div>
            </Container>
          </div>
        </Container>
      ) : null}
    </main>
  );
}
