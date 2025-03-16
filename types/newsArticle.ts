import { Links, Meta } from "types";

export interface Data {
  data:  NewsArticle[];
  links: Links;
  meta:  Meta;
}

export interface DataSingle {
  data:  NewsArticle;
}

export interface NewsArticle {
  id:           number;
  title:        string;
  slug:         string;
  content:      string;
  image:        string;
  author:       Author;
  published_at: Date;
  created_at:   Date;
  updated_at:   Date;
}

export interface Author {
  id:         number;
  name:       string;
  email:      string;
  photo:      string;
  created_at: Date;
  updated_at: Date;
}
