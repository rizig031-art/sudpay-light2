import { useState } from "react";
import { useStore } from "../store/useStore";
import { banks } from "../mock/mockData";
import { motion } from "framer-motion";

export default function BankTransferModal({ onClose }) {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const { addTransaction } = useStore();

  const handleTransfer = () => {
    if (!account || !amount || !bank) return alert("Please fill all fields");
    addTransaction({
      id: Date.now(),
      type: "Payment",
      amount: parseInt(amount),
      bank,
      date: new Date().toLocaleString(),
    });
    alert(`Transferred ${amount} SDG to ${account} at ${bank}`);
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-backdrop">
      <div className="modal">
        <h2>Transfer to Bank</h2>
        <select value={bank} onChange={(e) => setBank(e.target.value)}>
          <option value="">Select Bank</option>
          {banks.map((b) => <option key={b}>{b}</option>)}
        </select>
        <input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Bank Account Number" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" />
        <button onClick={handleTransfer}>Transfer</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </motion.div>
  );
}
