import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormField from "../../globals/FormField";
import useFetch from "../../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import Spinner from "../../globals/Spinner";

const phoneSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("Phone number is required"),
});

const otpSchema = Yup.object().shape({
  phoneCode: Yup.string().required("OTP is required"),
});

function Login({ setUserWantsToLogin }) {
  const dispatch = useDispatch();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [sessionData, setSessionData] = useState(null);

  const { reqState: initiateState, reqFn: initiateRequest } = useFetch(
    { url: "/t/api/initiate", method: "POST" },
    // Success
    (data) => {
      setSessionData(data.response);
      setShowOtpForm(true);
    }
  );

  const { reqState: verifyState, reqFn: verifyRequest } = useFetch(
    { url: "/t/api/verify", method: "POST" },
    // Success
    () => {
      dispatch(authActions.login());
    }
  );

  const handlePhoneSubmit = (values) => {
    initiateRequest(values);
  };

  const handleOtpSubmit = (values) => {
    const payload = {
      ...values,
      phoneNumber: sessionData.phoneNumber,
      phoneCodeHash: sessionData.phoneCodeHash,
      sessionString: sessionData.stringSession,
    };
    verifyRequest(payload);
  };
  return (
    <div className="basis-[35rem]">
      <h1 className="text-cta-icon font-semibold text-[2rem] uppercase mb-[2rem]">
        Login To Telegram
      </h1>

      {!showOtpForm ? (
        <Formik
          initialValues={{ phoneNumber: "" }}
          validationSchema={phoneSchema}
          onSubmit={handlePhoneSubmit}
        >
          {({ errors, values }) => (
            <Form className="flex flex-col gap-[1.5rem]" autoComplete="off">
              <FormField
                labelName="Phone Number"
                labelClassName={`bg-transparent group-focus-within:hidden ${
                  values.phoneNumber && "hidden"
                }`}
                name="phoneNumber"
                required={true}
                value={values.phoneNumber}
                error={errors.phoneNumber}
              />

              <button
                className={`bg-cta-icon mt-[1rem] p-[1rem] rounded-xl uppercase text-white font-semibold opacity-80 flex items-center justify-center ${
                  !errors.phoneNumber && "opacity-100"
                }`}
                type="submit"
              >
                {initiateState !== "loading" && "Send OTP"}
                {initiateState === "loading" && (
                  <Spinner className="w-[2.5rem] h-[2.5rem]" />
                )}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ phoneCode: "" }}
          validationSchema={otpSchema}
          onSubmit={handleOtpSubmit}
        >
          {({ errors, values }) => (
            <Form className="flex flex-col gap-[1.5rem]" autoComplete="off">
              <FormField
                labelName="Enter OTP"
                labelClassName={`bg-transparent group-focus-within:hidden ${
                  values.phoneCode && "hidden"
                }`}
                name="phoneCode"
                required={true}
                value={values.phoneCode}
                error={errors.phoneCode}
              />

              <button
                className={`bg-cta-icon mt-[1rem] p-[1rem] rounded-xl uppercase text-white font-semibold opacity-80 flex items-center justify-center ${
                  !errors.phoneCode && "opacity-100"
                }`}
                type="submit"
              >
                {verifyState !== "loading" && "Verify OTP"}
                {verifyState === "loading" && (
                  <Spinner className="w-[2.5rem] h-[2.5rem]" />
                )}
              </button>
            </Form>
          )}
        </Formik>
      )}

      <div
        onClick={() => setUserWantsToLogin(false)}
        className="mt-[2rem] text-right text-secondary-text underline cursor-pointer hover:text-cta-icon"
      >
        New to Telegram
      </div>
    </div>
  );
}

export default Login;
