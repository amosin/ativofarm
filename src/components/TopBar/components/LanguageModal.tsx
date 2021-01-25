import React, { useContext } from 'react'
import { LanguageContext } from '../../../contexts/Languages'
import Button from '../../Button'
import Modal, { ModalProps } from '../../Modal'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import { CHANGE_LANGUAGE } from '../../../contexts/Languages';


const LanguageModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { dispatch } = useContext(LanguageContext);

  const onEnglishClick = () => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: 'en-us',
    })
    onDismiss()
  }

  const onFrenchSelect = () => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: 'fr-fr',
    })
    onDismiss()
  }

  return (
    <Modal>
      <ModalTitle text="Language settings" />
      <ModalContent>
        <Spacer />
        <Button
          onClick={onEnglishClick}
          text="🇬🇧 English"
        />
        <Spacer />
        <Button
          onClick={onFrenchSelect}
          text="🇫🇷 Français"
        />
        <Spacer />
        <Button
          onClick={onDismiss}
          text="Cancel"
        />
      </ModalContent>
    </Modal>
  )
}

export default LanguageModal
