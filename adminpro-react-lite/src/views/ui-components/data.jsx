import Web3 from 'web3'


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

//var data = Papa.parse('https://ipfs.io/ipfs/QmaqCzaiT6AqaMCcE5B2bUTRNKbtPsWGviKNveVkSN72vf');
//var csv = Papa.unparse(data);

const API_KEY = ""
const abi = ""
const address = ""


var web3 = Web3(`https://mainnet.infura.io/v3/${API_KEY}`)
var contract = web3.eth.Contract(abi, address)
var link = contract.dataset_link


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var data = httpGet(link)
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