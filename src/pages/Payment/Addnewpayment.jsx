import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Addnewpayment() {
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState("");
    const [accountHolder, setAccountHolder] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    // Validate card number: 16 digits numeric
    const isCardValid = /^\d{16}$/.test(cardNumber);

    const handleSave = (e) => {
        e.preventDefault();
        if (!isCardValid) return;
        setShowModal(true);
    };

    const handleModalOk = () => {
        setShowModal(false);
        navigate("/home"); // Navigate to homepage
    };

    const handleCardInput = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
        if (value.length <= 16) {
            setCardNumber(value);
        }
    };

    return (
        <div className="relative">
            {/* Main Content */}
            <div className={`bg-gray-100 flex items-center justify-center min-h-screen ${showModal ? "filter blur-sm" : ""}`}>
                <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:max-w-lg w-full">
                    <div className="p-6">
                        {/* Header */}
                        <header className="relative flex items-center justify-center py-4">
                            <button onClick={handleBack} className="absolute left-0 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold text-gray-800">
                                Add New Payment
                            </h1>
                        </header>

                        {/* Card Logos */}
                        <div className="flex items-center space-x-4 my-6">
                            <div className="w-12 h-8 flex items-center justify-center rounded-md">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                                    alt="Visa"
                                    className="h-4"
                                />
                            </div>
                            <div className="w-12 h-8 flex items-center justify-center rounded-md">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                                    alt="Mastercard"
                                    className="h-6"
                                />
                            </div>
                        </div>

                        {/* Payment Form */}
                        <main>
                            <form className="space-y-6" onSubmit={handleSave}>
                                <div>
                                    <label
                                        htmlFor="card-number"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Card Number
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="card-number"
                                            id="card-number"
                                            value={cardNumber}
                                            onChange={handleCardInput}
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 border"
                                            placeholder="0000 0000 0000 0000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="account-holder"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Account Holder Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="account-holder"
                                            id="account-holder"
                                            value={accountHolder}
                                            onChange={(e) => setAccountHolder(e.target.value)}
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 border"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="expiration-date"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Expiration Date
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="expiration-date"
                                                id="expiration-date"
                                                value={expirationDate}
                                                onChange={(e) => setExpirationDate(e.target.value)}
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 border"
                                                placeholder="MM / DD / YY"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="cvv"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            CVV
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="cvv"
                                                id="cvv"
                                                value={cvv}
                                                onChange={(e) => setCvv(e.target.value)}
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 border"
                                                placeholder="0000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={!isCardValid}
                                        className={`w-full font-bold py-3 px-4 rounded-lg transition-colors ${isCardValid
                                                ? "bg-gray-200 text-gray-500 hover:bg-gray-300"
                                                : "bg-gray-300 text-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Background overlay */}
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"></div>
                    {/* Modal content */}
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-80 text-center">
                        <h2 className="text-lg font-semibold mb-4">
                            Your purchase has been successfully
                        </h2>
                        <button
                            onClick={handleModalOk}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Addnewpayment;
