// Import the js file to test
import { postData } from "../src/client/js/postData"

const mockResponse = {
    "status":{
        "code":"0",
        "msg":"OK",
        "credits":"1",
        "remaining_credits":"19975"
    },
    "model":"general_en",
    "score_tag":"NONE",
    "agreement":"AGREEMENT",
    "subjectivity":"OBJECTIVE",
    "confidence":"100",
    "irony":"NONIRONIC",
    "sentence_list":[
        {
            "text":"To be or not to be that is the question.",
            "inip":"0",
            "endp":"39",
            "bop":"y",
            "confidence":"100",
            "score_tag":"NONE",
            "agreement":"AGREEMENT",
            "segment_list":[
                {
                    "text":"To be",
                    "segment_type":"secondary",
                    "inip":"0",
                    "endp":"4",
                    "confidence":"100",
                    "score_tag":"NONE",
                    "agreement":"AGREEMENT",
                    "polarity_term_list":[
                    ]
                },
                {
                    "text":"not to be that is the question",
                    "segment_type":"main",
                    "inip":"9",
                    "endp":"38",
                    "confidence":"100",
                    "score_tag":"NONE",
                    "agreement":"AGREEMENT",
                    "polarity_term_list":[

                    ],
                    "sentimented_concept_list":[
                        {
                            "form":"question",
                            "id":"1b19e12452",
                            "variant":"question",
                            "inip":"31",
                            "endp":"38",
                            "type":"Top",
                            "score_tag":"NONE"
                        }
                    ]
                }
            ],
            "sentimented_entity_list":[
            ],
            "sentimented_concept_list":[
                {
                    "form":"question",
                    "id":"1b19e12452",
                    "type":"Top",
                    "score_tag":"NONE"
                }
            ]
        }
    ],
    "sentimented_entity_list":[
    ],
    "sentimented_concept_list":[
        {
            "form":"question",
            "id":"1b19e12452",
            "type":"Top",
            "score_tag":"NONE"
        }
    ]
};

const url = 'http://localhost:8081/textToAnalyze';
const testText = "To be or not to be that is the question.";


//Setup adapted from https://medium.com/fernandodof/how-to-mock-fetch-calls-with-jest-a666ae1e7752

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockResponse)
}));

describe('Mock postData', () => {
    let testpostingData;
    
    describe('When the data is posted to the server for the api call', () => {
        beforeEach(async () => {
            testpostingData = await postData(url, testText);
        });

        it('Then the mockResponse JSON object should be returned', () => {
            expect(testpostingData).toEqual(mockResponse);
        });
    });
});
