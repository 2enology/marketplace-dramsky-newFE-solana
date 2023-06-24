import React, {FC, useEffect} from "react";
import {ModalType} from "../../hooks/use-modal";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Modal} from "./Modal";
import {useLockedBody} from "../../hooks/use-locked-body";

type Props = {
  modals: ModalType[];
  onCloseModal: (modal: ModalType) => void;
};

const ModalRegister: FC<Props> = ({modals, onCloseModal}) => {
  const {setLocked} = useLockedBody();

  useEffect(() => {
    if (modals.length > 0) {
      setLocked(true);
    } else {
      setLocked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modals]);

  return (
    <TransitionGroup className="app-modal-list">
      {modals.map((modal, i) => (
        <CSSTransition timeout={300} classNames="app-modal-fade" key={i}>
          <Modal
            className={modal.className}
            content={modal.component}
            onDismiss={() => onCloseModal(modal)}
            contentWidth={modal.width}
            cantClickOut={modal.cantClickOut}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default ModalRegister;
