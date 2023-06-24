import {MActionType, MoreActionPopupProps, MoreActionsPopup} from "../components/MoreActionsPopup/MoreActionsPopup";
import {useModal} from "./use-modal";
import {useWindowSize} from "./use-window-size";

export const useMoreActionPopup = () => {
  const {modalService} = useModal();
  const {isMobile} = useWindowSize();

  const showPopup = (props: {actions: MActionType[]; heading?: string}) => {
    const modal = modalService.openModal({
      component: (
        <MoreActionsPopup
          {...props}
          onClose={() => {
            modal.close();
          }}
        />
      ),
      className: "bottom-slider-animation",
      width: !isMobile ? 460 : "100%",
    });
  };

  return {
    show: showPopup,
  };
};
