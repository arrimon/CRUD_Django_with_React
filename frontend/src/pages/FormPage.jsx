import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { createPerson, getPerson, updatePerson } from '../api'
import 'bootstrap/dist/css/bootstrap.min.css';

const EDUCATION_OPTIONS = [
  { value: 'SSC', label: 'SSC' },
  { value: 'HSC', label: 'HSC/Diploma' },
  { value: 'HONS', label: 'Honors/BSc' },
  { value: 'MS', label: 'Masters/MSc' },
]

const ADDRESS_OPTIONS = ['Dhaka', 'Chittagong', 'Barisal', 'Rajshahi', 'Khulna', 'Rangpur', 'Sylhet', 'Mymansing']

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email'),
  phone: Yup.string().required('Required'),
})

export default function FormPage() {
  const { id } = useParams()
  const editMode = Boolean(id)
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState({
    name: '', phone: '', email: '', education: [], gender: '', address: ''
  })

  useEffect(() => {
    if (editMode) load()
  }, [id])

  const load = async () => {
    try {
      const res = await getPerson(id)
      setInitialValues({
        name: res.data.name || '',
        phone: res.data.phone || '',
        email: res.data.email || '',
        education: res.data.education || [],
        gender: res.data.gender || '',
        address: res.data.address || '',
      })
    } catch (err) { console.error(err) }
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editMode) await updatePerson(id, values)
      else await createPerson(values)
      navigate('/listpage')
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-10">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0 h4">
                <i className={`bi ${editMode ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
                {editMode ? 'Edit' : 'Create'} Employee
              </h2>
            </div>
            
            <div className="card-body p-4">
              <Formik 
                enableReinitialize 
                initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={handleSubmit}
              >
                {({ values, isSubmitting, setFieldValue, errors, touched }) => (
                  <Form>
                    {/* Name Field */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-semibold">
                        Name <span className="text-danger">*</span>
                      </label>
                      <Field 
                        name="name" 
                        className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                        placeholder="Enter full name"
                      />
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </div>

                    {/* Phone Field */}
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label fw-semibold">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <Field 
                        name="phone" 
                        className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                        placeholder="Enter phone number"
                      />
                      <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                    </div>

                    {/* Email Field */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email
                      </label>
                      <Field 
                        name="email" 
                        type="email"
                        className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                        placeholder="Enter email address"
                      />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>

                    {/* Education Field */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Education</label>
                      <div className="border rounded p-3">
                        <div className="row">
                          {EDUCATION_OPTIONS.map(opt => (
                            <div key={opt.value} className="col-md-6 mb-2">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`education-${opt.value}`}
                                  name="education"
                                  value={opt.value}
                                  checked={values.education.includes(opt.value)}
                                  onChange={e => {
                                    if (e.target.checked) 
                                      setFieldValue('education', [...values.education, opt.value])
                                    else 
                                      setFieldValue('education', values.education.filter(x => x !== opt.value))
                                  }}
                                />
                                <label 
                                  htmlFor={`education-${opt.value}`} 
                                  className="form-check-label"
                                >
                                  {opt.label}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Gender Field */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Gender</label>
                      <div className="border rounded p-3">
                        <div className="row">
                          {['Male', 'Female', 'Others'].map(g => (
                            <div key={g} className="col-md-4 mb-2">
                              <div className="form-check">
                                <Field 
                                  type="radio" 
                                  name="gender" 
                                  value={g} 
                                  className="form-check-input"
                                  id={`gender-${g}`}
                                />
                                <label 
                                  htmlFor={`gender-${g}`} 
                                  className="form-check-label"
                                >
                                  {g}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Address Field */}
                    <div className="mb-4">
                      <label htmlFor="address" className="form-label fw-semibold">
                        Address
                      </label>
                      <Field 
                        as="select" 
                        name="address" 
                        className="form-select"
                      >
                        <option value="">Select Address</option>
                        {ADDRESS_OPTIONS.map(a => (
                          <option value={a} key={a}>{a}</option>
                        ))}
                      </Field>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex gap-2 justify-content-end">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary" 
                        onClick={() => navigate('/')}
                        disabled={isSubmitting}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            {editMode ? 'Updating...' : 'Creating...'}
                          </>
                        ) : (
                          <>
                            <i className={`bi ${editMode ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
                            {editMode ? 'Update Employee' : 'Create Employee'}
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}