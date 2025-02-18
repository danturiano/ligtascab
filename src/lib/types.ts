export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      bounderies: {
        Row: {
          amount: number | null;
          created_at: string;
          id: string;
          payment_date: string | null;
          payment_status: Database["public"]["Enums"]["payment_status"];
        };
        Insert: {
          amount?: number | null;
          created_at?: string;
          id: string;
          payment_date?: string | null;
          payment_status: Database["public"]["Enums"]["payment_status"];
        };
        Update: {
          amount?: number | null;
          created_at?: string;
          id?: string;
          payment_date?: string | null;
          payment_status?: Database["public"]["Enums"]["payment_status"];
        };
        Relationships: [
          {
            foreignKeyName: "bounderies_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bounderies_id_fkey1";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          },
        ];
      };
      driver_logs: {
        Row: {
          created_at: string;
          driver_id: string | null;
          driver_name: string | null;
          id: number;
          log_type: Database["public"]["Enums"]["log_type"];
          operator_id: string;
          plate_number: string | null;
        };
        Insert: {
          created_at?: string;
          driver_id?: string | null;
          driver_name?: string | null;
          id?: number;
          log_type?: Database["public"]["Enums"]["log_type"];
          operator_id: string;
          plate_number?: string | null;
        };
        Update: {
          created_at?: string;
          driver_id?: string | null;
          driver_name?: string | null;
          id?: number;
          log_type?: Database["public"]["Enums"]["log_type"];
          operator_id?: string;
          plate_number?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "driver_logs_driver_id_fkey";
            columns: ["driver_id"];
            isOneToOne: false;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "driver_logs_plate_number_fkey";
            columns: ["plate_number"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["plate_number"];
          },
        ];
      };
      drivers: {
        Row: {
          first_name: string;
          id: string;
          last_name: string;
          license_expiry: string;
          license_number: string;
          operator_id: string;
          phone_number: string;
          status: Database["public"]["Enums"]["status"];
        };
        Insert: {
          first_name?: string;
          id?: string;
          last_name?: string;
          license_expiry: string;
          license_number: string;
          operator_id: string;
          phone_number?: string;
          status?: Database["public"]["Enums"]["status"];
        };
        Update: {
          first_name?: string;
          id?: string;
          last_name?: string;
          license_expiry?: string;
          license_number?: string;
          operator_id?: string;
          phone_number?: string;
          status?: Database["public"]["Enums"]["status"];
        };
        Relationships: [];
      };
      operators: {
        Row: {
          created_at: string;
          first_name: string | null;
          id: string;
          phone: string | null;
        };
        Insert: {
          created_at?: string;
          first_name?: string | null;
          id: string;
          phone?: string | null;
        };
        Update: {
          created_at?: string;
          first_name?: string | null;
          id?: string;
          phone?: string | null;
        };
        Relationships: [];
      };
      vehicle_assignments: {
        Row: {
          created_at: string;
          end_date: string | null;
          id: string;
          start_date: string;
          status: Database["public"]["Enums"]["status_driver"] | null;
        };
        Insert: {
          created_at?: string;
          end_date?: string | null;
          id: string;
          start_date: string;
          status?: Database["public"]["Enums"]["status_driver"] | null;
        };
        Update: {
          created_at?: string;
          end_date?: string | null;
          id?: string;
          start_date?: string;
          status?: Database["public"]["Enums"]["status_driver"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "vehicle_assignments_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "vehicle_assignments_id_fkey1";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          },
        ];
      };
      vehicles: {
        Row: {
          created_at: string;
          id: string;
          operator_id: string;
          plate_number: string;
          qr_code: string | null;
          registration_expiry: string;
          registration_number: string;
          status: Database["public"]["Enums"]["status"];
        };
        Insert: {
          created_at?: string;
          id?: string;
          operator_id: string;
          plate_number: string;
          qr_code?: string | null;
          registration_expiry: string;
          registration_number: string;
          status?: Database["public"]["Enums"]["status"];
        };
        Update: {
          created_at?: string;
          id?: string;
          operator_id?: string;
          plate_number?: string;
          qr_code?: string | null;
          registration_expiry?: string;
          registration_number?: string;
          status?: Database["public"]["Enums"]["status"];
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      log_type: "Time-in" | "Time-out";
      payment_status: "paid" | "pending" | "overdue";
      role: "admin" | "operator";
      status: "active" | "inactive" | "maintenance";
      status_driver: "active" | "completed" | "cancelled";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
