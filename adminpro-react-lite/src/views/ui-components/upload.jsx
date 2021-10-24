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