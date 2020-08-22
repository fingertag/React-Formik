import React from 'react';
import {Styles} from "./Styled";
import {Formik, useField,Form} from "formik";
import * as Yup from 'yup'; // validation

const CustomTextInput = ({label,...props})=>{
  const [field,meta] = useField(props);
  return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
          <input className="text-input" {...field} {...props}/>
          {meta.touched && meta.error ? (
              <div className='error'>{meta.error}</div>
          ):null}
      </>
  )
};

const CustomCheckbox = ({children,...props})=>{
    const [field,meta] = useField(props,'checkbox');
    return (
        <>
            <label className="checkbox">
                <input type='checkbox' {...field} {...props}/>
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ):null}
        </>
    )
};

const CustomSelect = ({label,...props})=>{
    const [field,meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props}/>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ):null}
        </>
    )
};



function App() {
  return (
    <Styles>
      <Formik initialValues={{name:'',email:'',acceptedTerms:false,specialPower:''}}
              validationSchema={Yup.object({
                  name : Yup.string()
                      .min(5,"باید حداقل شامل ۵ حرف باشد")
                      .max(20,"باید حداکثر شامل ۲۰ حرف باشد")
                      .required("الزامی"),
                  email:Yup.string()
                      .email("ایمیل نامعتبر است")
                      .required("الزامی"),
                  acceptedTerms:Yup.boolean()
                      .required("الزامی")
                      .oneOf([true],'تعهد ها را قبول دارم'),
                  specialPower: Yup.string()
                      .oneOf(['java','c','pascal','other'],'مهارت مورد نظر نامعتبر است')
                      .required("\"الزامی")
              })}
              onSubmit={(values,{setSubmitting,resetForm})=>{
                  setTimeout(()=>{
                      alert(JSON.stringify(values,null,2));
                      resetForm();
                      setSubmitting(false);
                  },3000)
              }}>
          {props =>(
              <Form>
                  <h1>ثبت نام</h1>
                  <CustomTextInput label='نام' name='name' type='text' placeholder='علی'/>
                  <CustomTextInput label='ایمیل' name='email' type='email' placeholder='email@gmail.com'/>
                  <CustomSelect label='مهارت' name='specialPower'>
                      <option value='' disabled>مهارت را انتخاب کنید</option>
                      <option value='java'>جاوا</option>
                      <option value='c'>سی</option>
                      <option value='pascal'>پاسکال</option>
                      <option value='other'>دیگر</option>
                  </CustomSelect>
                  <CustomCheckbox name='acceptedTerms'>
                      شرایط و تعهد نامه ها را قبول دارم
                  </CustomCheckbox>
                  <button  type='submit'>{props.isSubmitting?'صبر کنید..':'تایید'}</button>
              </Form>
              )}
      </Formik>
    </Styles>
  );
}

export default App;
