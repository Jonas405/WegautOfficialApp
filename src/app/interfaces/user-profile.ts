export interface UserProfile {
    userId?: string;
    userType?: string;
    userName?: string;
    userLastName?: string;
    userBrand?: string;
    userTradeName?: string;
    userProfilePicture?: string;
    userLevel?: string;
    userNickName?: string;
    userAbout?: string;
    userFollow?: boolean;
    
}

export interface UserFollowersNumber{
    followersNumber: string;
}

export interface UserEventNum{
    userEventNumber: string;
}