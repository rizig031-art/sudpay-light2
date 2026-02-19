import { useState } from "react";
import { useStore } from "../store/useStore";
import { motion } from "framer-motion";

export default function CreditModal({ onClose }) {
  const [provider, setProvider] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const { addTransaction } = useStore();

  const providers = ["Zain Sudan", "Areeba", "MTN"];

  const handleRecharge = () => {
    if (!provider || !phone || !amount) return alert("Please fill all fields");
    addTransaction({
      id: Date.now(),
      type: "Payment",
      amount: parseInt(amount),
      bank: provider,
      date: new Date().toLocaleString(),
    });
    alert(`Recharged ${amount} SDG to ${phone} (${provider})`);
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-backdrop">
      <div className="modal">
        <h2>Buy Credit</h2>
        <select value={provider} onChange={(e) => setProvider(e.target.value)}>
          <option value="">Select Provider</option>
          {providers.map((p) => <option key={p}>{p}</option>)}
        </select>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" />
        <button onClick={handleRecharge}>Recharge</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </motion.div>
  );
}
