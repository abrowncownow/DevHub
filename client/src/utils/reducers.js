import { useReducer } from "react";

export const reducer = (state, action) => {
	switch (action.type) {
		default:
			return state;

		
		case "UPDATE_SAVED_PROJECTS":
			return {
				...state,
				saved_projects: [...action.saved_projects],
			};
		
	}
};

export function useProductReducer(initialState) {
	return useReducer(reducer, initialState);
  }