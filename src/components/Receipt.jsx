import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Receipt = ({ receiptData }) => {
  const receiptRef = useRef();

  const downloadPDF = () => {
    const input = receiptRef.current;

    html2canvas(input, {
      scale: 2, // High quality
      useCORS: true,
      windowWidth: input.scrollWidth, // Make sure canvas width fits content
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth(); // ~210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // ~297mm

      const imgProps = {
        width: canvas.width,
        height: canvas.height,
      };

      // Calculate image size to fit within A4
      const ratio = Math.min(
        pageWidth / imgProps.width,
        pageHeight / imgProps.height
      );

      const imgWidth = imgProps.width * ratio;
      const imgHeight = imgProps.height * ratio;

      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(`Realestway receipt-${receiptData.transactionId}.pdf`);
    });
  };

  return (
    <div className="p-4 w-[95%] mx-auto bg-white shadow rounded border border-[#00a256]">
      <div
        ref={receiptRef}
        className="bg-white text-[#100073] p-4 w-full mx-auto shadow rounded-md text-sm leading-relaxed"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#00a256] flex gap-3 items-center">
          <img src="favicon.png" width={45} /> <span> Payment Receipt </span>
        </h2>

        <table className="w-full border-collapse">
          <tbody>
            <Row label="Full Name" value={receiptData.fullName} />
            <Row label="Email" value={receiptData.email} />
            <Row label="Currency" value={receiptData.currency} />
            <Row
              label="Amount"
              value={`₦${(receiptData.amount / 100).toLocaleString()}`}
            />
            <Row label="Payment Method" value={receiptData.paymentMethod} />
            <Row label="Transaction ID" value={receiptData.transactionId} />
            <Row label="Reference" value={receiptData.reference} />
            <Row
              label="Date"
              value={new Date(receiptData.date).toLocaleString()}
            />
            <Row label="Property Title" value={receiptData.propertyTitle} />
            <Row label="Property Type" value={receiptData.propertyType} />
          </tbody>
        </table>

        <p className="mt-6 text-center text-xs italic text-gray-500">
          Thank you for your payment.
        </p>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={downloadPDF}
          className="bg-[#00a256] text-white px-6 py-2 rounded hover:bg-[#008f46] transition shadow"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

const Row = ({ label, value }) => (
  <tr className="border-t border-gray-200">
    <td className="py-2 pr-4 font-semibold w-1/3 text-[#00a256]">{label}</td>
    <td className="py-2">{value}</td>
  </tr>
);

export default Receipt;
