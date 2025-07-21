import classNames from "classnames"

const BlackScreen = ({isBlackScreen}) => {
	return(
		<div className={classNames('main-black-screen', {'fade-out': !isBlackScreen})}/>
	)
}
export default BlackScreen