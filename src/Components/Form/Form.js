import React, {useEffect} from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {fecthExcRateData} from "../Chart/chartSlice";
import {formsubmit, getFetchedtime} from "./formSlice";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {classNames} from "primereact/utils";
import "primeicons/primeicons.css";

import "primereact/resources/themes/luna-green/theme.css";

import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

export default function Form() {
  // const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }
      if (!data.email) {
        errors.email = "Email is required.";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      return errors;
    },

    onSubmit: (data) => {
      dispatch(fecthExcRateData());
      dispatch(formsubmit(data));
      dispatch(getFetchedtime());
      formik.resetForm();
    },
  });
  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };
  useEffect(() => {
    // return () => dispatch(revertAll());
  }, []);

  return (
    <div className="form-demo">
      <div className="form-demo__container">
        <div className="card">
          <h1>Currency exchange Rate Comparison Chart</h1>
          <h2 className="text-center">Please enter your details</h2>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="field">
              <span className="p-float-label">
                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({"p-invalid": isFormFieldValid("name")})} />
                <label htmlFor="name" className={classNames({"p-error": isFormFieldValid("name")})}>
                  First-name*
                </label>
              </span>
              {getFormErrorMessage("name")}
            </div>
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({"p-invalid": isFormFieldValid("email")})} />
                <label htmlFor="email" className={classNames({"p-error": isFormFieldValid("email")})}>
                  Email*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>
            <Button type="submit" label="View chart" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
}
