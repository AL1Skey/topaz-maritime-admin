



export interface User {
    id:         number;
    name:       string;
    email:      string;
    photo:      string;
    role:       Role;
    created_at: Date;
    updated_at: Date;
}

export interface Role {
    id:   number;
    name: string;
    slug: string;
}

export interface Response<T> {
    data: T;
}

export interface PaginatedResponse<T> {
    data: T;
    meta: Meta;
    links: Links;
}

export interface Links {
    first: string;
    last:  string;
    next:  string;
    prev:  null;
}

export interface Meta {
    current_page: number;
    from:         number;
    last_page:    number;
    links:        MetaLinks[];
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

export interface MetaLinks {
    active: boolean;
    label:  string;
    url:    null | string;
}
