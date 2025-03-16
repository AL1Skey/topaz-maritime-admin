import { Links, Meta } from "types";
import { Company } from "./company";

export interface Data {
  data:  Job[];
  links: Links;
  meta:  Meta;
}

export interface DataSingle {
  data:  Job;
}

export interface Job {
  author:       Author;
  company:      Company;
  content:      string;
  created_at:   Date;
  end_at:       Date;
  id:           number;
  image:        null;
  job_category: Company;
  position:     string;
  published_at: Date;
  salary_from:  null;
  salary_to:    null;
  slug:         string;
  start_at:     Date;
  title:        string;
  updated_at:   Date;
}

export interface Author {
  email: null;
  id:    number;
  name:  string;
  photo: string;
}
