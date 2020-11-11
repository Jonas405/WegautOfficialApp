export class UserModel {
    userId?:       string;
    userType?:         string;
    userEmail?:       string;
    userName?:          string;
    userLastName?:    string;
    userBrand?:  string;
    userTradeName?:    string;
    userPass?:    string;
    userUrlProfilePicture?: string;
    userLevel?: string;
}

export class UserFollow{
    userIdFollower: string;
    userIdFollowed: string;
}

export class UserComment{
    commentId: string;
    eventId: string;
    userId: string;
    comment: string;
    commentDate: string;

}

