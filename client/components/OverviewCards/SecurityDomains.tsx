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
import { useTheme } from 'next-themes';
import { Card, Heading } from '@/components';
import { LlmResponse } from '@/types';

interface SecurityDomainsProps {
    questionsData: string[];
    llmResponse: LlmResponse;
}

export function SecurityDomains({
    questionsData,
    llmResponse,
}: SecurityDomainsProps): JSX.Element {
    /**
     * Constants
     */
    const data = questionsData?.map((question, index) => ({
        name: `Question ${index + 1}`,
        Aligned: question?.length + 16,
        Unaligned: question?.length,
    }));

    /**
     * Custom Hooks
     */
    const { resolvedTheme } = useTheme();

    /**
     * Theme-based Styles
     */
    const styles = {
        light: {
            axisStroke: 'hsl(0, 0%, 55%)',
            border: '1px solid hsl(0, 0%, 80%)',
            gridStroke: 'hsla(0, 0%, 80%, 0.5)',
            tooltipBackground: 'hsl(0, 0%, 100%)',
            tooltipColor: 'hsl(0, 0%, 0%)',
        },
        dark: {
            axisStroke: 'hsla(0, 0%, 98%, 0.8)',
            border: 'none',
            gridStroke: 'hsla(0, 0%, 50%, 0.5)',
            tooltipBackground: 'hsl(240, 5%, 26%)',
            tooltipColor: 'hsl(0, 0%, 98%)',
        },
    }[resolvedTheme || 'dark'];

    return (
        <Card>
            <Heading level={4} additionalClasses='mb-4'>
                Security Domains
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
                        <CartesianGrid stroke={styles?.gridStroke} />
                        <XAxis
                            stroke={styles?.axisStroke}
                            dataKey='name'
                            tickLine={false}
                        />
                        <YAxis stroke={styles?.axisStroke} tickLine={false} />
                        <Tooltip
                            contentStyle={{
                                background: `${styles?.tooltipBackground}`,
                                border: `${styles?.border}`,
                                borderRadius: '8px',
                                color: `${styles?.tooltipColor}`,
                                fontSize: '0.875rem', // 14px
                            }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Legend />
                        <Bar dataKey='Aligned' fill='hsl(158, 64%, 52%)' />
                        <Bar dataKey='Unaligned' fill='hsl(351, 95%, 71%)' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
