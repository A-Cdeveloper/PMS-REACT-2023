import { Toaster } from "react-hot-toast";

const Notifications = () => {
  return (
    <Toaster
      position="top-right"
      gutter={3}
      containerStyle={{
        right: 50,
      }}
      toastOptions={{
        className: "toaststyle",
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
      }}
    />
  );
};

export default Notifications;
