import { supabase } from "../config/supabase";

// ================= GET ALL CUSTOMERS =================
export const getCustomers = () =>
  supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

// ================= GET CUSTOMER BY ID =================
export const getCustomerById = (id) =>
  supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

// ================= CREATE CUSTOMER =================
export const createCustomer = (customer) =>
  supabase
    .from("customers")
    .insert([customer]);

// ================= UPDATE CUSTOMER =================
export const updateCustomer = (id, customer) =>
  supabase
    .from("customers")
    .update(customer)
    .eq("id", id);

// ================= DELETE CUSTOMER =================
export const deleteCustomer = (id) =>
  supabase
    .from("customers")
    .delete()
    .eq("id", id);

// ================= GET CUSTOMERS BY TYPE =================
export const getCustomersByType = (type) =>
  supabase
    .from("customers")
    .select("*")
    .eq("customer_type", type)
    .order("created_at", { ascending: false });
