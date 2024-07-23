export interface User {
    full_name: string;
    email: string;
    google_profile_photo_url: string;
}

export interface Category {
    ID: number;
    ChildCategories: Category[];
    Name: string;
    ParentID: number;
}

export interface Part {
    ID: number;
    Name: string;
    Category: Category;
}