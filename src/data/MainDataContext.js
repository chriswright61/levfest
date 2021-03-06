import React, { createContext, useEffect, useReducer } from "react";
import { feedCounter, fetchListData } from "../utilities/utilities";

export const MainDataContext = createContext();

const thisyear = new Date().getFullYear();
// get data from these urls
const mainApiListsURLs = {
  // api urls object
  venuesList:
    "http://www.levenshulmecommunityfestival.co.uk/api_levfest_venues_list ",
  eventsList:
    "http://www.levenshulmecommunityfestival.co.uk/api_levfest_events_list/" +
    thisyear,

  newsList:
    "http://www.levenshulmecommunityfestival.co.uk/api_levfest_news_list",
};

function MainDataContextProvider(props) {
  const initialState = {
    venuesListLoaded: false,
    eventsListLoaded: false,
    newsListLoaded: false,
    feedsCount: 0,
    loadCount: 0,
    venuesListData: [],
    venuesLongData: [],
    eventsListData: [],
    eventsListDataOld: [],
    eventsLongData: [],
    newsListData: [],
    newsLongData: [],
  };

  const [mainState, dispatch] = useReducer(reducerfn, initialState);

  function reducerfn(mainState, action) {
    switch (action.type) {
      case "FEEDS_COUNTED": {
        return {
          ...mainState,
          feedsCount: action.value,
        };
      }

      case "VENUES_LIST_DATA_LOADED": {
        return {
          ...mainState,
          venuesListLoaded: true,
          loadCount: mainState.loadCount + 1,
        };
      }

      case "EVENTS_LIST_DATA_LOADED": {
        return {
          ...mainState,
          eventsListLoaded: true,
          loadCount: mainState.loadCount + 1,
        };
      }

      case "NEWS_LIST_DATA_LOADED": {
        return {
          ...mainState,
          newsListLoaded: true,
          loadCount: mainState.loadCount + 1,
        };
      }

      case "ADD_NEWS_LIST_DATA": {
        return { ...mainState, newsListData: action.value };
      }

      case "ADD_VENUES_LIST_DATA": {
        return { ...mainState, venuesListData: action.value };
      }
      case "ADD_EVENTS_LIST_DATA": {
        return { ...mainState, eventsListData: action.value };
      }

      case "ADD_NEWS_DATA": {
        const newsdata = mainState.newsLongData;
        const newData = action.value;
        const used = newsdata.some((news) => news["id"] === newData.id);
        if (used) {
          // already exists so don't add data
          return { ...mainState };
        } else {
          // add data
          newsdata.push(action.value);
          return { ...mainState, newsLongData: newsdata };
        }
      }

      case "ADD_VENUE_DATA": {
        const venuedata = mainState.venuesLongData;
        const newData = action.value;
        const used = venuedata.some((venue) => venue["id"] === newData.id);
        if (used) {
          // already exists so don't add data
          return { ...mainState };
        } else {
          // add data
          venuedata.push(action.value);
          return { ...mainState, venuesLongData: venuedata };
        }
      }

      case "ADD_EVENT_DATA": {
        const eventdata = mainState.eventsLongData;
        const newData = action.value;
        const used = eventdata.some((event) => event["id"] === newData.id);
        if (used) {
          // already exists so don't add data
          return { ...mainState };
        } else {
          // add data
          eventdata.push(action.value);
          return { ...mainState, eventsLongData: eventdata };
        }
      }

      default: {
        return { ...mainState };
      }
    }
  }

  useEffect(() => {
    feedCounter(mainApiListsURLs, dispatch);
  }, []);

  useEffect(() => {
    fetchListData("venuesList", mainApiListsURLs, dispatch);
  }, []);

  useEffect(() => {
    fetchListData("eventsList", mainApiListsURLs, dispatch);
  }, []);

  useEffect(() => {
    fetchListData("newsList", mainApiListsURLs, dispatch);
  }, []);

  return (
    <MainDataContext.Provider value={{ mainState, dispatch }}>
      {props.children}
    </MainDataContext.Provider>
  );
}
export default MainDataContextProvider;
