import { Links, Meta } from "types";

export interface Data {
  data: Company[];
  links: Links;
  meta:  Meta;
}

export interface DataSingle {
  data: Company;
}

export interface Company {
  id:         number;
  name:       string;
  slug:       string;
  logo:       string;
  created_at: Date;
  updated_at: Date;
}