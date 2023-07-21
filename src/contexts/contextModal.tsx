import { ReactNode, createContext, useContext, useState } from 'react'

export type optionsPayment = 'Credito' | 'Pix' | 'Boleto' | null

type ChildrenType = {
  children: ReactNode
}

interface DataContextProps {
  modalOptions: boolean
  modalData: boolean
  modalPayment: boolean
  modalType: optionsPayment
  handleModalOptions: () => void
  handleModalData: () => void
  handleModalPayment: () => void
  handleModalType: (value: optionsPayment) => void
  closeAllModals: () => void
}

const ContextModal = createContext({} as DataContextProps)

function ContextModalProvider({ children }: ChildrenType) {
  const [modalOptions, setModalOptions] = useState(false)
  const [modalData, setModalData] = useState(false)
  const [modalPayment, setModalPayment] = useState(false)
  const [modalType, setModalType] = useState<optionsPayment>(null)

  function handleModalOptions() {
    setModalOptions((modalOptions) => !modalOptions)
  }

  function handleModalData() {
    setModalData((modalData) => !modalData)
  }

  function handleModalPayment() {
    setModalPayment((modalPayment) => !modalPayment)
  }

  function handleModalType(value: optionsPayment) {
    setModalType(value)
  }

  function closeAllModals() {
    setModalOptions(false)
    setModalData(false)
    setModalPayment(false)
    setModalType(null)
  }

  return (
    <ContextModal.Provider
      value={{
        modalOptions,
        modalData,
        modalPayment,
        modalType,
        handleModalOptions,
        handleModalData,
        handleModalPayment,
        handleModalType,
        closeAllModals,
      }}
    >
      {children}
    </ContextModal.Provider>
  )
}

function useModel() {
  const context = useContext(ContextModal)
  return context
}

export { useModel, ContextModalProvider }
