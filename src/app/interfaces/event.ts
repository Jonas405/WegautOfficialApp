export interface EventDetails {
    eventId?:       string;
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

export interface EventSheduleDetails{
   eventId?: string;
   eventName?:       string;
   eventDesc?:       string;
   eventDate?:       string;
   eventUrlPhoto?:    string;
   userName?:       string;
   userLastName?:       string;

}

export interface SelectedEventDetails{
    eventTitle?:            string;
    eventDescr?:            string;
    eventDate?:             string;
    eventCat?:              string;
    eventType?:             string;
    eventPrincipalPhoto?:   string;
    eventUrlWebSite?:       string;
    eventLikes?:            string;
    eventLocation?:         string;
    eventUserBrand?:        string;
    eventTradeName?:        string;
    eventUserPhoto?:        string;
    eventUserNickName?:     string;
}

export interface EventProfileUser{

    eventId?:              string;
    eventIdUser?:          string;
    eventTitle?:           string;
    eventDescr?:           string;
    eventDate?:            string;
    eventCat?:             string;
    eventType?:            string;
    eventPrincipalPhoto?:  string;
    eventUrlWebSite?:      string;
    eventLocation?:        string;

}

export interface EventComments{
    commentId:string;
    eventId:string;
    commmentDate:string;
    userIdComment:string;
    userId:string;
    userName:string;
    userLastName:string;
    userBrand: string;
    userPhoto: string;
    comment: string;
}




