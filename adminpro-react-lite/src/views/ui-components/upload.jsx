import * as React from "react";
import { Upload } from "@progress/kendo-react-upload";
import { CopyBlock, dracula } from "react-code-blocks";

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
              Please ensure to submit the compressed byte version of your model. This can be done using our standard cross platform model compression library.
              <br/>
              <br/>
              Install our library <a href="/">here</a>
              <br/>
              <br/>
              This is an example use case for tensorflow (use "TORCH" instead of "TF" for Pytorch).
              <br/>
              <br/>
                  <CopyBlock
                    text={'compressor = ModelProcessor("TF")\n bytes = compressor.compress(model)\n with open("byte_model") as f:\n\tf.write(bytes)'}
                    language={"python"}
                    showLineNumbers={false}
                    theme={dracula}
                    wrapLines
                  />
                  <br/>
                  Now you can submit byte_model.
                  <br/>
                  <br/>
                  <br/>
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