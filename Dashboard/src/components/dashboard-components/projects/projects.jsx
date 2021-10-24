import React from "react";
import { ethers } from "ethers";
import {useState} from 'react';
import { getParticipants, getBest } from "../../../etherInfra";

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

function zip(arrays) {
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}

const SingleCardView = (props) => {
    return (
        <tr>
            <td>
                <div className="d-flex no-block align-items-center">
                    <div className="">
                        <h5 className="mb-0 font-16 font-medium">{props.address}</h5></div>
                </div>
            </td>
            <td>{props.best}</td>
        </tr>
    );
}

const AllCardViews = (p) => {
    var rows = [];
    for (const [key, value] of Object.entries(p)) {
        rows.push(<SingleCardView address={key} best={value} />);
    }
    return rows;
}

const Projects = () => {
    const [p, setP] = useState({})
    const participantScores = {};

    async function setParticipants(participants) 
    {
        participants = participants[0]
        for (const participant of participants) {
            const best = await getBest(participant);
            participantScores[participant]=parseInt(best.toString())
        }
    }

    getParticipants().then(participants => {
        setParticipants(participants).then(()=> {
            setP(participantScores);
        });
        
    })
    if (p) {    
    console.log("outside loop", p)
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
                </div>
                <Table className="no-wrap v-middle" responsive>
                    <thead>
                        <tr className="border-0">
                            <th className="border-0">Submission</th>
                            <th className="border-0">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AllCardViews(p)}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
    }
    else {
        return "Loading"
    }
}

export default Projects;
