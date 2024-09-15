import './DashBoard.scss';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverview } from "../../../services/apiServices";
import { useState, useEffect } from 'react';
const DashBoard = (props) => {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverview();
    }, []);

    const fetchDataOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);

            let Qz = 0, Qs = 0, As = 0;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;

            const data = [{
                "name": "Quizzes",
                "QZ": Qz,
            },
            {
                "name": "Questions",
                "Qs": Qs,
            },
            {
                "name": "Answers",
                "As": As,
            },
            ]
            setDataChart(data);
        }
    }

    // const data = [
    //     {
    //         "name": "Page A",
    //         "uv": 4000,
    //         "pv": 2400
    //     },
    //     {
    //         "name": "Page B",
    //         "uv": 3000,
    //         "pv": 1398
    //     },
    //     {
    //         "name": "Page C",
    //         "uv": 2000,
    //         "pv": 9800
    //     },
    //     {
    //         "name": "Page D",
    //         "uv": 2780,
    //         "pv": 3908
    //     },
    //     {
    //         "name": "Page E",
    //         "uv": 1890,
    //         "pv": 4800
    //     },
    //     {
    //         "name": "Page F",
    //         "uv": 2390,
    //         "pv": 3800
    //     },
    //     {
    //         "name": "Page G",
    //         "uv": 3490,
    //         "pv": 4300
    //     },
    // ]
    return (
        <div className='dashboard-container'>
            <div className='title'>
                Analytics DashBoard
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>Total Users</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.users
                                && dataOverview.users.total ?
                                <>
                                    {dataOverview.users.total}
                                </>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quizz</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countQuiz ?
                                <>
                                    {dataOverview.others.countQuiz}
                                </>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Questions</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countQuestions ?
                                <>
                                    {dataOverview.others.countQuestions}
                                </>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countAnswers ?
                                <>
                                    {dataOverview.others.countAnswers}
                                </>
                                :
                                <>0</>
                            }
                        </span>
                    </div>

                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="95%" height={"100%"}>
                        <BarChart data={dataChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="QZ" fill="#8884d8" />
                            <Bar dataKey="QS" fill="#82ca9d" />
                            <Bar dataKey="AS" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
export default DashBoard;