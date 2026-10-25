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
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
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
      combo_items: {
        Row: {
          category_id: string;
          combo_id: string;
          quantity: number;
        };
        Insert: {
          category_id: string;
          combo_id: string;
          quantity: number;
        };
        Update: {
          category_id?: string;
          combo_id?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "combo_items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "combo_items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "combo_items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "combo_items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "combo_items_combo_id_fkey";
            columns: ["combo_id"];
            isOneToOne: false;
            referencedRelation: "combos";
            referencedColumns: ["id"];
          },
        ];
      };
      combos: {
        Row: {
          audience: Database["public"]["Enums"]["combo_audience"];
          created_at: string;
          created_by: string;
          id: string;
          name: string;
          package_price_crc: number | null;
          package_price_usd: number | null;
          status: Database["public"]["Enums"]["category_status"];
          updated_at: string;
          updated_by: string;
        };
        Insert: {
          audience: Database["public"]["Enums"]["combo_audience"];
          created_at?: string;
          created_by: string;
          id?: string;
          name: string;
          package_price_crc?: number | null;
          package_price_usd?: number | null;
          status?: Database["public"]["Enums"]["category_status"];
          updated_at?: string;
          updated_by: string;
        };
        Update: {
          audience?: Database["public"]["Enums"]["combo_audience"];
          created_at?: string;
          created_by?: string;
          id?: string;
          name?: string;
          package_price_crc?: number | null;
          package_price_usd?: number | null;
          status?: Database["public"]["Enums"]["category_status"];
          updated_at?: string;
          updated_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "combos_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "combos_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "combos_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "combos_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      damage_reports: {
        Row: {
          cause: Database["public"]["Enums"]["damage_cause"];
          created_at: string;
          created_by: string;
          description: string;
          id: string;
          impact_delta: number;
          reservation_id: string | null;
          unit_id: string;
        };
        Insert: {
          cause: Database["public"]["Enums"]["damage_cause"];
          created_at?: string;
          created_by: string;
          description: string;
          id?: string;
          impact_delta?: number;
          reservation_id?: string | null;
          unit_id: string;
        };
        Update: {
          cause?: Database["public"]["Enums"]["damage_cause"];
          created_at?: string;
          created_by?: string;
          description?: string;
          id?: string;
          impact_delta?: number;
          reservation_id?: string | null;
          unit_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "damage_reports_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "damage_reports_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "damage_reports_reservation_id_fkey";
            columns: ["reservation_id"];
            isOneToOne: false;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "damage_reports_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "equipment_units";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "damage_reports_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "maintenance_cost_by_unit";
            referencedColumns: ["unit_id"];
          },
          {
            foreignKeyName: "damage_reports_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_current_state";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "damage_reports_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_service_status";
            referencedColumns: ["unit_id"];
          },
        ];
      };
      deposits: {
        Row: {
          amount: number;
          created_at: string;
          created_by: string;
          currency: Database["public"]["Enums"]["currency_code"];
          id: string;
          reservation_id: string;
          resolved_at: string | null;
          resolved_by: string | null;
          retained_amount: number | null;
          retention_reason: string | null;
          status: Database["public"]["Enums"]["deposit_status"];
        };
        Insert: {
          amount: number;
          created_at?: string;
          created_by: string;
          currency: Database["public"]["Enums"]["currency_code"];
          id?: string;
          reservation_id: string;
          resolved_at?: string | null;
          resolved_by?: string | null;
          retained_amount?: number | null;
          retention_reason?: string | null;
          status?: Database["public"]["Enums"]["deposit_status"];
        };
        Update: {
          amount?: number;
          created_at?: string;
          created_by?: string;
          currency?: Database["public"]["Enums"]["currency_code"];
          id?: string;
          reservation_id?: string;
          resolved_at?: string | null;
          resolved_by?: string | null;
          retained_amount?: number | null;
          retention_reason?: string | null;
          status?: Database["public"]["Enums"]["deposit_status"];
        };
        Relationships: [
          {
            foreignKeyName: "deposits_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "deposits_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "deposits_reservation_id_fkey";
            columns: ["reservation_id"];
            isOneToOne: false;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "deposits_resolved_by_fkey";
            columns: ["resolved_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "deposits_resolved_by_fkey";
            columns: ["resolved_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      equipment_categories: {
        Row: {
          alert_expiry_days: number | null;
          alert_min_quantity: number | null;
          can_be_damaged: boolean;
          consumes_fuel: boolean;
          created_at: string;
          created_by: string;
          default_duration_minutes: number | null;
          deposit_crc: number | null;
          deposit_usd: number | null;
          group_name: string | null;
          guide_only: boolean;
          has_condition_photos: boolean;
          has_motor: boolean;
          id: string;
          is_reservable: boolean;
          name: string;
          status: Database["public"]["Enums"]["category_status"];
          tracking_mode: Database["public"]["Enums"]["tracking_mode"];
          units_are_interchangeable: boolean;
          updated_at: string;
          updated_by: string;
          usage_metric:
            | Database["public"]["Enums"]["usage_metric"]
            | null;
        };
        Insert: {
          alert_expiry_days?: number | null;
          alert_min_quantity?: number | null;
          can_be_damaged?: boolean;
          consumes_fuel?: boolean;
          created_at?: string;
          created_by: string;
          default_duration_minutes?: number | null;
          deposit_crc?: number | null;
          deposit_usd?: number | null;
          group_name?: string | null;
          guide_only?: boolean;
          has_condition_photos?: boolean;
          has_motor?: boolean;
          id?: string;
          is_reservable?: boolean;
          name: string;
          status?: Database["public"]["Enums"]["category_status"];
          tracking_mode: Database["public"]["Enums"]["tracking_mode"];
          units_are_interchangeable?: boolean;
          updated_at?: string;
          updated_by: string;
          usage_metric?:
            | Database["public"]["Enums"]["usage_metric"]
            | null;
        };
        Update: {
          alert_expiry_days?: number | null;
          alert_min_quantity?: number | null;
          can_be_damaged?: boolean;
          consumes_fuel?: boolean;
          created_at?: string;
          created_by?: string;
          default_duration_minutes?: number | null;
          deposit_crc?: number | null;
          deposit_usd?: number | null;
          group_name?: string | null;
          guide_only?: boolean;
          has_condition_photos?: boolean;
          has_motor?: boolean;
          id?: string;
          is_reservable?: boolean;
          name?: string;
          status?: Database["public"]["Enums"]["category_status"];
          tracking_mode?: Database["public"]["Enums"]["tracking_mode"];
          units_are_interchangeable?: boolean;
          updated_at?: string;
          updated_by?: string;
          usage_metric?:
            | Database["public"]["Enums"]["usage_metric"]
            | null;
        };
        Relationships: [
          {
            foreignKeyName: "equipment_categories_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "equipment_categories_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "equipment_categories_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "equipment_categories_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      equipment_stock: {
        Row: {
          category_id: string;
          expiry_date: string | null;
          quantity_available: number;
          quantity_damaged: number;
          quantity_in_repair: number;
          updated_at: string;
          updated_by: string;
        };
        Insert: {
          category_id: string;
          expiry_date?: string | null;
          quantity_available?: number;
          quantity_damaged?: number;
          quantity_in_repair?: number;
          updated_at?: string;
          updated_by: string;
        };
        Update: {
          category_id?: string;
          expiry_date?: string | null;
          quantity_available?: number;
          quantity_damaged?: number;
          quantity_in_repair?: number;
          updated_at?: string;
          updated_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "equipment_stock_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: true;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "equipment_stock_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: true;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_stock_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: true;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_stock_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: true;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_stock_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "equipment_stock_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      equipment_stock_movements: {
        Row: {
          category_id: string;
          created_at: string;
          created_by: string;
          from_available: number;
          from_damaged: number;
          from_in_repair: number;
          id: string;
          reason: string;
          to_available: number;
          to_damaged: number;
          to_in_repair: number;
        };
        Insert: {
          category_id: string;
          created_at?: string;
          created_by: string;
          from_available: number;
          from_damaged: number;
          from_in_repair: number;
          id?: string;
          reason: string;
          to_available: number;
          to_damaged: number;
          to_in_repair: number;
        };
        Update: {
          category_id?: string;
          created_at?: string;
          created_by?: string;
          from_available?: number;
          from_damaged?: number;
          from_in_repair?: number;
          id?: string;
          reason?: string;
          to_available?: number;
          to_damaged?: number;
          to_in_repair?: number;
        };
        Relationships: [
          {
            foreignKeyName: "equipment_stock_movements_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "equipment_stock_movements_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_stock_movements_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_stock_movements_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_stock_movements_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "equipment_stock_movements_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      equipment_units: {
        Row: {
          category_id: string;
          code: string;
          created_at: string;
          created_by: string;
          decommission_reason: string | null;
          decommissioned_at: string | null;
          fuel_level: number | null;
          fuel_max: number;
          id: string;
          impact_count: number;
          next_oil_change_at: number | null;
          status: Database["public"]["Enums"]["unit_status"];
          updated_at: string;
          updated_by: string;
          usage_total: number;
        };
        Insert: {
          category_id: string;
          code: string;
          created_at?: string;
          created_by: string;
          decommission_reason?: string | null;
          decommissioned_at?: string | null;
          fuel_level?: number | null;
          fuel_max?: number;
          id?: string;
          impact_count?: number;
          next_oil_change_at?: number | null;
          status?: Database["public"]["Enums"]["unit_status"];
          updated_at?: string;
          updated_by: string;
          usage_total?: number;
        };
        Update: {
          category_id?: string;
          code?: string;
          created_at?: string;
          created_by?: string;
          decommission_reason?: string | null;
          decommissioned_at?: string | null;
          fuel_level?: number | null;
          fuel_max?: number;
          id?: string;
          impact_count?: number;
          next_oil_change_at?: number | null;
          status?: Database["public"]["Enums"]["unit_status"];
          updated_at?: string;
          updated_by?: string;
          usage_total?: number;
        };
        Relationships: [
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_units_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "equipment_units_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "equipment_units_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "equipment_units_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      extra_compatibility: {
        Row: {
          extra_id: string;
          unit_id: string;
        };
        Insert: {
          extra_id: string;
          unit_id: string;
        };
        Update: {
          extra_id?: string;
          unit_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "extra_compatibility_extra_id_fkey";
            columns: ["extra_id"];
            isOneToOne: false;
            referencedRelation: "extras";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "extra_compatibility_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "equipment_units";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "extra_compatibility_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "maintenance_cost_by_unit";
            referencedColumns: ["unit_id"];
          },
          {
            foreignKeyName: "extra_compatibility_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_current_state";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "extra_compatibility_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_service_status";
            referencedColumns: ["unit_id"];
          },
        ];
      };
      extras: {
        Row: {
          created_at: string;
          created_by: string;
          id: string;
          name: string;
          occupies_category_id: string | null;
          occupies_quantity: number | null;
          price_crc: number | null;
          price_usd: number | null;
          status: Database["public"]["Enums"]["category_status"];
          updated_at: string;
          updated_by: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          id?: string;
          name: string;
          occupies_category_id?: string | null;
          occupies_quantity?: number | null;
          price_crc?: number | null;
          price_usd?: number | null;
          status?: Database["public"]["Enums"]["category_status"];
          updated_at?: string;
          updated_by: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: string;
          name?: string;
          occupies_category_id?: string | null;
          occupies_quantity?: number | null;
          price_crc?: number | null;
          price_usd?: number | null;
          status?: Database["public"]["Enums"]["category_status"];
          updated_at?: string;
          updated_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "extras_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "extras_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "extras_occupies_category_id_fkey";
            columns: ["occupies_category_id"];
            isOneToOne: false;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "extras_occupies_category_id_fkey";
            columns: ["occupies_category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "extras_occupies_category_id_fkey";
            columns: ["occupies_category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "extras_occupies_category_id_fkey";
            columns: ["occupies_category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "extras_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "extras_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      inventory_count_lines: {
        Row: {
          category_id: string;
          confirmed_status:
            | Database["public"]["Enums"]["unit_status"]
            | null;
          count_id: string;
          id: string;
          quantity_available: number | null;
          quantity_damaged: number | null;
          quantity_in_repair: number | null;
          system_quantity_available: number | null;
          system_quantity_damaged: number | null;
          system_quantity_in_repair: number | null;
          unit_id: string | null;
        };
        Insert: {
          category_id: string;
          confirmed_status?:
            | Database["public"]["Enums"]["unit_status"]
            | null;
          count_id: string;
          id?: string;
          quantity_available?: number | null;
          quantity_damaged?: number | null;
          quantity_in_repair?: number | null;
          system_quantity_available?: number | null;
          system_quantity_damaged?: number | null;
          system_quantity_in_repair?: number | null;
          unit_id?: string | null;
        };
        Update: {
          category_id?: string;
          confirmed_status?:
            | Database["public"]["Enums"]["unit_status"]
            | null;
          count_id?: string;
          id?: string;
          quantity_available?: number | null;
          quantity_damaged?: number | null;
          quantity_in_repair?: number | null;
          system_quantity_available?: number | null;
          system_quantity_damaged?: number | null;
          system_quantity_in_repair?: number | null;
          unit_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_count_lines_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_count_lines_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "inventory_count_lines_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "inventory_count_lines_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "inventory_count_lines_count_id_fkey";
            columns: ["count_id"];
            isOneToOne: false;
            referencedRelation: "inventory_counts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_count_lines_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "equipment_units";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_count_lines_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "maintenance_cost_by_unit";
            referencedColumns: ["unit_id"];
          },
          {
            foreignKeyName: "inventory_count_lines_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_current_state";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_count_lines_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_service_status";
            referencedColumns: ["unit_id"];
          },
        ];
      };
      inventory_counts: {
        Row: {
          counted_at: string;
          created_at: string;
          created_by: string;
          id: string;
          notes: string | null;
        };
        Insert: {
          counted_at?: string;
          created_at?: string;
          created_by: string;
          id?: string;
          notes?: string | null;
        };
        Update: {
          counted_at?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          notes?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_counts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "inventory_counts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      maintenance_records: {
        Row: {
          cost_amount: number | null;
          cost_currency:
            | Database["public"]["Enums"]["currency_code"]
            | null;
          created_at: string;
          created_by: string;
          description: string | null;
          id: string;
          is_external: boolean;
          performed_at: string;
          unit_id: string;
          updated_at: string;
          updated_by: string | null;
          work_type: string;
        };
        Insert: {
          cost_amount?: number | null;
          cost_currency?:
            | Database["public"]["Enums"]["currency_code"]
            | null;
          created_at?: string;
          created_by: string;
          description?: string | null;
          id?: string;
          is_external: boolean;
          performed_at: string;
          unit_id: string;
          updated_at?: string;
          updated_by?: string | null;
          work_type: string;
        };
        Update: {
          cost_amount?: number | null;
          cost_currency?:
            | Database["public"]["Enums"]["currency_code"]
            | null;
          created_at?: string;
          created_by?: string;
          description?: string | null;
          id?: string;
          is_external?: boolean;
          performed_at?: string;
          unit_id?: string;
          updated_at?: string;
          updated_by?: string | null;
          work_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "maintenance_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "maintenance_records_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "maintenance_records_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "equipment_units";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "maintenance_records_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "maintenance_cost_by_unit";
            referencedColumns: ["unit_id"];
          },
          {
            foreignKeyName: "maintenance_records_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_current_state";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "maintenance_records_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_service_status";
            referencedColumns: ["unit_id"];
          },
          {
            foreignKeyName: "maintenance_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "maintenance_records_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      password_reset_pins: {
        Row: {
          attempts: number;
          created_at: string;
          delivery_failed_at: string | null;
          expires_at: string;
          id: string;
          pin_hash: string;
          used_at: string | null;
          worker_id: string;
        };
        Insert: {
          attempts?: number;
          created_at?: string;
          delivery_failed_at?: string | null;
          expires_at: string;
          id?: string;
          pin_hash: string;
          used_at?: string | null;
          worker_id: string;
        };
        Update: {
          attempts?: number;
          created_at?: string;
          delivery_failed_at?: string | null;
          expires_at?: string;
          id?: string;
          pin_hash?: string;
          used_at?: string | null;
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "password_reset_pins_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "password_reset_pins_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      password_reset_requests: {
        Row: {
          created_at: string;
          id: string;
          network_key: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          network_key: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          network_key?: string;
        };
        Relationships: [];
      };
      refunds: {
        Row: {
          amount: number;
          created_at: string;
          created_by: string;
          currency: Database["public"]["Enums"]["currency_code"];
          id: string;
          reason: string;
          reservation_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          created_by: string;
          currency: Database["public"]["Enums"]["currency_code"];
          id?: string;
          reason: string;
          reservation_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          created_by?: string;
          currency?: Database["public"]["Enums"]["currency_code"];
          id?: string;
          reason?: string;
          reservation_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "refunds_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "refunds_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "refunds_reservation_id_fkey";
            columns: ["reservation_id"];
            isOneToOne: false;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
        ];
      };
      reservation_charges: {
        Row: {
          amount: number;
          created_at: string;
          created_by: string;
          currency: Database["public"]["Enums"]["currency_code"];
          id: string;
          kind: Database["public"]["Enums"]["charge_kind"];
          payment_method: string;
          reservation_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          created_by: string;
          currency: Database["public"]["Enums"]["currency_code"];
          id?: string;
          kind: Database["public"]["Enums"]["charge_kind"];
          payment_method: string;
          reservation_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          created_by?: string;
          currency?: Database["public"]["Enums"]["currency_code"];
          id?: string;
          kind?: Database["public"]["Enums"]["charge_kind"];
          payment_method?: string;
          reservation_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservation_charges_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservation_charges_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_charges_reservation_id_fkey";
            columns: ["reservation_id"];
            isOneToOne: false;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
        ];
      };
      reservation_dispatches: {
        Row: {
          category_id: string;
          closed_at: string | null;
          created_at: string;
          created_by: string;
          dispatched_at: string;
          duration_minutes: number;
          ends_at: string | null;
          extra_time_minutes: number;
          id: string;
          reservation_id: string;
          updated_at: string;
          updated_by: string;
        };
        Insert: {
          category_id: string;
          closed_at?: string | null;
          created_at?: string;
          created_by: string;
          dispatched_at: string;
          duration_minutes: number;
          ends_at?: never;
          extra_time_minutes?: number;
          id?: string;
          reservation_id: string;
          updated_at?: string;
          updated_by: string;
        };
        Update: {
          category_id?: string;
          closed_at?: string | null;
          created_at?: string;
          created_by?: string;
          dispatched_at?: string;
          duration_minutes?: number;
          ends_at?: never;
          extra_time_minutes?: number;
          id?: string;
          reservation_id?: string;
          updated_at?: string;
          updated_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservation_dispatches_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_dispatches_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "reservation_dispatches_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "reservation_dispatches_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "reservation_dispatches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservation_dispatches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_dispatches_reservation_id_fkey";
            columns: ["reservation_id"];
            isOneToOne: false;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_dispatches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservation_dispatches_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      reservation_guides: {
        Row: {
          assigned_at: string;
          assigned_by: string;
          reservation_id: string;
          worker_id: string;
        };
        Insert: {
          assigned_at?: string;
          assigned_by: string;
          reservation_id: string;
          worker_id: string;
        };
        Update: {
          assigned_at?: string;
          assigned_by?: string;
          reservation_id?: string;
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservation_guides_assigned_by_fkey";
            columns: ["assigned_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservation_guides_assigned_by_fkey";
            columns: ["assigned_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_guides_reservation_id_fkey";
            columns: ["reservation_id"];
            isOneToOne: false;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_guides_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservation_guides_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      reservation_items: {
        Row: {
          category_id: string | null;
          created_at: string;
          created_by: string;
          dispatch_id: string | null;
          extra_id: string | null;
          fuel_in: number | null;
          fuel_out: number | null;
          id: string;
          quantity: number | null;
          reservation_id: string;
          unit_id: string | null;
          updated_at: string;
          updated_by: string;
          usage_in: number | null;
          usage_out: number | null;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string;
          created_by: string;
          dispatch_id?: string | null;
          extra_id?: string | null;
          fuel_in?: number | null;
          fuel_out?: number | null;
          id?: string;
          quantity?: number | null;
          reservation_id: string;
          unit_id?: string | null;
          updated_at?: string;
          updated_by: string;
          usage_in?: number | null;
          usage_out?: number | null;
        };
        Update: {
          category_id?: string | null;
          created_at?: string;
          created_by?: string;
          dispatch_id?: string | null;
          extra_id?: string | null;
          fuel_in?: number | null;
          fuel_out?: number | null;
          id?: string;
          quantity?: number | null;
          reservation_id?: string;
          unit_id?: string | null;
          updated_at?: string;
          updated_by?: string;
          usage_in?: number | null;
          usage_out?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "reservation_items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "reservation_items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "reservation_items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "reservation_items_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservation_items_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_items_dispatch_id_fkey";
            columns: ["dispatch_id"];
            isOneToOne: false;
            referencedRelation: "reservation_dispatches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_items_extra_id_fkey";
            columns: ["extra_id"];
            isOneToOne: false;
            referencedRelation: "extras";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_items_reservation_id_fkey";
            columns: ["reservation_id"];
            isOneToOne: false;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_items_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "equipment_units";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_items_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "maintenance_cost_by_unit";
            referencedColumns: ["unit_id"];
          },
          {
            foreignKeyName: "reservation_items_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_current_state";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_items_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_service_status";
            referencedColumns: ["unit_id"];
          },
          {
            foreignKeyName: "reservation_items_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservation_items_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      reservation_postponements: {
        Row: {
          created_at: string;
          created_by: string;
          id: string;
          new_starts_at: string;
          previous_starts_at: string;
          reason: string;
          reservation_id: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          id?: string;
          new_starts_at: string;
          previous_starts_at: string;
          reason: string;
          reservation_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: string;
          new_starts_at?: string;
          previous_starts_at?: string;
          reason?: string;
          reservation_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservation_postponements_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservation_postponements_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_postponements_reservation_id_fkey";
            columns: ["reservation_id"];
            isOneToOne: false;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
        ];
      };
      reservation_pricing: {
        Row: {
          agreed_amount_crc: number | null;
          agreed_amount_usd: number | null;
          created_at: string;
          created_by: string | null;
          list_amount_crc: number | null;
          list_amount_usd: number | null;
          reservation_id: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          agreed_amount_crc?: number | null;
          agreed_amount_usd?: number | null;
          created_at?: string;
          created_by?: string | null;
          list_amount_crc?: number | null;
          list_amount_usd?: number | null;
          reservation_id: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          agreed_amount_crc?: number | null;
          agreed_amount_usd?: number | null;
          created_at?: string;
          created_by?: string | null;
          list_amount_crc?: number | null;
          list_amount_usd?: number | null;
          reservation_id?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "reservation_pricing_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservation_pricing_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_pricing_reservation_id_fkey";
            columns: ["reservation_id"];
            isOneToOne: true;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservation_pricing_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservation_pricing_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      reservations: {
        Row: {
          cancellation_reason: string | null;
          closed_at: string | null;
          code: string;
          combo_id: string | null;
          created_at: string;
          created_by: string;
          customer_name: string;
          dispatched_at: string | null;
          duration_minutes: number;
          ends_at: string | null;
          extra_time_minutes: number;
          id: string;
          parent_reservation_id: string | null;
          people_count: number;
          starts_at: string;
          status: Database["public"]["Enums"]["reservation_status"];
          type: Database["public"]["Enums"]["reservation_type"];
          updated_at: string;
          updated_by: string;
        };
        Insert: {
          cancellation_reason?: string | null;
          closed_at?: string | null;
          code?: string;
          combo_id?: string | null;
          created_at?: string;
          created_by: string;
          customer_name: string;
          dispatched_at?: string | null;
          duration_minutes: number;
          ends_at?: never;
          extra_time_minutes?: number;
          id?: string;
          parent_reservation_id?: string | null;
          people_count: number;
          starts_at: string;
          status?: Database["public"]["Enums"]["reservation_status"];
          type: Database["public"]["Enums"]["reservation_type"];
          updated_at?: string;
          updated_by: string;
        };
        Update: {
          cancellation_reason?: string | null;
          closed_at?: string | null;
          code?: string;
          combo_id?: string | null;
          created_at?: string;
          created_by?: string;
          customer_name?: string;
          dispatched_at?: string | null;
          duration_minutes?: number;
          ends_at?: never;
          extra_time_minutes?: number;
          id?: string;
          parent_reservation_id?: string | null;
          people_count?: number;
          starts_at?: string;
          status?: Database["public"]["Enums"]["reservation_status"];
          type?: Database["public"]["Enums"]["reservation_type"];
          updated_at?: string;
          updated_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservations_combo_id_fkey";
            columns: ["combo_id"];
            isOneToOne: false;
            referencedRelation: "combos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservations_parent_reservation_id_fkey";
            columns: ["parent_reservation_id"];
            isOneToOne: false;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "reservations_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      session_activity: {
        Row: {
          last_activity_at: string;
          session_id: string;
          user_id: string;
        };
        Insert: {
          last_activity_at?: string;
          session_id: string;
          user_id: string;
        };
        Update: {
          last_activity_at?: string;
          session_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      tariffs: {
        Row: {
          amount_crc: number | null;
          amount_usd: number | null;
          category_id: string;
          created_at: string;
          created_by: string;
          id: string;
          type: Database["public"]["Enums"]["reservation_type"];
          updated_at: string;
          updated_by: string;
        };
        Insert: {
          amount_crc?: number | null;
          amount_usd?: number | null;
          category_id: string;
          created_at?: string;
          created_by: string;
          id?: string;
          type: Database["public"]["Enums"]["reservation_type"];
          updated_at?: string;
          updated_by: string;
        };
        Update: {
          amount_crc?: number | null;
          amount_usd?: number | null;
          category_id?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          type?: Database["public"]["Enums"]["reservation_type"];
          updated_at?: string;
          updated_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tariffs_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tariffs_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "tariffs_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "tariffs_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "tariffs_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "tariffs_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tariffs_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "tariffs_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      unit_condition_photos: {
        Row: {
          angle: Database["public"]["Enums"]["photo_angle"];
          id: string;
          storage_path: string;
          unit_id: string;
          uploaded_at: string;
          uploaded_by: string;
        };
        Insert: {
          angle: Database["public"]["Enums"]["photo_angle"];
          id?: string;
          storage_path: string;
          unit_id: string;
          uploaded_at?: string;
          uploaded_by: string;
        };
        Update: {
          angle?: Database["public"]["Enums"]["photo_angle"];
          id?: string;
          storage_path?: string;
          unit_id?: string;
          uploaded_at?: string;
          uploaded_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "unit_condition_photos_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "equipment_units";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "unit_condition_photos_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "maintenance_cost_by_unit";
            referencedColumns: ["unit_id"];
          },
          {
            foreignKeyName: "unit_condition_photos_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_current_state";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "unit_condition_photos_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "unit_service_status";
            referencedColumns: ["unit_id"];
          },
          {
            foreignKeyName: "unit_condition_photos_uploaded_by_fkey";
            columns: ["uploaded_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "unit_condition_photos_uploaded_by_fkey";
            columns: ["uploaded_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      worker_areas: {
        Row: {
          area: Database["public"]["Enums"]["work_area"];
          granted_at: string;
          granted_by: string;
          worker_id: string;
        };
        Insert: {
          area: Database["public"]["Enums"]["work_area"];
          granted_at?: string;
          granted_by: string;
          worker_id: string;
        };
        Update: {
          area?: Database["public"]["Enums"]["work_area"];
          granted_at?: string;
          granted_by?: string;
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "worker_areas_granted_by_fkey";
            columns: ["granted_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "worker_areas_granted_by_fkey";
            columns: ["granted_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "worker_areas_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "worker_areas_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      worker_marks: {
        Row: {
          granted_at: string;
          granted_by: string;
          mark: Database["public"]["Enums"]["worker_mark"];
          worker_id: string;
        };
        Insert: {
          granted_at?: string;
          granted_by: string;
          mark: Database["public"]["Enums"]["worker_mark"];
          worker_id: string;
        };
        Update: {
          granted_at?: string;
          granted_by?: string;
          mark?: Database["public"]["Enums"]["worker_mark"];
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "worker_marks_granted_by_fkey";
            columns: ["granted_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "worker_marks_granted_by_fkey";
            columns: ["granted_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "worker_marks_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "worker_marks_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
      workers: {
        Row: {
          base_role: Database["public"]["Enums"]["work_area"];
          blocked_reason:
            | Database["public"]["Enums"]["worker_blocked_reason"]
            | null;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          expires_at: string | null;
          failed_attempts: number;
          full_name: string;
          id: string;
          is_external_guide: boolean;
          last_work_area:
            Database["public"]["Enums"]["work_area"] | null;
          must_change_password: boolean;
          national_id: string | null;
          personal_email: string | null;
          status: Database["public"]["Enums"]["worker_status"];
          updated_at: string;
          updated_by: string | null;
          username: string;
        };
        Insert: {
          base_role: Database["public"]["Enums"]["work_area"];
          blocked_reason?:
            | Database["public"]["Enums"]["worker_blocked_reason"]
            | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          expires_at?: string | null;
          failed_attempts?: number;
          full_name: string;
          id: string;
          is_external_guide?: boolean;
          last_work_area?:
            Database["public"]["Enums"]["work_area"] | null;
          must_change_password?: boolean;
          national_id?: string | null;
          personal_email?: string | null;
          status?: Database["public"]["Enums"]["worker_status"];
          updated_at?: string;
          updated_by?: string | null;
          username: string;
        };
        Update: {
          base_role?: Database["public"]["Enums"]["work_area"];
          blocked_reason?:
            | Database["public"]["Enums"]["worker_blocked_reason"]
            | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          expires_at?: string | null;
          failed_attempts?: number;
          full_name?: string;
          id?: string;
          is_external_guide?: boolean;
          last_work_area?:
            Database["public"]["Enums"]["work_area"] | null;
          must_change_password?: boolean;
          national_id?: string | null;
          personal_email?: string | null;
          status?: Database["public"]["Enums"]["worker_status"];
          updated_at?: string;
          updated_by?: string | null;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workers_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "workers_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workers_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "reservations_by_worker";
            referencedColumns: ["worker_id"];
          },
          {
            foreignKeyName: "workers_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "workers";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      daily_reservation_counts: {
        Row: {
          day: string | null;
          reservations_count: number | null;
        };
        Relationships: [];
      };
      daily_revenue_report: {
        Row: {
          currency:
            | Database["public"]["Enums"]["currency_code"]
            | null;
          day: string | null;
          gross_amount: number | null;
          net_amount: number | null;
          refunds_amount: number | null;
          retained_amount: number | null;
        };
        Relationships: [];
      };
      financial_movements: {
        Row: {
          currency:
            | Database["public"]["Enums"]["currency_code"]
            | null;
          gross_amount: number | null;
          occurred_on: string | null;
          refunds_amount: number | null;
          retained_amount: number | null;
        };
        Relationships: [];
      };
      inventory_category_summary: {
        Row: {
          category_id: string | null;
          category_name: string | null;
          is_reservable: boolean | null;
          quantity_available: number | null;
          quantity_damaged: number | null;
          quantity_in_maintenance: number | null;
          quantity_in_repair: number | null;
          quantity_total: number | null;
          tracking_mode:
            | Database["public"]["Enums"]["tracking_mode"]
            | null;
        };
        Relationships: [];
      };
      inventory_expiry_alerts: {
        Row: {
          alert_expiry_days: number | null;
          category_id: string | null;
          category_name: string | null;
          days_to_expiry: number | null;
          expiry_date: string | null;
          is_expired: boolean | null;
        };
        Relationships: [];
      };
      inventory_quantity_alerts: {
        Row: {
          alert_min_quantity: number | null;
          category_id: string | null;
          category_name: string | null;
          missing_quantity: number | null;
          quantity_available: number | null;
        };
        Relationships: [];
      };
      maintenance_cost_by_unit: {
        Row: {
          category_id: string | null;
          currency:
            | Database["public"]["Enums"]["currency_code"]
            | null;
          last_performed_at: string | null;
          records_count: number | null;
          total_cost: number | null;
          unit_code: string | null;
          unit_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
        ];
      };
      monthly_reservation_counts: {
        Row: {
          month: string | null;
          reservations_count: number | null;
        };
        Relationships: [];
      };
      monthly_revenue_report: {
        Row: {
          currency:
            | Database["public"]["Enums"]["currency_code"]
            | null;
          gross_amount: number | null;
          month: string | null;
          net_amount: number | null;
          refunds_amount: number | null;
          retained_amount: number | null;
        };
        Relationships: [];
      };
      reservations_by_worker: {
        Row: {
          first_reservation_at: string | null;
          last_reservation_at: string | null;
          reservations_count: number | null;
          worker_id: string | null;
          worker_name: string | null;
        };
        Relationships: [];
      };
      unit_current_state: {
        Row: {
          category_id: string | null;
          code: string | null;
          effective_status: string | null;
          id: string | null;
          recorded_status:
            | Database["public"]["Enums"]["unit_status"]
            | null;
          reservation_id: string | null;
          returns_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "reservation_dispatches_reservation_id_fkey";
            columns: ["reservation_id"];
            isOneToOne: false;
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
        ];
      };
      unit_service_status: {
        Row: {
          category_id: string | null;
          category_name: string | null;
          code: string | null;
          is_oil_change_due: boolean | null;
          next_oil_change_at: number | null;
          remaining_usage: number | null;
          status:
            | Database["public"]["Enums"]["unit_status"]
            | null;
          unit_id: string | null;
          usage_metric:
            | Database["public"]["Enums"]["usage_metric"]
            | null;
          usage_total: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "equipment_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_category_summary";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_expiry_alerts";
            referencedColumns: ["category_id"];
          },
          {
            foreignKeyName: "equipment_units_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "inventory_quantity_alerts";
            referencedColumns: ["category_id"];
          },
        ];
      };
    };
    Functions: {
      block_worker: {
        Args: { target_worker: string };
        Returns: string;
      };
      category_availability: {
        Args: {
          p_category_id: string;
          p_ends_at: string;
          p_exclude_reservation?: string;
          p_starts_at: string;
        };
        Returns: {
          committed: number;
          free: number;
          usable: number;
        }[];
      };
      choose_work_area: {
        Args: {
          target: Database["public"]["Enums"]["work_area"];
        };
        Returns: string;
      };
      complete_first_password_change: {
        Args: { p_user_id: string };
        Returns: undefined;
      };
      consume_password_reset_pin: {
        Args: { p_pin: string; p_username: string };
        Returns: string;
      };
      current_session_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      current_session_is_live: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      current_session_state: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      current_work_area: {
        Args: Record<PropertyKey, never>;
        Returns: Database["public"]["Enums"]["work_area"];
      };
      custom_access_token_hook: {
        Args: { event: Json };
        Returns: Json;
      };
      finish_password_recovery: {
        Args: { p_user_id: string };
        Returns: undefined;
      };
      grant_worker_area: {
        Args: {
          target_area: Database["public"]["Enums"]["work_area"];
          target_worker: string;
        };
        Returns: string;
      };
      grant_worker_mark: {
        Args: {
          target_mark: Database["public"]["Enums"]["worker_mark"];
          target_worker: string;
        };
        Returns: string;
      };
      grantable_worker_areas: {
        Args: Record<PropertyKey, never>;
        Returns: Database["public"]["Enums"]["work_area"][];
      };
      grantable_worker_marks: {
        Args: Record<PropertyKey, never>;
        Returns: Database["public"]["Enums"]["worker_mark"][];
      };
      has_area: {
        Args: {
          target: Database["public"]["Enums"]["work_area"];
        };
        Returns: boolean;
      };
      has_mark: {
        Args: {
          target: Database["public"]["Enums"]["worker_mark"];
        };
        Returns: boolean;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      issue_password_reset_pin: {
        Args: {
          p_network_key: string;
          p_pin: string;
          p_username: string;
        };
        Returns: {
          lifetime_minutes: number;
          personal_email: string;
          pin_id: string;
        }[];
      };
      mark_password_reset_pin_undelivered: {
        Args: { p_pin_id: string };
        Returns: undefined;
      };
      next_reservation_code: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      password_reset_limit_window_minutes: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      password_reset_network_hourly_limit: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      password_reset_pin_attempt_limit: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      password_reset_pin_hash_cost: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      password_reset_pin_length: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      password_reset_pin_lifetime_minutes: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      password_reset_request_cooldown_seconds: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      password_reset_request_hourly_limit: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      password_reset_retention_hours: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      prepare_worker_temporary_password: {
        Args: { target_worker: string };
        Returns: string;
      };
      purge_ended_session_activity: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      purge_expired_history: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      purge_password_reset_records: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      record_failed_sign_in: {
        Args: { p_username: string };
        Returns: undefined;
      };
      record_successful_sign_in: {
        Args: { p_user_id: string };
        Returns: undefined;
      };
      revoke_worker_area: {
        Args: {
          target_area: Database["public"]["Enums"]["work_area"];
          target_worker: string;
        };
        Returns: string;
      };
      revoke_worker_mark: {
        Args: {
          target_mark: Database["public"]["Enums"]["worker_mark"];
          target_worker: string;
        };
        Returns: string;
      };
      revoke_worker_sessions: {
        Args: { target_worker: string };
        Returns: undefined;
      };
      session_idle_expired: {
        Args: { last_activity: string; moment: string };
        Returns: boolean;
      };
      session_idle_limit: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      session_is_live: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      session_last_activity: {
        Args: {
          signed_in_at: string;
          target_session: string;
        };
        Returns: string;
      };
      sign_in_attempt_limit: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      touch_current_session_activity: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      unit_conflicts: {
        Args: {
          p_ends_at: string;
          p_exclude_reservation?: string;
          p_starts_at: string;
          p_unit_id: string;
        };
        Returns: {
          code: string;
          ends_at: string;
          reservation_id: string;
          starts_at: string;
        }[];
      };
      unlock_worker: {
        Args: { target_worker: string };
        Returns: string;
      };
      workday_contains: {
        Args: { moment: string };
        Returns: boolean;
      };
      workday_end: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      workday_start: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      workday_time_zone: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      worker_display_names: {
        Args: { p_worker_ids: string[] };
        Returns: {
          full_name: string;
          worker_id: string;
        }[];
      };
    };
    Enums: {
      category_status: "active" | "inactive";
      charge_kind: "tariff" | "extra_time";
      combo_audience: "national" | "foreign";
      currency_code: "USD" | "CRC";
      damage_cause:
        | "rollover"
        | "collision"
        | "machine_failure"
        | "other";
      deposit_status:
        | "held"
        | "returned"
        | "retained"
        | "partially_retained";
      photo_angle:
        "right_side" | "left_side" | "front" | "bottom";
      reservation_status:
        "scheduled" | "dispatched" | "closed" | "cancelled";
      reservation_type: "rental" | "tour" | "combo";
      tracking_mode: "by_unit" | "by_quantity";
      unit_status:
        | "available"
        | "in_maintenance"
        | "damaged"
        | "in_repair"
        | "decommissioned";
      usage_metric: "engine_hours" | "kilometers";
      work_area:
        "administracion" | "reservas" | "operaciones";
      worker_blocked_reason:
        "failed_attempts" | "administration";
      worker_mark:
        | "guia"
        | "encargado_general"
        | "registro_guias_externos";
      worker_status: "active" | "blocked";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<
  Database,
  "__InternalSupabase"
>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends
    (DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
      : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends
    (DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
      : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends
    (DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
      : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends
    (PublicCompositeTypeNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
      : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      category_status: ["active", "inactive"],
      charge_kind: ["tariff", "extra_time"],
      combo_audience: ["national", "foreign"],
      currency_code: ["USD", "CRC"],
      damage_cause: [
        "rollover",
        "collision",
        "machine_failure",
        "other",
      ],
      deposit_status: [
        "held",
        "returned",
        "retained",
        "partially_retained",
      ],
      photo_angle: [
        "right_side",
        "left_side",
        "front",
        "bottom",
      ],
      reservation_status: [
        "scheduled",
        "dispatched",
        "closed",
        "cancelled",
      ],
      reservation_type: ["rental", "tour", "combo"],
      tracking_mode: ["by_unit", "by_quantity"],
      unit_status: [
        "available",
        "in_maintenance",
        "damaged",
        "in_repair",
        "decommissioned",
      ],
      usage_metric: ["engine_hours", "kilometers"],
      work_area: [
        "administracion",
        "reservas",
        "operaciones",
      ],
      worker_blocked_reason: [
        "failed_attempts",
        "administration",
      ],
      worker_mark: [
        "guia",
        "encargado_general",
        "registro_guias_externos",
      ],
      worker_status: ["active", "blocked"],
    },
  },
} as const;
