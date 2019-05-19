export const FILMS_SELECTED = "FILMS_SELECTED";
export const FILM_SELECTED = "FILM_SELECTED";
export const PERSON_SELECTED = "PERSON_SELECTED";
export const FILMS_FETCHED = "FILMS_FETCHED";
export const PERSON_FETCHED = "PERSON_FETCHED";
export const SEARCH_CLEARED = "SEARCH_CLEARED";
export const NONE_SELECTED = "NONE_SELECTED";
export const DATE_CHANGED = "DATE_CHANGED";
export const INDEX_SELECTED = "INDEX_SELECTED";

export const initialState = {
  select: NONE_SELECTED,
  films: [],
  film: [],
  newDate: "",
  personFilm: [],
  filmIndexSelected: 0
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
    case FILM_SELECTED:
      return {
        ...state,
        film: action.payload
      };
    case DATE_CHANGED:
      return {
        ...state,
        newDate: action.payload
      };
    case INDEX_SELECTED:
      return {
        ...state,
        filmIndexSelected: action.payload
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

export const filmSelectedActionCreator = film => ({
  type: FILM_SELECTED,
  payload: film
});

export const dateChangeActionCreator = date => ({
  type: DATE_CHANGED,
  payload: date
});

export const mapStateToProps = state => ({
  select: state.select,
  films: state.films,
  film: state.film,
  newDate: state.newDate,
  personFilm: state.personFilm,
  filmIndexSelected: state.filmIndexSelected
});

export const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  onFilmFetched: films => {
    dispatch(filmsFetchedActionCreator(films));
  },
  onPersonFetched: person => {
    dispatch(personFetchedActionCreator(person));
  },
  onFilmSelected: film => {
    dispatch(filmSelectedActionCreator(film));
  },
  onDateChanged: date => {
    dispatch(dateChangeActionCreator(date));
  }
});
