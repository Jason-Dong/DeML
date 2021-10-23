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
                      saveUrl={"https://demos.telerik.com/kendo-ui/service-v4/upload/save"}
                      removeUrl={"https://demos.telerik.com/kendo-ui/service-v4/upload/remove"}
                    />
            </CardBody>
    </Card>
    
  );
};

export default UploadComponent