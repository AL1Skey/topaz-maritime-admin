import { Links, Meta } from "types";

export interface Data {
  data: Gallery[];
  links: Links;
  meta:  Meta;
}

export interface DataSingle {
  data: Gallery;
}

export interface Gallery {
  content:     string;
  created_at:  Date;
  description: string;
  id:          number;
  image:       string;
  slug:        string;
  title:       string;
  updated_at:  Date;
}