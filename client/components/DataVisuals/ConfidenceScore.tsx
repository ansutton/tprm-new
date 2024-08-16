import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Heading } from '@/components';
import { LlmResponse } from '@/types';

interface ConfidenceScoreProps {
    questionsData: string[];
    llmResponse: LlmResponse;
}

export function ConfidenceScore({
    questionsData,
    llmResponse,
}: ConfidenceScoreProps): JSX.Element {
    const data = questionsData?.map((question, index) => ({
        name: `Question ${index + 1}`,
        Confidence: question?.length + 16,
        Unconfidence: question?.length,
    }));

    return (
        <>
            <Heading level={4} additionalClasses='mb-4'>
                Confidence Score
            </Heading>
            <div className='h-[500px] w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                        width={1500}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip cursor={{ fill: 'transparent' }} />
                        <Legend />
                        <Bar dataKey='Confidence' fill='hsl(158, 64%, 52%)' />
                        <Bar dataKey='Unconfidence' fill='hsl(351, 95%, 71%)' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
