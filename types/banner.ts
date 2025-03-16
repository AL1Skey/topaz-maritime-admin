export interface Data {
  data: Banner[];
}

export interface DataSingle {
  data: Banner;
}

export interface Banner {
  id:          number;
  title:       string;
  description: string;
  image:       string;
  created_at:  Date;
  updated_at:  Date;
}