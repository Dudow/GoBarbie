import React from 'react'
import { RouteProps as ReactRouteProps, Route as ReactRoute, Redirect} from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext' 

interface RouteProps extends ReactRouteProps{
  isPrivate?: boolean;
  component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({isPrivate = false, component: Component , ...rest}) => {

  const {user} = useAuth()

  console.log(Component)

  return(
    <ReactRoute {...rest} render={({location}) => {
      return isPrivate === !!user ? (
        <Component />
      ) : (
        <Redirect to={{
          pathname: isPrivate ? '/' : '/dashboard',
          state: {from: location}
        }} />
      )
    }}/>
  )
}

export default Route