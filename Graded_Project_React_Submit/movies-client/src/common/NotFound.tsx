import Alert from "react-bootstrap/Alert";

const NotFound = () => {
  return (
    <div style={{marginTop:"20%"}}>
      <Alert variant="danger">
        <Alert.Heading className="text-center">No Information Found</Alert.Heading>
      </Alert>
    </div>

  );
};
export default NotFound;