export type Expiry = {
  id: number;
  source_table: string;
  source_id: string;
  expiry_date: Date;
  mark_as_read: boolean;
  plate_number?: string;
  full_name?: null;
};
