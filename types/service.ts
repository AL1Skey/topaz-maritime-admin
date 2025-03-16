export interface Data {
  data: Service[];
}

export interface DataSingle {
  data: Service;
}

export interface Service {
  id:          number;
  title:       string;
  description: string;
  icon:        string;
  slug:        string;
  created_at:  Date;
  updated_at:  Date;
}