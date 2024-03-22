const AddedNotification = ({ message }) => {
  if (message === "") {
    return null;
  }

  return <div className="notification addName">Added {message}</div>;
};
const ErrorNotification = ({ message }) => {
  if (message === "") {
    return null;
  }

  return <div className="notification errorName">{message}</div>;
};

export { AddedNotification, ErrorNotification };
