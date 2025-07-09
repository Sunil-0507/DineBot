import React, { useState } from 'react';

const PaymentModal = ({ onClose }) => {
  const [accepted, setAccepted] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePay = () => {
    if (accepted) {
      setPaid(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Payment Confirmation</h2>
        {!paid ? (
          <>
            <p className="mb-3">Do you accept the Terms & Conditions?</p>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
              />
              <span>I accept</span>
            </label>
            <div className="flex justify-end space-x-2">
              <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button
                onClick={handlePay}
                disabled={!accepted}
                className={`px-4 py-2 rounded text-white ${accepted ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                Pay
              </button>
            </div>
          </>
        ) : (
          <p className="text-green-600 font-medium text-center">✅ Payment Successful!</p>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
