import { useToast } from "../../hooks/use-toast";
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "../../components/ui/toast"
// import ToastProvider from "../../components/ui/toast/ToastProvider";
// import ToastViewport from "../../components/ui/toast/ToastViewport";
// import Toast from "../../components/ui/toast/Toast";
// import ToastTitle from "../../components/ui/toast/ToastTitle";
// import ToastDescription from "../../components/ui/toast/ToastDescription";
// import ToastClose from "../../components/ui/toast/ToastClose";

export function Toaster() {
  const { toasts } = useToast();
  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}