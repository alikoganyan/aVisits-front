import * as layout from '../actions/layout';

export interface State {
    showModal: boolean;
}

const initialState: State = {
    showModal: false
};

export function reducer(state = initialState, action: layout.Actions): State {
    switch(action.type) {
        case layout.OPEN_MODAL: {
            return {
                ...state,
                showModal: true
            };
        }

        case layout.CLOSE_MODAL: {
            return {
                ...state,
                showModal: false
            };
        }

        default: {
            return state;
        }
    }
}

export const getShowModal = (state: State) => state.showModal;