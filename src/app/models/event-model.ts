export class EventModel{
    titleEvent?:         string;
    descripEvent?:       string;
    dateEvent?:          string;
    eventCategory?:    string;
    eventType?:   string;
    urlCoverPageEvent?:  string;
    urlWebPageEvent?:    string;
}

export class EventAddModal {
    eventId?:       string;
    title?:         string;
    descrip?:       string;
    date?:          string;
    eventCategory?:    string;
    eventType?:   string;
    eventUrlFile?:  string;
    urlWebSite?:    string;
    userFaveDate?:    string;
    eventLikes?: string;
}
