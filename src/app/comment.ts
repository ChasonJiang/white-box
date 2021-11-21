import{ Comment,BaseComment } from "./interface/Comment";
import { USER_CARD_INFO } from "./user";

const BASE_COMMENT: BaseComment ={
    userInfo:USER_CARD_INFO,
    commentContent:"base comment content",
    replyTo:USER_CARD_INFO,
    commentTime:"2021-11-18",
};

export const COMMENT:Comment[]=[
    {
        userInfo:USER_CARD_INFO,
        commentContent:"comment content",
        reply:[BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT],
        commentTime:"2021-11-18",
    },
    {
        userInfo:USER_CARD_INFO,
        commentContent:"comment content",
        reply:[BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT],
        commentTime:"2021-11-18",
    },
    {
        userInfo:USER_CARD_INFO,
        commentContent:"comment content",
        reply:[BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT],
        commentTime:"2021-11-18",
    },
    {
        userInfo:USER_CARD_INFO,
        commentContent:"comment content",
        reply:[BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT],
        commentTime:"2021-11-18",
    },
];