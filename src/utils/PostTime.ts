export const timeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const secondsAgo = Math.round((now.getTime() - postDate.getTime()) / 1000);
    const minutesAgo = Math.round(secondsAgo / 60);
    const hoursAgo = Math.round(minutesAgo / 60);
    const daysAgo = Math.round(hoursAgo / 24);

    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
    else if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    else if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    else return `${daysAgo} days ago`;
};