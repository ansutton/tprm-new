import { Dispatch, SetStateAction, useState } from 'react';
import {
    ArrowPathIcon,
    ChartBarSquareIcon,
    ChatBubbleBottomCenterTextIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import * as XLSX from 'xlsx';
import {
    DetailedAnalysis,
    Overview,
    Button,
    Card,
    Heading,
    Sidebar,
    Topbar,
} from '@/components';
import { poll, submit, tw } from '@/utils';
import { Mode, Screen } from '@/types';

/**
 * Configuration and Constants
 */
// dotenv.config();
// const mode = process.env...;
// const mode: Mode = 'llm';

export default function Home(): JSX.Element {
    /**
     * State Hooks
     */
    const [screen, setScreen] = useState<Screen>('fileUpload');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
    const [isSidebarFullyExpanded, setIsSidebarFullyExpanded] =
        useState<boolean>(true);
    const [questionsFile, setQuestionsFile] = useState<File | null>(null);
    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
    const [responsesFile, setResponsesFile] = useState<File | null>(null);
    const [llmResponse, setLlmResponse] = useState<any>(null);
    const [excelData, setExcelData] = useState<any[][]>([]);
    const [questionsData, setQuestionsData] = useState<string[]>([]);
    const [mode, setMode] = useState<Mode>('llm');
    const [appLevelTableData, setAppLevelTableData] = useState<any>(null); // TODO: refactor to global state (currently prop drilling)

    /**
     * Helper Functions
     */
    const isFileValid = (file: File | null, fileType: string): file is File =>
        file !== null && file?.type === fileType;
    const isQuestionsFileValid = isFileValid(questionsFile, 'text/csv');
    const isEvidenceFileValid = isFileValid(evidenceFile, 'application/pdf');
    const isResponsesFileValid = isFileValid(
        responsesFile,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    const areAllFilesValid: boolean =
        isQuestionsFileValid && isEvidenceFileValid && isResponsesFileValid;
    function onFileChange(
        e: React.ChangeEvent<HTMLInputElement>,
        setState: Dispatch<SetStateAction<File | null>>,
    ) {
        if (e.target.files) {
            setState(e.target.files[0]);
        }
    }
    async function parseExcelFile(file: File): Promise<any[][]> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target?.result;
                if (arrayBuffer) {
                    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1,
                    });
                    resolve(jsonData as any[][]);
                } else {
                    reject('Error reading file');
                }
            };
            reader.readAsArrayBuffer(file);
        });
    }
    async function readFileAsText(file: File): Promise<string> {
        return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.readAsText(file);
        });
    }
    // TODO: revisit base64 encoding; revisit file passing from front end to back end
    async function readFileAsDataUrl(file: File): Promise<string> {
        return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.readAsDataURL(file);
        });
    }
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (questionsFile && evidenceFile && responsesFile) {
            const parsedExcelFile = await parseExcelFile(responsesFile);
            setExcelData(parsedExcelFile);
            const csvTextFile = await readFileAsText(questionsFile);
            const questionsArray = csvTextFile
                .split('\r\n')
                .filter(
                    (question) => question !== '' && question !== 'Questions',
                );
            setQuestionsData(questionsArray);
            setScreen('detailedAnalysis');
            console.log('🚀 ~ onSubmit ~ mode:', mode);
            switch (mode) {
                case 'demo':
                    // const demoPollResponse: PythonAppState = {
                    //     number_of_questions: questionsArray?.length,
                    //     questions: questionsArray,
                    //     responses: [],
                    // };
                    setLlmResponse({
                        number_of_questions: questionsArray?.length,
                        analyses: {
                            analysis_0: {
                                question:
                                    'What access control procedures are in place?',
                                tp_response:
                                    "Google follows a formal process to grant or revoke employee access to Google resources. Access to systems and data is granted only to authorized users. Access requests are reviewed and approved by an authorized second individual prior to being granted and the event is logged. Both user and internal access to customer data are restricted through the use of unique user account IDs and the Google Accounts Bring Your Own Identity (BYOID) system. Access to sensitive systems and applications requires two-factor authentication. Periodic reviews of access lists are implemented to ensure access to customer data is appropriate and authorized. Access to production machines, network devices and support tools is managed via an access group management system. Membership in these groups must be approved by respective group administrators. User group memberships are reviewed on a semiannual basis and any inappropriate access is removed. Access authorization in Google Cloud Platform is enforced at all relevant layers of the system. The granting or modification of access rights is based on the user's job responsibilities or on a need-to-know basis and must be authorized and approved by the user's functional manager or system owners. Access to all corporate and production resources are automatically removed upon submission of a termination request by the manager of any departing employee, or by the appropriate Human Resources manager.",
                                ai_analysis:
                                    "The document discusses various access control procedures that are in place to ensure the privacy and security of participants' personal information during a clinical trial. These procedures include:\n\n1. Participant consent: The document emphasizes the importance of obtaining informed consent from participants before collecting any personal information. This involves providing participants with a detailed description of the study, including the purpose, scope, and potential risks involved.\n2. De-identification: To protect participants' privacy, the document recommends de-identifying any personal information collected during the study. This involves removing any identifying information, such as names or addresses, from the data before analysis.\n3. Secure storage: The document highlights the importance of storing all personal information securely and in a manner that prevents unauthorized access. This may involve using encrypted databases or file systems, or storing physical copies of documents in secure locations.\n4. Access controls: The document suggests implementing strict access controls to limit who can view or modify personal information. This may involve using role-based access control (RBAC) or attribute-based access control (ABAC) to ensure that only authorized personnel have access to the data.\n5. Audit trails: To monitor and detect any unauthorized access to personal information, the document recommends maintaining detailed audit trails of all access attempts and successful login events. This can help identify potential security breaches and improve incident response capabilities.\n6. Training: The document emphasizes the importance of providing training to all personnel involved in the study on how to handle personal information securely and ethically. This may involve providing regular updates on privacy and security best practices, as well as conducting refresher training sessions to ensure that personnel are up-to-date on the latest procedures.\n7. Incident response planning: To address any potential security incidents, the document suggests developing an incident response plan that outlines the steps to be taken in the event of a security breach or other incident involving personal information. This may involve establishing a incident response team, conducting regular security audits and risk assessments, and providing training on how to respond to security incidents.\n\nBy following these access control procedures, organizations can help ensure that participants' personal information is protected throughout the clinical trial process.",
                                tp_confidence_score: 0.5424079298973083,
                                ai_confidence_score: 0.6465556025505066,
                            },
                        },
                    });
                    setInterval(() => {
                        setLlmResponse({
                            number_of_questions: questionsArray?.length,
                            analyses: {
                                analysis_0: {
                                    question:
                                        'What access control procedures are in place?',
                                    tp_response:
                                        "Google follows a formal process to grant or revoke employee access to Google resources. Access to systems and data is granted only to authorized users. Access requests are reviewed and approved by an authorized second individual prior to being granted and the event is logged. Both user and internal access to customer data are restricted through the use of unique user account IDs and the Google Accounts Bring Your Own Identity (BYOID) system. Access to sensitive systems and applications requires two-factor authentication. Periodic reviews of access lists are implemented to ensure access to customer data is appropriate and authorized. Access to production machines, network devices and support tools is managed via an access group management system. Membership in these groups must be approved by respective group administrators. User group memberships are reviewed on a semiannual basis and any inappropriate access is removed. Access authorization in Google Cloud Platform is enforced at all relevant layers of the system. The granting or modification of access rights is based on the user's job responsibilities or on a need-to-know basis and must be authorized and approved by the user's functional manager or system owners. Access to all corporate and production resources are automatically removed upon submission of a termination request by the manager of any departing employee, or by the appropriate Human Resources manager.",
                                    ai_analysis:
                                        "The document discusses various access control procedures that are in place to ensure the privacy and security of participants' personal information during a clinical trial. These procedures include:\n\n1. Participant consent: The document emphasizes the importance of obtaining informed consent from participants before collecting any personal information. This involves providing participants with a detailed description of the study, including the purpose, scope, and potential risks involved.\n2. De-identification: To protect participants' privacy, the document recommends de-identifying any personal information collected during the study. This involves removing any identifying information, such as names or addresses, from the data before analysis.\n3. Secure storage: The document highlights the importance of storing all personal information securely and in a manner that prevents unauthorized access. This may involve using encrypted databases or file systems, or storing physical copies of documents in secure locations.\n4. Access controls: The document suggests implementing strict access controls to limit who can view or modify personal information. This may involve using role-based access control (RBAC) or attribute-based access control (ABAC) to ensure that only authorized personnel have access to the data.\n5. Audit trails: To monitor and detect any unauthorized access to personal information, the document recommends maintaining detailed audit trails of all access attempts and successful login events. This can help identify potential security breaches and improve incident response capabilities.\n6. Training: The document emphasizes the importance of providing training to all personnel involved in the study on how to handle personal information securely and ethically. This may involve providing regular updates on privacy and security best practices, as well as conducting refresher training sessions to ensure that personnel are up-to-date on the latest procedures.\n7. Incident response planning: To address any potential security incidents, the document suggests developing an incident response plan that outlines the steps to be taken in the event of a security breach or other incident involving personal information. This may involve establishing a incident response team, conducting regular security audits and risk assessments, and providing training on how to respond to security incidents.\n\nBy following these access control procedures, organizations can help ensure that participants' personal information is protected throughout the clinical trial process.",
                                    tp_confidence_score: 0.5424079298973083,
                                    ai_confidence_score: 0.6465556025505066,
                                },
                                analysis_1: {
                                    question:
                                        'When was the access control policy last reviewed?',
                                    tp_response:
                                        'Our access control policies for Google Cloud Platform are reviewed annually to ensure they align with industry best practices and comply with relevant regulatory requirements. The last review was conducted in accordance with our scheduled policy review cycle, which ensures that we continuously manage and mitigate risks associated with access control. Additionally, we conduct ad-hoc reviews in response to significant changes in the threat landscape or operational changes within our services.',
                                    ai_analysis:
                                        'The access control policy was last reviewed on December 12, 2022.',
                                    tp_confidence_score: 0.5776870250701904,
                                    ai_confidence_score: 0.5677930116653442,
                                },
                            },
                        });
                        // console.log('llmResponse: ', llmResponse);
                    }, 2000);
                    break;
                case 'llm':
                    const csvFileBuffer =
                        await readFileAsDataUrl(questionsFile);
                    const pdfFileBuffer = await readFileAsDataUrl(evidenceFile);
                    // const xlsxFileBuffer = await readFileAsDataUrl(responsesFile)
                    submit({ csvFileBuffer, pdfFileBuffer, parsedExcelFile }); // xlsxFileBuffer});
                    setInterval(async () => {
                        const pollResponse = await poll();
                        console.log(
                            '🚀 ~ setInterval ~ pollResponse:',
                            pollResponse,
                        );
                        setLlmResponse(pollResponse);
                    }, 10000);
                    break;
            }
            setIsSidebarExpanded(true);
            setIsSidebarFullyExpanded(true);
            setQuestionsFile(null);
            setEvidenceFile(null);
            setResponsesFile(null);
        }
    }

    /**
     * Components
     */
    function AlertQuestionsFile(): JSX.Element {
        if (questionsFile && !isQuestionsFileValid) {
            return (
                <p className='text-orange-600 dark:text-orange-500'>
                    Please choose file type <b>csv</b> before proceeding
                </p>
            );
        } else {
            return <></>;
        }
    }
    function AlertEvidenceFile(): JSX.Element {
        if (evidenceFile && !isEvidenceFileValid) {
            return (
                <p className='text-orange-600 dark:text-orange-500'>
                    Please choose file type <b>pdf</b> before proceeding
                </p>
            );
        } else {
            return <></>;
        }
    }
    function AlertResponsesFile(): JSX.Element {
        if (responsesFile && !isResponsesFileValid) {
            return (
                <p className='text-orange-600 dark:text-orange-500'>
                    Please choose file type <b>xlsx</b> before proceeding
                </p>
            );
        } else {
            return <></>;
        }
    }

    /**
     * Return Statement
     */
    return (
        <div className='w-full dark:text-zinc-50'>
            <Topbar screen={screen} appLevelTableData={appLevelTableData} />

            {screen !== 'fileUpload' && (
                <Sidebar
                    isSidebarExpanded={isSidebarExpanded}
                    setIsSidebarExpanded={setIsSidebarExpanded}
                    isSidebarFullyExpanded={isSidebarFullyExpanded}
                    setIsSidebarFullyExpanded={setIsSidebarFullyExpanded}
                    screen={screen}
                    setScreen={setScreen}
                />
            )}

            <div
                className={clsx(
                    tw`pt-[87px]`,
                    tw`flex-1 transition-all duration-300 ease-in-out`,
                    screen === 'fileUpload' ? tw`px-16` : null,
                    screen !== 'fileUpload' && isSidebarExpanded
                        ? tw`pl-64`
                        : tw`pl-16`,
                )}
            >
                {screen === 'fileUpload' && (
                    <Heading level={3}>AI Evidence Reviewer</Heading>
                )}
                {screen === 'loading' && (
                    <Heading level={3}>Processing File</Heading>
                )}

                <div className='container mx-auto pb-5 pt-5'>
                    {screen === 'fileUpload' && (
                        <Card additionalClasses={tw`mx-auto max-w-2xl`}>
                            <div className='mx-auto flex flex-col gap-6'>
                                <div className='flex items-center gap-3'>
                                    <Heading
                                        level={4}
                                        startIcon={
                                            <QuestionMarkCircleIcon
                                                className={clsx(
                                                    'w-10 stroke-indigo-600 stroke-2',
                                                    'dark:stroke-indigo-500',
                                                )}
                                            />
                                        }
                                    >
                                        Blank Question Set
                                    </Heading>
                                </div>
                                <form
                                    className='flex flex-col gap-6'
                                    onSubmit={onSubmit}
                                >
                                    <p>
                                        Accepts file type: <b>csv</b>
                                    </p>
                                    <input
                                        accept='.csv'
                                        className='w-[450px] file:mr-4 file:cursor-pointer'
                                        id='file'
                                        onChange={(e) =>
                                            onFileChange(e, setQuestionsFile)
                                        }
                                        required
                                        type='file'
                                    />
                                    <AlertQuestionsFile />

                                    <Heading
                                        level={4}
                                        startIcon={
                                            <ChartBarSquareIcon
                                                className={clsx(
                                                    'w-10 stroke-indigo-600 stroke-2',
                                                    'dark:stroke-indigo-500',
                                                )}
                                            />
                                        }
                                    >
                                        Third Party Evidence Provided
                                    </Heading>
                                    <p>
                                        Accepts file type: <b>pdf</b>
                                    </p>
                                    <input
                                        accept='.pdf'
                                        className='w-[450px] file:mr-4 file:cursor-pointer'
                                        id='file'
                                        onChange={(e) =>
                                            onFileChange(e, setEvidenceFile)
                                        }
                                        required
                                        type='file'
                                    />
                                    <AlertEvidenceFile />

                                    <div className='flex items-center gap-3'>
                                        <Heading
                                            level={4}
                                            startIcon={
                                                <ChatBubbleBottomCenterTextIcon
                                                    className={clsx(
                                                        'w-10 stroke-indigo-600 stroke-2',
                                                        'dark:stroke-indigo-500',
                                                    )}
                                                />
                                            }
                                        >
                                            Third Party Responses
                                        </Heading>
                                    </div>
                                    <p>
                                        Accepts file type: <b>xlsx</b>
                                    </p>
                                    <input
                                        accept='.xlsx'
                                        className='file:mr-4 file:cursor-pointer'
                                        id='file'
                                        onChange={(e) =>
                                            onFileChange(e, setResponsesFile)
                                        }
                                        type='file'
                                    />
                                    <AlertResponsesFile />

                                    <Button
                                        variant={
                                            areAllFilesValid
                                                ? 'solid'
                                                : 'disabledSolid'
                                        }
                                        additionalClasses='mx-auto'
                                    >
                                        <input
                                            className={
                                                areAllFilesValid
                                                    ? 'hover:cursor-pointer'
                                                    : ''
                                            }
                                            disabled={!areAllFilesValid}
                                            type='submit'
                                            value='Submit'
                                        />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    )}

                    {screen === 'loading' && (
                        <>
                            <Heading level={4} additionalClasses='text-center'>
                                Hang tight. This process can take a while.
                            </Heading>
                            <p className='text-center font-medium text-zinc-600 dark:text-zinc-400'>
                                When finished loading, the Detailed Analysis
                                will be displayed on the next screen.
                            </p>
                            <ArrowPathIcon className='stroke-1.5 mx-auto size-14 animate-spin text-indigo-800 dark:text-indigo-500' />
                        </>
                    )}

                    {(screen === 'detailedAnalysis' ||
                        screen === 'overview') && (
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-4'>
                                {screen === 'detailedAnalysis' && (
                                    <DetailedAnalysis
                                        excelData={excelData}
                                        llmResponse={llmResponse}
                                        questionsData={questionsData}
                                        setAppLevelTableData={
                                            setAppLevelTableData
                                        }
                                    />
                                )}
                                {screen === 'overview' && (
                                    <Overview
                                        excelData={excelData}
                                        isSidebarExpanded={isSidebarExpanded}
                                        llmResponse={llmResponse}
                                        questionsData={questionsData}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
