// Define MediaDetails interface
export interface MediaDetails {
    name: string;
    size: string; // Assuming size is a string like "2 MB". Use number if you prefer bytes.
}

// Define Post interface with MediaDetails
export interface Post {
    id: string;
    content: string;
    imageFile?: File | null;
    musicFile?: File | null;
    videoFile?: File | null;
    imageURL?: string;
    musicURL?: string;
    videoURL?: string;
    mediaDetails?: MediaDetails;
    location?: string;
}

//for chosse file component
export interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
}

//for chat page

export type Message = {
    id: number;
    name: string;
    messagePreview: string;
    avatarUrl: string;
    timeAgo: string;
    fullMessage: string;
};

//for psot context
export interface PostType {
    id: string;
    content: string;
    imageURL?: string;
    musicURL?: string;
    videoURL?: string;
    time: string;
    archived?: boolean;
    location?: string;
    comments: Comment[];
}


//for following and follower
export interface User {
    id: number;
    name: string;
    avatar: string;
}
