import React from "react";

import img1 from 'assets/images/users/1.jpg';
import img2 from 'assets/images/users/2.jpg';
import img3 from 'assets/images/users/3.jpg';
import img4 from 'assets/images/users/4.jpg';

import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Input,
    Table,
    
} from 'reactstrap';

const Projects = () => {

    return (
        /*--------------------------------------------------------------------------------*/
        /* Used In Dashboard-4 [General]                                                  */
        /*--------------------------------------------------------------------------------*/

        <Card>
            <CardBody>
                <div className="d-flex align-items-center">
                    <div>
                        <CardTitle>Leaderboard of Scores</CardTitle>
                        <CardSubtitle>Each Submission</CardSubtitle>
                    </div>
                    <div className="ml-auto d-flex no-block align-items-center">
                        <div className="dl">
                            <Input type="select" className="custom-select">
                                <option value="0">Monthly</option>
                                <option value="1">Daily</option>
                                <option value="2">Weekly</option>
                                <option value="3">Yearly</option>
                            </Input>
                        </div>
                    </div>
                </div>
                <Table className="no-wrap v-middle" responsive>
                    <thead>
                        <tr className="border-0">
                            <th className="border-0">Submission</th>
                            <th className="border-0">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="">
                                        <h5 className="mb-0 font-16 font-medium">Address 1</h5></div>
                                </div>
                            </td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="">
                                        <h5 className="mb-0 font-16 font-medium">Address 2</h5></div>
                                </div>
                            </td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="">
                                        <h5 className="mb-0 font-16 font-medium">Address 3</h5></div>
                                </div>
                            </td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="">
                                        <h5 className="mb-0 font-16 font-medium">Address 4</h5></div>
                                </div>
                            </td>
                            <td>10</td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

export default Projects;
