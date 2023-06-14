import React, { createContext, useContext } from 'react'

type FormContentProps = {
  clearState: any
  getState: any
  setPropInState: any
}

type useFormContentProps = {
  clearState: any
  getState: any
  setPropInState: any
}

export const FormContent = createContext<FormContentProps>({
  clearState: () => {},
  getState: () => {},
  setPropInState: () => {},
})

export default function FormContentProvider({ children }) {
  let state = {}

  const clearState = () => {
    state = {}
  }

  const setPropInState = (prop, value) => {
    state = { ...state, [prop]: value }
  }

  const getState = () => {
    return state
  }

  return (
    <FormContent.Provider value={{ clearState, getState, setPropInState }}>
      {children}
    </FormContent.Provider>
  )
}

export function useFormContent(): useFormContentProps {
  const context = useContext(FormContent)

  const { clearState, setPropInState, getState } = context

  return {
    clearState,
    setPropInState,
    getState,
  }
}
