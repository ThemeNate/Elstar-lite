import React from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import { onSignInSuccess } from 'store/auth/sessionSlice'
import { setUser } from 'store/auth/userSlice'
import { apiSignUp } from 'services/AuthService'
import appConfig from 'configs/app.config'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
	userName: Yup.string().required('Please enter your user name'),
	email: Yup.string().email('Invalid email').required('Please enter your email'),
	password: Yup.string().required('Please enter your password'),
	confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Your passwords do not match')
})

const SignUpForm = props => {

	const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const [message, setMessage] = useTimeOutMessage()

	const onSignUp = async (values, setSubmitting) => {
		const { userName, password, email } = values
		setSubmitting(true)
		try {
			const resp = await apiSignUp({ userName, password, email })
			if (resp.data) {
				setSubmitting(false)
				const { token } = resp.data
				dispatch(onSignInSuccess(token))
				if(resp.data.user) {
					dispatch(setUser(resp.data.user || { 
						avatar: '', 
						userName: 'Anonymous', 
						authority: ['USER'], 
						email: ''
					}))
				}
				navigate(appConfig.tourPath)
			}
		} catch (errors) {
			setMessage(errors?.response?.data?.message || errors.toString())
			setSubmitting(false)
		}
	}

	return (
		<div className={className}>
			{message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>}
			<Formik
				initialValues={{
					userName: 'admin1', 
					password: '123Qwe1', 
					confirmPassword: '123Qwe1',
					email: 'test@testmail.com' 
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if(!disableSubmit) {
						onSignUp(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({touched, errors, isSubmitting}) => (
					<Form>
						<FormContainer>
							<FormItem
								label="User Name"
								invalid={errors.userName && touched.userName}
								errorMessage={errors.userName}
							>
								<Field 
									type="text" 
									autoComplete="off" 
									name="userName" 
									placeholder="User Name" 
									component={Input} 
								/>
							</FormItem>
							<FormItem
								label="Email"
								invalid={errors.email && touched.email}
								errorMessage={errors.email}
							>
								<Field 
									type="email" 
									autoComplete="off" 
									name="email" 
									placeholder="Email" 
									component={Input} 
								/>
							</FormItem>
							<FormItem
								label="Password"
								invalid={errors.password && touched.password}
								errorMessage={errors.password}
							>
								<Field
									autoComplete="off" 
									name="password" 
									placeholder="Password" 
									component={PasswordInput} 
								/>
							</FormItem>
							<FormItem
								label="Confirm Password"
								invalid={errors.confirmPassword && touched.confirmPassword}
								errorMessage={errors.confirmPassword}
							>
								<Field
									autoComplete="off" 
									name="confirmPassword" 
									placeholder="Confirm Password" 
									component={PasswordInput} 
								/>
							</FormItem>
							<Button 
								block 
								loading={isSubmitting} 
								variant="solid" 
								type="submit"
							>
								{ isSubmitting ? 'Creating Account...' : 'Sign Up' }
							</Button>
							<div className="mt-4 text-center">
								<span>Already have an account? </span>
								<ActionLink to={signInUrl}>
									Sign in
								</ActionLink>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default SignUpForm