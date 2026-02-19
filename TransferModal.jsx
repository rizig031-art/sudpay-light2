import { useState } from "react";
import { useStore } from "../store/useStore";
import { motion } from "framer-motion";

export default function TransferModal({ onClose }) {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const { addTransaction, selectedBank } = useStore();

  const handleTransfer = () => {
    if (!account || !amount) return alert("Please fill all fields");
    addTransaction({
      id: Date.now(),
      type: "Payment",
      amount: parseInt(amount),
      bank: selectedBank,
      date: new Date().toLocaleString(),
    });
    alert(`Transferred ${amount} SDG to SudPay account ${account}`);
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-backdrop">
      <div className="modal">
        <h2>Transfer to SudPay</h2>
        <input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="SudPay account number" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" />
        <button onClick={handleTransfer}>Transfer</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </motion.div>
  );
}
