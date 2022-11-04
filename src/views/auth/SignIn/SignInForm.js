import React from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'

const validationSchema = Yup.object().shape({
	userName: Yup.string().required('Please enter your user name'),
	password: Yup.string().required('Please enter your password'),
})

const SignInForm = props => {

	const { 
		disableSubmit = false, 
		className, 
		forgotPasswordUrl = '/forgot-password',
		signUpUrl = '/sign-up'
	} = props

	const [message, setMessage] = useTimeOutMessage()

	const { signIn } = useAuth()

	const onSignIn = async (values, setSubmitting) => {
		const { userName, password } = values
		setSubmitting(true)
		
		const result = await signIn({ userName, password })

		if (result.status === 'failed') {
			setMessage(result.message)
		}

		setSubmitting(false)
	}

	return (
		<div className={className}>
			{message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>}
			<Formik
				initialValues={{
					userName: 'admin', 
					password: '123Qwe', 
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if(!disableSubmit) {
						onSignIn(values, setSubmitting)
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
							<div className="flex justify-between mb-6">
								<ActionLink to={forgotPasswordUrl}>
									Forgot Password?
								</ActionLink>
							</div>
							<Button block loading={isSubmitting} variant="solid" type="submit">
								{ isSubmitting ? 'Signing in...' : 'Sign In' }
							</Button>
							<div className="mt-4 text-center">
								<span>Don't have an account yet? </span>
								<ActionLink to={signUpUrl}>
									Sign up
								</ActionLink>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default SignInForm