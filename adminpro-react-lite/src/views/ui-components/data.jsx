import { CsvToHtmlTable } from 'react-csv-to-table';
import * as React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import * as CSV from 'csv-string';
import Papa from "../../../node_modules/papaparse/"
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

import ContractAPI from "../../ContractAPI"

//var data = Papa.parse('https://ipfs.io/ipfs/QmaqCzaiT6AqaMCcE5B2bUTRNKbtPsWGviKNveVkSN72vf');
//var csv = Papa.unparse(data);


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

abi = ""
address = ""

ContractAPI = ContractAPI(abi, address)
var data = httpGet(ContractAPI.getDatasetLink())
console.log(data)


const DataVisualizer = () => {
    return (
      <Card>
            <CardBody>
                <CardTitle>Visualizing the Dataset</CardTitle>
                <a href="https://ipfs.io/ipfs/QmaqCzaiT6AqaMCcE5B2bUTRNKbtPsWGviKNveVkSN72vf"> Download Dataset </a>
                <ScrollMenu>
                  <CsvToHtmlTable
                    data={data}  
                    csvDelimiter=","
                    tableClassName="table table-striped table-hover"
                  />
                </ScrollMenu>
            </CardBody>
      </Card>
    );
  };

export default DataVisualizer