import React from 'react'
import PropTypes from 'prop-types'
import useAuthority from 'utils/hooks/useAuthority'

const AuthorityCheck = props => {

	const { userAuthority = [], authority = [], children } = props

	const roleMatched = useAuthority(userAuthority, authority)

	return roleMatched ? children : <></>
}

AuthorityCheck.propTypes = {
	userAuthority: PropTypes.array,
	authority: PropTypes.array,
}

export default AuthorityCheck