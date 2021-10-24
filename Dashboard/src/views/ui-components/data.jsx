import { CsvToHtmlTable } from 'react-csv-to-table';
import * as React from "react";
import {useState} from 'react';
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
import { getContract, getDatasetLink } from "etherInfra"

//var data = Papa.parse('https://ipfs.io/ipfs/QmaqCzaiT6AqaMCcE5B2bUTRNKbtPsWGviKNveVkSN72vf');
//var csv = Papa.unparse(data);

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


const DataVisualizerWrapper = () => {
  var ipfs_link;
  var data;
  
  const updateLink = link => {
    ipfs_link = link;
  }
  const [link, setLink] = useState("")
  getDatasetLink().then(link => setLink(link))



  console.log(ipfs_link)
  if (link!="") {
    data = httpGet(link)
  return (
    <Card>
          <CardBody>
              <CardTitle>Visualizing the Dataset</CardTitle>
              <a href={link}> Download Dataset </a>
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
  }
  else {
    return ("Loading")
  }
};


export default DataVisualizerWrapper