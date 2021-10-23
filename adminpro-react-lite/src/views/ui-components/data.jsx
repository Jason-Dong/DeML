import { CsvToHtmlTable } from 'react-csv-to-table';
import * as React from "react";
import * as CSV from 'csv-string';
import $ from "jquery";
import Papa from './PapaParse/papaparse';import {
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

//const sampleData = jQuery.getJSON('https://ipfs.io/ipfs/QmaqCzaiT6AqaMCcE5B2bUTRNKbtPsWGviKNveVkSN72vf', function (csvdata) {
//    return csvdata;
//  });

//var data = Papa.parse('https://ipfs.io/ipfs/QmaqCzaiT6AqaMCcE5B2bUTRNKbtPsWGviKNveVkSN72vf');
//var csv = Papa.unparse(data);
var results = Papa.parse('https://ipfs.io/ipfs/QmaqCzaiT6AqaMCcE5B2bUTRNKbtPsWGviKNveVkSN72vf');

const DataVisualizer = () => {
    return (
      <Card>
            <CardBody>
                <CardTitle>Visualizing the Dataset</CardTitle>
                <CsvToHtmlTable
                    data={results}  
                    csvDelimiter=","
                    tableClassName="table table-striped table-hover"
                />
            </CardBody>
      </Card>
    );
  };

export default DataVisualizer