"use client";

import MainText from "../MainTextComponent";
import MainButton from "../MainButton";

export default function BuyNowSidebar({ product, quantity, onShowModal, onShowToast, onSendWhatsAppOrder }) {
  const handleWhatsAppOrder = () => {
    const phoneNumber = "201008461899"; // Set to null to show modal as example

    if (!phoneNumber) {
      onShowModal(
        "Service Not Available",
        "WhatsApp ordering is currently not available. Please contact us via phone or email.",
        "warning"
      );
      return;
    }

    // Send order message using the callback
    onSendWhatsAppOrder({
      productName: product.name,
      productType: product.type,
      quantity: quantity,
      price: product.price,
    });
  };

  const handleWebsiteOrder = () => {
    // TODO: Implement website ordering
    onShowToast("Website ordering is not available yet. Please use WhatsApp for now.", "warning");
  };

  return (
    <div className="space-y-6">
      {/* Product Info */}
      <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-700">
        <MainText as="h3" className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
          {product.name}
        </MainText>
        <MainText className="text-2xl font-bold text-blue-600">
          LE {product.price || "0.00"}
        </MainText>
      </div>

      {/* Order Summary */}
      <div className="space-y-3">
        <MainText className="font-semibold text-slate-900 dark:text-white">
          Order Summary
        </MainText>
        <div className="flex justify-between text-sm">
          <MainText className="text-slate-600 dark:text-slate-400">Quantity</MainText>
          <MainText className="font-medium text-slate-900 dark:text-white">
            {quantity}
          </MainText>
        </div>
        <div className="flex justify-between text-sm">
          <MainText className="text-slate-600 dark:text-slate-400">Type</MainText>
          <MainText className="font-medium text-slate-900 dark:text-white">
            {product.type || "N/A"}
          </MainText>
        </div>
        {product.company?.name && (
          <div className="flex justify-between text-sm">
            <MainText className="text-slate-600 dark:text-slate-400">Company</MainText>
            <MainText className="font-medium text-slate-900 dark:text-white">
              {product.company.name}
            </MainText>
          </div>
        )}
        <div className="flex justify-between text-sm border-t border-slate-200 pt-3 dark:border-slate-700">
          <MainText className="font-semibold text-slate-900 dark:text-white">Total</MainText>
          <MainText className="font-bold text-blue-600">
            LE {((product.price || 0) * quantity).toFixed(2)}
          </MainText>
        </div>
      </div>

      {/* WhatsApp Button */}
      <MainButton
        variant="primary"
        fullWidth
        onClick={handleWhatsAppOrder}
        className="bg-green-600 hover:bg-green-700"
      >
        <MainText>Order via WhatsApp</MainText>
      </MainButton>

      {/* Website Button */}
      <MainButton
        variant="secondary"
        fullWidth
        onClick={handleWebsiteOrder}
      >
        <MainText>Order via Website</MainText>
      </MainButton>
    </div>
  );
}
