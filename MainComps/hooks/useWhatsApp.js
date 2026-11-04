import { useState } from "react";

export function useWhatsApp() {
  const [phoneNumber, setPhoneNumber] = useState(null);

  // Set the WhatsApp business number
  const setWhatsAppNumber = (number) => {
    setPhoneNumber(number);
  };

  // Send a message via WhatsApp
  const sendMessage = (message, recipientNumber = null) => {
    const targetNumber = recipientNumber || phoneNumber;

    if (!targetNumber) {
      console.error("WhatsApp phone number not set");
      return false;
    }

    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    return true;
  };

  // Send a pre-formatted order message
  const sendOrderMessage = (orderDetails) => {
    const {
      productName,
      productType,
      quantity,
      price,
      additionalInfo = "",
    } = orderDetails;

    const message = `Hello, I would like to place an order:\n\nProduct: ${productName}\nType: ${productType || "N/A"}\nQuantity: ${quantity}\nPrice: LE ${price || "0.00"}\n${additionalInfo ? `\n${additionalInfo}` : ""}\n\nPlease confirm my order. Thank you!`;

    return sendMessage(message);
  };

  // Send a custom contact message
  const sendContactMessage = (name, email, message) => {
    const text = `Hello, I would like to get in touch:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nPlease contact me. Thank you!`;

    return sendMessage(text);
  };

  return {
    phoneNumber,
    setWhatsAppNumber,
    sendMessage,
    sendOrderMessage,
    sendContactMessage,
  };
}
