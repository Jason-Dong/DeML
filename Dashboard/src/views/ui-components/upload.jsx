import * as React from "react";
import { Upload } from "@progress/kendo-react-upload";
import {
  Card,
    CardBody,
    CardTitle,
    Tooltip,
    Button,
    CardImg,
    CardText,
    CardSubtitle,
    Row,
    Col
} from 'reactstrap';
import { uploadModel } from "../../etherInfra";


const UploadComponent = () => {
  return (
    <Card>
            <CardBody>
              <CardTitle>Upload Your Model</CardTitle>
              Your model MUST be submitted as compressed bytes using our API. Note: Failure to do so will result in your model not working and immediate disqualification.
              <h3> Buy In: $45 </h3>
                  <Upload
                      batch={false}
                      multiple={true}
                      defaultFiles={[]}
                      withCredentials={false}
                      onAdd={(event)=> (event.newState[0].getRawFile().arrayBuffer().then(buffer=> uploadModel(buffer)))}
                    />
            </CardBody>
    </Card>

  );
};

export default UploadComponent
