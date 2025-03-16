import { Links, Meta } from "types";
import { Role } from "@/types/role";

export interface Data {
  data:  Admin[];
  links: Links;
  meta:  Meta;
}

export interface DataSingle {
  data:  Admin;
}

export interface Admin {
  id:         number;
  name:       string;
  email:      string;
  photo:      string;
  role:       Role;
  created_at: Date;
  updated_at: Date;
}
