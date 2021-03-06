import React from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Col,
    Row
} from 'reactstrap';
import { Line } from 'react-chartjs-2';

//Line chart
let lineData = {
    labels: [0,1,2,3,4,5,6,7,8,9,10],
    datasets: [{
        label: 'Number of Miners',
        borderWidth: 1,
        backgroundColor: 'rgba(94,114,228,.1)',
        borderColor: 'rgb(94,114,228)',
        pointBorderColor: 'rgb(94,114,228)',
        pointBackgroundColor: 'rgb(94,114,228)',
        data: [0,87,93,91,99,92,88,95,78,97, 100]
    }]
};

const SalesSummary = () => {
    return (
        <Card>
            <CardBody>
                <div className="d-flex align-items-center">
                    <div>
                        <CardTitle>Distribution of Your Past Submissions</CardTitle>
                    </div>

                    <div className="ml-auto d-flex align-items-center">
                        <ul className="list-inline font-12 dl mr-3 mb-0">
                            <li className="border-0 p-0 text-info list-inline-item">
                                <i className="fa fa-circle"></i> Model Performance
								</li>

                        </ul>
                    </div>
                </div>
            </CardBody>
            <div className="bg-info stats-bar">
                <Row>
                    <Col lg="4">
                        <div className="p-3 active w-100 text-truncate">
                            <h6 className="text-white">Total Submissions</h6>
                            <h3 className="text-white m-b-0">1</h3>
                        </div>

                    </Col>
                    <Col lg="4">
                        <div className="p-3 w-100 text-truncate">
                            <h6 className="text-white">Best Score</h6>
                            <h3 className="text-white m-b-0">89</h3>
                        </div>
                    </Col>

                    <Col lg="4">
                        <div className="p-3 w-100 text-truncate">
                            <h6 className="text-white">Latest Score</h6>
                            <h3 className="text-white m-b-0">0</h3>
                        </div></Col>
                </Row>
            </div>
            <CardBody>
                <Row>
                    <Col lg="12">
                        <div className="campaign ct-charts">
                            <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 250 }}>
                                <Line data={lineData} options={{ maintainAspectRatio: false, legend: { display: false, labels: { fontFamily: "Montserrat" } }, scales: { yAxes: [{ stacked: true, gridLines: { display: true }, lineSmooth: false, ticks: { fontFamily: "Montserrat" } }], xAxes: [{ gridLines: { display: false }, ticks: { fontFamily: "Montserrat" } }] } }} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default SalesSummary;
