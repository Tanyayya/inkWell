

export interface Saved{
    postId: string;
}
export const SavedPosts=({saved}:{saved:Saved[]})=>{

    
    return<div>
        {saved.map((s) => (
          s.postId
            
        ))}
    </div>
}