import { Links, Meta } from "types";
import { Job } from "./job";

export interface Data {
  data:  JobApplication[];
  links: Links;
  meta:  Meta;
}

export interface DataSingle {
  data:  JobApplication;
}

export interface JobApplication {
  created_at:  Date;
  email:       string;
  id:          number;
  job_vacancy: Job;
  name:        string;
  phone:       string;
  updated_at:  Date;
}
