"use client";

import React, { useState } from "react";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid"; // Unique invoice ID generator
import QRCode from "qrcode"; // Import qrcode library

const Invoice = () => {
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [laptopModel, setLaptopModel] = useState("");
  const [laptopSerial, setLaptopSerial] = useState("");
  const [warranty, setWarranty] = useState("");
  const [price, setPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceId] = useState(uuidv4()); // Generate unique invoice ID
  const [qrCode, setQrCode] = useState(""); // State for QR code image

  const generateInvoice = () => {
    if (
      !clientName ||
      !clientContact ||
      !purchaseDate ||
      !laptopModel ||
      !price ||
      !paymentMethod
    ) {
      alert("Please fill all fields");
      return;
    }

    
    const invoiceData = {
      clientName,
      clientContact,
      purchaseDate,
      laptopModel,
      laptopSerial,
      warranty,
      price,
      paymentMethod,
      invoiceId,
    };

    // Convert the data to a JSON string and generate the QR code
    QRCode.toDataURL(
      JSON.stringify(invoiceData),
      { errorCorrectionLevel: "H" },
      (err, url) => {
        if (err) {
          console.error(err);
        } else {
          setQrCode(url); // Store generated QR code in state
          setShowInvoice(true);
        }
      }
    );
  };

  const downloadInvoice = () => {
    const invoiceElement = document.getElementById("invoice");
    html2canvas(invoiceElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "invoice.png";
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="w-full max-w-lg bg-white p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-5 text-blue-600">
          Smart Laptops Hub - Invoice Generator
        </h1>

        {!showInvoice ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter client name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Client Contact</label>
              <input
                type="text"
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter client contact"
              />
            </div>
            <div>
              <label className="block text-gray-700">Purchase Date</label>
              <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Laptop Model</label>
              <input
                type="text"
                value={laptopModel}
                onChange={(e) => setLaptopModel(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter laptop model"
              />
            </div>
            <div>
              <label className="block text-gray-700">Laptop Serial Number</label>
              <input
                type="text"
                value={laptopSerial}
                onChange={(e) => setLaptopSerial(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter serial number (optional)"
              />
            </div>
            <div>
              <label className="block text-gray-700">Warranty (Months)</label>
              <input
                type="number"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter warranty (optional)"
              />
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-gray-700">Payment Method</label>
              <input
                type="text"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter payment method"
              />
            </div>
            <button
              onClick={generateInvoice}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
            >
              Generate Invoice
            </button>
          </div>
        ) : (
          <div>
            <div id="invoice" className="p-5 bg-gray-50 rounded-lg border border-gray-300 shadow-md">
              <h2 className="text-xl font-bold mb-3">Invoice</h2>
              <p><strong>Client Name:</strong> {clientName}</p>
              <p><strong>Client Contact:</strong> {clientContact}</p>
              <p><strong>Purchase Date:</strong> {purchaseDate}</p>
              <p><strong>Laptop Model:</strong> {laptopModel}</p>
              <p><strong>Serial Number:</strong> {laptopSerial || "N/A"}</p>
              <p><strong>Warranty:</strong> {warranty || "N/A"} months</p>
              <p><strong>Price:</strong> ${price}</p>
              <p><strong>Payment Method:</strong> {paymentMethod}</p>
              <p><strong>Invoice ID:</strong> {invoiceId}</p>
              {qrCode && <img src={qrCode} alt="QR Code" className="mt-3 w-24 h-24" />}
            </div>
            <button
              onClick={downloadInvoice}
              className="mt-5 w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700"
            >
              Download Invoice
            </button>
            <button
              onClick={() => setShowInvoice(false)}
              className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700"
            >
              Edit Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
