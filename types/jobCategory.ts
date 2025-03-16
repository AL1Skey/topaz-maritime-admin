import { Links, Meta } from "types";
import { Role } from "@/types/role";

export interface Data {
  data:  JobCategory[];
  links: Links;
  meta:  Meta;
}

export interface DataSingle {
  data:  JobCategory;
}

export interface JobCategory {
  id:         number;
  name:       string;
  slug:       string;
  created_at: Date;
  updated_at: Date;
}