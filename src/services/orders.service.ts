import { supabase } from "../lib/supabase";

export const ordersService = {
  async createOrder(orderData: any) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total: orderData.total,
        status: "pending",
        customer_email: orderData.customerEmail,
        full_name: orderData.customer.name,
        phone: orderData.customer.phone,
        items: {
          products: orderData.items,
          customer: orderData.customer,
          deliveryMethod: orderData.deliveryMethod,
          deliveryPrice: orderData.deliveryPrice,
          paymentMethod: orderData.paymentMethod,
          currency: orderData.currency,
        },
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },
};
