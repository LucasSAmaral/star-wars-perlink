export const FILMS_SELECTED = "FILMS_SELECTED";
export const PERSON_SELECTED = "PERSON_SELECTED";
export const FILMS_FETCHED = "FILMS_FETCHED";
export const PERSON_FETCHED = "PERSON_FETCHED";
export const SEARCH_CLEARED = "SEARCH_CLEARED";
export const NONE_SELECTED = "NONE_SELECTED";

export const initialState = {
  select: NONE_SELECTED,
  films: [],
  personFilm: []
};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case NONE_SELECTED:
      return {
        ...state,
        select: NONE_SELECTED
      };
    case SEARCH_CLEARED:
      return {
        ...state,
        films: [],
        personFilm: []
      };
    case FILMS_SELECTED:
      return {
        ...state,
        select: FILMS_SELECTED
      };
    case PERSON_SELECTED:
      return {
        ...state,
        select: PERSON_SELECTED
      };
    case FILMS_FETCHED:
      return {
        ...state,
        films: action.payload,
        select: FILMS_SELECTED
      };
    case PERSON_FETCHED:
      return {
        ...state,
        personFilm: action.payload,
        select: PERSON_SELECTED
      };
    default:
      return state;
  }
}

export const filmsFetchedActionCreator = films => ({
  type: FILMS_FETCHED,
  payload: films
});

export const personFetchedActionCreator = person => ({
  type: PERSON_FETCHED,
  payload: person
});
