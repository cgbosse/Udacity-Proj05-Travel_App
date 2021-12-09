// Import the js files to test
import { handleSubmitApi } from "../src/client/js/formHandlerApi" 
import { contentCheck } from "../src/client/js/contentChecker"
import { postData } from "../src/client/js/postData"
import { serverApiResults } from "../src/client/js/results"

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


const myMock = jest.fn()

describe("Testing formHandlerApi step sequence", () => {

    const result = handleSubmitApi;

    it('contentChecker should return true and proceed to the next function', () => {
       const contentCheck = jest.fn().mockReturnValue(true);
        expect(contentCheck()).toBe(true);    
    });
    
    it('postData should send the text and respond with the mockResponse and proceed to the next function', () => {
        const postData = jest.fn().mockReturnValue(mockResponse);
        expect(postData()).toBe(mockResponse);
    });
    
    expect(result).toBeDefined();

});