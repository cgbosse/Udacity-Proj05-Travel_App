import { formCheck } from './js/formCheck'
import { handleSubmitApi } from './js/formHandlerApi'
import { postData } from './js/postData'
import { fillTripOverview } from './js/fillTripOverview'
import { daysTillTrip } from './js/daysTillTrip'
import { savedTripLog } from './js/savedTripLog'
import { updateTrip } from './js/updateTrip'
import { delTrip } from './js/deleteTrip'
import { clearForm } from './js/clearForm'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

console.log(formCheck);
console.log(handleSubmitApi);
console.log(postData);
console.log(fillTripOverview);
console.log(daysTillTrip);
console.log(savedTripLog);
console.log(updateTrip);
console.log(delTrip);
console.log(clearForm);

alert("Travelplanner Active")
console.log("Travelapp Initialized!!");

export {
    formCheck,
    handleSubmitApi,
    postData,
    fillTripOverview,
    daysTillTrip,
    savedTripLog,
    updateTrip,
    delTrip,
    clearForm
    }