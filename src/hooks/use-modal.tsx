import React, {createContext, FC, useContext, useState} from "react";
import dynamic from "next/dynamic";
import {LoadingModalOverlay, LoadingModalProps} from "../components/Modals/LoadingModalOverlay/LoadingModalOverlay";
import {useWindowSize} from "./use-window-size";

const ModalRegister = dynamic(() => import("../components/Modals/ModalRegister"), {ssr: false});

export type ModalType = {
  component: JSX.Element | JSX.Element[];
  className?: string | null;
  id?: number;
  width?: number | string;
  cantClickOut?: boolean;
};

const useModalProvide = () => {
  const [modals, setModals] = useState<ModalType[]>([]);
  const {isMobile} = useWindowSize();

  const close = (modal: ModalType) => {
    setModals((current) => current.filter((m) => m.id != modal.id));
  };

  const openModal = (modal: ModalType) => {
    let m = {
      ...modal,
      id: new Date().getTime(),
    };

    setModals((current) => current.concat(m));

    return {
      close: () => close(m),
    };
  };

  const showLoading = (props: LoadingModalProps) => {
    return openModal({
      component: <LoadingModalOverlay {...props} />,
      cantClickOut: true,
      width: isMobile ? undefined : 400,
    });
  };

  const showConfirmModal = (data: {title: string; description: string; acceptText?: string}) => {
    const resp = confirm(data.title);
    return Promise.resolve(resp);
  };

  return {
    modalService: {
      modals: modals,
      openModal,
      closeModal: (m: ModalType) => close(m),
      showLoading,
    },
    showConfirmModal,
  };
};

type ModalService = {
  modalService: {
    modals: ModalType[];
    openModal: (modal: ModalType) => {
      close: () => void;
    };
    closeModal: (modal: ModalType) => void;
    showLoading: (props: LoadingModalProps) => {
      close: () => void;
    };
  };
  showConfirmModal: (body: {title: string; description: string; acceptText?: string}) => Promise<boolean>;
};

const ModalContext = createContext<ModalService>({} as ModalService);

export const ModalContextProvide: FC<{}> = ({children}) => {
  const service = useModalProvide();

  return (
    <ModalContext.Provider value={service}>
      {children}
      {/* @ts-ignore */}
      <ModalRegister modals={service.modalService.modals} onCloseModal={service.modalService.closeModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
