import React, {Component} from "react";
import {SwitchTransition, CSSTransition} from "react-transition-group";
import styles from "./Toast.module.scss";
import cn from "classnames";
import {BellIcon, CheckSuccessIcon, InfoAlertIcon, InfoIcon} from "./ToastIcon";
import {CloseXIcon, LoadingIcon} from "../Icons/Icons";

type Toast = {
  id?: string;
  type?: "info" | "warning" | "alert" | "success" | "loading";
  text?: any;
  closeable?: boolean;
};

type State = {
  toast: Toast;
};

type ToastFunc = {
  show: (info: Toast) => void;
  hide: () => void;
};

export const toast: ToastFunc = {} as ToastFunc;

class ToastRegister extends Component<{}, State> {
  timeout: any = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      toast: {id: "none"},
    };

    toast.show = (info) => {
      clearTimeout(this.timeout);
      const id = new Date().getTime().toString();
      this.setState({toast: {...info, id}});

      if (info.type != "loading" && !info.closeable) {
        this.timeout = setTimeout(() => {
          this.setState({toast: {id: "none"}});
        }, 3000);
      }
    };

    toast.hide = () => {
      clearTimeout(this.timeout);
      this.setState({toast: {id: "none"}});
    };
  }

  render() {
    let {toast} = this.state;

    const icons = {
      info: <InfoIcon />,
      warning: <BellIcon />,
      alert: <InfoAlertIcon />,
      success: <CheckSuccessIcon />,
      loading: <LoadingIcon />,
    };

    return (
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={toast.id}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="fade"
        >
          <div>
            <div className={cn(styles["toast-wrapper"], "fade-comp", toast.closeable && styles["closeable"])}>
              <div
                className={cn(
                  styles["toast"],
                  toast.type && styles[toast.type],
                  toast.closeable && styles["closeable"]
                )}
              >
                {toast.type && icons[toast.type]} {toast.text}
                {toast.closeable && (
                  <CloseXIcon
                    className={styles["close-icon"]}
                    onClick={() => {
                      this.setState({toast: {id: "none"}});
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </CSSTransition>
      </SwitchTransition>
    );
  }
}

export default ToastRegister;
