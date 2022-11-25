import { combineReducers } from 'redux';
import { ADDED_CUSTOMER_FORM, REMOVE_CUSTOMER_FORM, UPDATE_CUSTOMER_FORM } from './Action';

export function CustomerAdded(Form) {
    // console.log('Form', Form);
    return {
        type: ADDED_CUSTOMER_FORM,
        payload: Form,
    }
}

export function CustomerDelete(Form) {
    return {
        type: REMOVE_CUSTOMER_FORM,
        payload: Form,
    }
}

export function CustomerUpdate(index, data) {
    return {
        type: UPDATE_CUSTOMER_FORM,
        payload: {
            index,
            data
        }
    }
}

export function UpdateHandler(status, data) {
    return {
        type: 'UPDATE_HANDLER',
        status,
        data
    }
}
const initialState = {
    CustomerDetails: [],
    isUpdate: false,
    updateData: {},
};
function CustomerForms(state = initialState, action) {
    switch (action.type) {
        case ADDED_CUSTOMER_FORM: {
            return {
                ...state,
                CustomerDetails: [...state.CustomerDetails, action.payload]
            };
        }

        case REMOVE_CUSTOMER_FORM:
            const filterList = state.CustomerDetails.filter((item, index) => index !== action.payload);
            return {
                ...state,
                CustomerDetails: filterList
            }
        case UPDATE_CUSTOMER_FORM: {
            const customerData = state?.CustomerDetails;
            customerData[action.payload.index] = action.payload.data;
            return {
                ...state,
                CustomerDetails: customerData,
            }
        }
        case 'UPDATE_HANDLER': {
            return {
                ...state,
                isUpdate: action.status,
                updateData: action.data,
            }
        }
        default:
            return state;
    }
}
const Customer = combineReducers({
    CustomerForms,
});
export default Customer;
