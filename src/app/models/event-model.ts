export class EventModel{
    eventUserId?:      string;
    titleEvent?:         string;
    descripEvent?:       string;
    dateEvent?:          string;
    eventCategory?:    string;
    eventType?:   string;
    urlCoverPageEvent?:  string;
    urlWebPageEvent?:    string;
    sponsor?:[];
    eventLocation?: string;
}

export class EventAddModal {
    eventId?:       string;
    eventUserId?:   string;
    title?:         string;
    descrip?:       string;
    date?:          string;
    eventCategory?:    string;
    eventType?:   string;
    eventUrlFile?:  string;
    urlWebSite?:    string;
    userFaveDate?:    string;
    sponsor?: [];
    eventLikes?: string;
}

export class EventPhoto{

    EventPhotoId?: string;
    eventId: string;
    userId: string;
    descrip: string;
    dateUpload: string;
    urlPhoto: string;
}
