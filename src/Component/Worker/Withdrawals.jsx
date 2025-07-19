import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";

const Withdrawals = () => {

    const [currentUser, setCurrentUser] = useState({})


    const { user } = useAuth()
    const email = user?.email


    useEffect(() => {
        if (email) {
            axios.get(`http://localhost:3000/users/${email}`)
                .then((res) => {
                    setCurrentUser(res.data)

                })

        }
    }, [email])

    console.log(currentUser)





    const [withdrawCoin, setWithdrawCoin] = useState();
    const [withdrawAmount, setWithdrawAmount] = useState();
    const [paymentSystem, setPaymentSystem] = useState("Bkash");
    const [accountNumber, setAccountNumber] = useState("");

    const canWithdraw = currentUser.coin >= 200;


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (withdrawCoin > currentUser.coins) {
            return Swal.fire("Error", "Cannot withdraw more coins than available.", "error");
        }

        const data = {
            worker_email: currentUser.email,
            worker_name: currentUser.name,
            withdrawal_coin: withdrawCoin,
            withdrawal_amount: Number(withdrawAmount),
            payment_system: paymentSystem,
            account_number: accountNumber,
            withdraw_date: new Date(),
            status: "pending",
        };

        try {
            await axios.post("/api/withdraw", data);
            Swal.fire("Request Sent", "Your withdrawal request is pending approval.", "success");
            // Optionally: reset form
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    return (
        <div className=" mx-auto p-6 space-y-6 ">
            <h className="text-2xl font-bold text-[#5a716b]"> Withdraw Earnings</h>

            <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-base-200 shadow border border-primary/50 rounded-xl py-10 px-6 space-y-3">
                    <p className="text-base-content/80 text-2xl font-medium">
                        <span className="text-accent ">Available Coins:</span> {currentUser.coin}
                    </p>
                    <p className="text-gray-700 text-xl font-medium">
                        <span className="text-[#3b82f6]">Equivalent USD:</span> ${(parseFloat(currentUser.coin) / 20).toFixed(2)}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow  mx-auto border rounded-xl p-5 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Coin to Withdraw</label>
                        <input
                            type="number"
                            value={withdrawCoin}
                            max={currentUser.coin}
                            required
                            onChange={(e) => {
                                setWithdrawCoin(Number(e.target.value))
                                setWithdrawAmount((e.target.value / 20).toFixed(2))
                            }}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a716b]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Withdraw Amount ($)</label>
                        <input
                            type="number"
                            value={withdrawAmount}
                            disabled
                            className="w-full px-4 py-2 border bg-gray-100 rounded-md text-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Payment System</label>
                        <select
                            value={paymentSystem}
                            onChange={(e) => setPaymentSystem(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a716b]">
                            <option value="Bkash">Bkash</option>
                            <option value="Nagad">Nagad</option>
                            <option value="Rocket">Rocket</option>
                            <option value="Bank">Bank</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter your account number"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a716b]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={withdrawCoin > currentUser.coin}
                        className="w-full bg-primary hover:bg-[#4c5e59] text-primary-content font-semibold py-3 rounded-md transition"
                    >
                        Request Withdrawal
                    </button>
                </form>

            </div>
        </div>

    );
};

export default Withdrawals;
