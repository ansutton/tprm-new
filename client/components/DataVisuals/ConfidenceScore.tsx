import { Line, LineChart } from 'recharts';

const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 200, pv: 1200, amt: 1200 },
    { name: 'Page C', uv: 300, pv: 1800, amt: 1800 },
];

export function ConfidenceScore(): JSX.Element {
    return (
        <>
            <div>ConfidenceScore</div>
            <LineChart width={400} height={400} data={data}>
                <Line type='monotone' dataKey='uv' stroke='#8884d8' />
            </LineChart>
        </>
    );
}
