import { contentCheck } from './js/contentChecker'
import { postData } from './js/postData'
import { serverApiResults } from './js/results'
import { handleSubmitApi } from './js/formHandlerApi'


import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

console.log(contentCheck);
console.log(handleSubmitApi);
console.log(postData);
console.log(serverApiResults);

alert("I EXIST")
console.log("CHANGE!!");

export {
    contentCheck,
    serverApiResults,
    postData,
    handleSubmitApi
    }